/*
 * @Author: shihm30235
 * @Date: 2020-09-10 19:10:45
 * @LastEditTime: 2021-09-03 11:23:34
 */
import fetch from './api/api';
import hui from 'h_ui/dist/h_ui.min.js';
import { frameEmitter } from 'hui-core';
import { encryptParam } from './api/commonUtil';

// 附件变量
const fileProperties = {
  maxFileSize: '',
  fileSuffixList: []
};
const commonFun = {
  // 用于财资导出时登录校验
  checkLogin() {
    const config = window.HSRCMAMLCOM_CONFIG ||
      window.HSRCMAMLPS_CONFIG ||
      window.HSRCMAMLWL_CONFIG ||
      window.HSRCMAMLCRS_CONFIG ||
      window.HSRCMAMLCP_CONFIG;
    return new Promise(async(resolve, reject) => {
      const res = await commonFun.getSysParameterByCode(config.PBS_API, 306010);
      // 如果杂项没有开启，不进行弹窗校验
      if (String(res) !== '1') {
        resolve(true);
        return;
      }
      frameEmitter.trigger('export-login-check', {
        callback: async(msg) => {
          if (msg === false) {
            reject(false);
          }
          try {
            const res = await fetch.post(`${config.AMLPS_API}/validUserPwd`, {
              login_name: encryptParam(msg.user), // 登录用户ID
              pwd: encryptParam(msg.password), // 登录密码
              login_name_show: msg.user
            });
            const { return_code } = res.data;
            if (return_code === 0) {
              resolve(true);
              return true;
            }
            hui.hMessage.error(res.data.error_message);
            reject(false);
            return false;
          } catch (e) {
            reject(false);
            return false;
          }
        }
      });
    });
  },
  async exportData(url, params, fileName, callBackFun) {
    try {
      await commonFun.checkLogin();
    } catch (err) {
      return;
    }
    const _self = this;
    fetch
      .post(url, params, { responseType: 'blob' }
      )
      .then(res => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = reader.result;// 内容就在这里
          if (content.indexOf('"code":-1') > -1) {
            const info = JSON.parse(content);
            _self.$hMessage.error(info.message);
          } else {
            const blob = new Blob([reader.res.data]);
            const contentDisposition = reader.res.headers['content-disposition'];
            if (!fileName && contentDisposition) {
              fileName = window.decodeURI(contentDisposition.split('=')[1], 'UTF-8');
            }
            if ('download' in document.createElement('a')) {
              // 非IE下载
              const elink = document.createElement('a');
              elink.download = fileName;
              elink.style.display = 'none';
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else {
              // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
            if (callBackFun) {
              callBackFun();
            }
          }
        };
        reader.res = res;
        reader.readAsText(res.data);
      });
  },
  /*
  * @desciption 获取可上传附件的大小和类型
  * @param baseServer 基础Url
  */
  getFileByConfig(baseServer, busUrl = 'fileProperties') {
    return new Promise((resolve) => {
      if (!window.LOCAL_CONFIG.fileProperties) {
        fetch
          .post(`${baseServer}/${busUrl}`, {}
          )
          .then((res) => {
            if (res.data.error_code) {
              resolve();
            } else {
              const fileProperties = {};
              fileProperties.maxFileSize = res.data.result.maxFileSize || 20;
              fileProperties.fileSuffixList = res.data.result.fileSuffixList.length > 0 ? res.data.result.fileSuffixList : ['doc', 'docx', 'xlsx', 'xls', 'pdf', 'jpg', 'txt', 'png', 'gif', 'ppt', 'pptx', 'mp3', 'wav', 'midi', 'm4a', 'wma', 'mp4'];
              window.LOCAL_CONFIG.fileProperties = fileProperties;
              resolve(window.LOCAL_CONFIG.fileProperties);
            }
          }).catch(() => {
            resolve();
          });
      } else {
        resolve(window.LOCAL_CONFIG.fileProperties);
      }
    });
  },
  /*
  * @desciption 获取当前登录的公司号
  * @param baseServer 基础Url
  */
  getCompany(baseServer) {
    return new Promise((resolve) => {
      if (!sessionStorage.getItem('companyno')) {
        fetch
          .post(`${baseServer}/getCompany`, {}
          )
          .then((res) => {
            if (res.data.error_code) {
              resolve();
            } else {
              sessionStorage.setItem('companyno', res.data.company_no);
              resolve(res.data.company_no);
            }
          }).catch(() => {
            resolve();
          });
      } else {
        resolve(sessionStorage.getItem('companyno'));
      }
    });
  },
  /*
  * @desciption 获取杂项值
  * @param parameter_no 编码
  */
  getSysParameterByCode(baseServer, parameter_no) {
    if (!parameter_no) {
      return;
    }
    return new Promise((resolve) => {
      const parameterValue = sessionStorage.getItem(`parameterValue${parameter_no}`);
      if (parameterValue || parameterValue === 0) {
        resolve(parameterValue);
      } else {
        fetch
          .post(`${baseServer}/getSysParameterValue`, {
            parameter_no: parameter_no
          }
          )
          .then((res) => {
            const resData = JSON.parse(res.data) + '';
            sessionStorage.setItem(`parameterValue${parameter_no}`, resData);
            resolve(resData);
          }).catch(() => {
            resolve('');
          });
      }
    });
  },
  /*
  * @desciption 获取字典项
  * @param dictEntr 字典编码
  */
  getDictList(baseServer, dictEntr, params = {}, isSessionGet = true) {
    let httpGetFlag = true; // 发请求去获取数据
    let listData = [];
    if (isSessionGet) {
      httpGetFlag = false;
      try {
        let dictList = sessionStorage.getItem('dictEntr' + dictEntr);
        if (dictList) {
          dictList = JSON.parse(dictList);
          if (dictList instanceof Array) {
            listData = dictList;
          } else {
            httpGetFlag = true;
          }
        } else {
          httpGetFlag = true;
        }
      } catch (e) {
        httpGetFlag = true;
      }
    }
    return new Promise((resolve) => {
      if (!httpGetFlag) {
        resolve(listData);
        return;
      }
      fetch.post(`${baseServer}/getDictList?dict_entr=${dictEntr}`, params).then(result => {
        if (result.data.error_code) {
          resolve([]);
          return;
        }
        const response = result.data.result.item
          ? result.data.result.item
          : result.data.result;
        if (response && response.length > 0) {
          listData = response;
          if (isSessionGet) {
            sessionStorage.setItem(
              'dictEntr' + dictEntr,
              JSON.stringify(listData)
            );
          }
        }
        resolve(listData);
      });
    });
  },
  /**
 * post方式文件上传接口
 * @param {*参数} {
 * @file 文件信息
 * @fileName 文件字段
 * @params 额外参数
 * @url 上传地址
 * @uploadProgressFn 上传进度
 * @fileSize 可上传文件最大值
 * @fileType 允许上传文件类型
 * }
 */
  fileUpload({
    file, params, fileName, url, uploadProgressFn, fileSize, fileType, baseServer
  }) {
    return new Promise(async(resolve, reject) => {
      let fileProperties = {};
      if (!fileSize || !fileType) {
        fileProperties = await commonFun.getFileByConfig(baseServer);
        if (!fileSize) {
          fileSize = Number(fileProperties.maxFileSize);
        }
        if (!fileType) {
          fileType = fileProperties.fileSuffixList;
        }
      }
      if (file.size > fileSize * 1024 * 1024) {
        reject({ data_no: 'warning', msg: `文件不能超过${fileSize}M,请重新上传！` });
        return;
      }
      if (fileType.indexOf(file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()) < 0) {
        reject({ data_no: 'warning', msg: `文件类型不正确，请上传${fileType.join(',')}类型的文件！` });
        return;
      }
      const uploadFileForm = new FormData();
      uploadFileForm.append(fileName || 'file', file);
      for (const key in params) {
        uploadFileForm.append(key, params[key]);
      }
      fetch
        .post(url, uploadFileForm, {
          headers: {
            'Content-Type': 'multipart/form-data;charse=UTF-8'
          },
          transformRequest: [function() {
            return uploadFileForm;
          }],
          onUploadProgress: function(progressEvent) {
            if (progressEvent.lengthComputable) {
              const lengthVal = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
              const progress = parseInt(lengthVal);
              if (uploadProgressFn) {
                uploadProgressFn(progress);
              }
            }
          }
        })
        .then(res => {
          if (res.data.error_code || res.data.errorCode) {
            if (res.data.error_code) {
              reject({ data_no: 'error', msg: res.data.error_info
                ? res.data.error_info
                : res.data.error_message
                  ? res.data.error_message
                  : '上传失败！' });
            } else if (res.data.errorCode) {
              reject(
                { data_no: 'error', msg: res.data.errorMessage || '上传失败！' }
              );
            }
          } else {
            resolve(res.data.result);
          }
        })
        .catch(err => {
          reject({ data_no: 'error', msg: err });
        });
    });
  }
};
export default commonFun;
