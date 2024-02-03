import axios from 'axios';
import config from './api/_api_config.js';
import { Message } from 'h_ui/dist/h_ui.min';
import Cookies from 'js-cookie';
import { covertObj, encryptParam, isJSONStr, kickout } from './api/commonUtil';
import transWhiteListTest from './api/transWhiteList';
import { store } from 'hui-core'
// import { sensitiveFilter } from './utils'
const handleResponseFn = (response) => {
  if (response.request && response.request.responseType && response.request.responseType === 'blob') {
    return response;
  }
  // 处理后端返回值 特殊情况判断,后端response项为Array类型
  const data = response.data;
  const flag2 = Array.isArray(data);
  if (flag2) return response.data;
  const errorMessage = response.data.error_message;
  const errorCode = response.data.error_code;
  const returnCode = response.data.return_code;
  if (errorCode !== '' && returnCode !== 0 && returnCode !== 200) {
    Message.error({
      content: errorMessage || '服务器响应异常',
      duration: 3
    });
    return Promise.reject(new Error(errorMessage));
  }
  return response.data;
};

const _axios = axios.create(config);
// request拦截器
let configUrl = '';

_axios.interceptors.request.use(config => {
  configUrl = config.url;
  // 全局处理为post请求增加menu_code参数  确保操作日志可正常记录相关操作信息
  if (window.LOCAL_CONFIG && window.LOCAL_CONFIG.curRouteInfo && window.LOCAL_CONFIG.curRouteInfo.meta) {
    let menuCode = window.LOCAL_CONFIG.curRouteInfo.meta.id || window.LOCAL_CONFIG.curRouteInfo.meta.tempMenuTplId || window.LOCAL_CONFIG.curRouteInfo.meta.comName || '';
    const menuCodeList = menuCode.split('_');
    if (menuCodeList.length > 3) {
      menuCodeList.splice(3);
      menuCode = menuCodeList.join('_');
    }
    const { title } = store.state.root.bizMenuMap[menuCode] || {}
    const menuName = title || window.LOCAL_CONFIG.curRouteInfo.name || '';
    if (config.method === 'post' && menuCode && !config.data.menu_code) {
      config.data.menu_code = menuCode;
    }
    if (config.method === 'post' && menuName && !config.data.menu_name) {
      config.data.menu_name = menuName;
    }
    if (config.method === 'get' && menuCode && !configUrl.includes('menu_code')) {
      config.url = config.url.includes('?') ? `${config.url}&menu_code=${menuCode}` : `${config.url}?menu_code=${menuCode}`;
      configUrl = config.url;
    }
    if (config.method === 'get' && menuName && !configUrl.includes('menu_name')) {
      config.url = config.url.includes('?') ? `${config.url}&menu_name=${menuName}` : `${config.url}?menu_name=${menuName}`;
      configUrl = config.url;
    }
  }
  try {
    const md5 = require('md5');
    const OPENMD5 = window.LOCAL_CONFIG.isMD5Nonce;
    if (!OPENMD5) {
      // console.log('未开启加密');
    } else {
      if (config.method) {
        const method = config.method.toLocaleLowerCase();
        const getRandomNumber = function(length) {
          let s1 = '';
          for (let k = 0; k < length; k++) {
            const z = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const m = z[Math.floor(Math.random() * z.length)];
            s1 += m;
          }
          return s1;
        };
        const obj = {
          time_stamps: new Date().getTime(), // 时间戳
          random_no: getRandomNumber(8), // 随机8位数字
          nonce: ''
        };
        obj.nonce = md5(obj.time_stamps + '' + obj.random_no);
        if (method === 'post') {
          config.data = Object.assign(config.data || {}, obj);
          config.params = JSON.parse(JSON.stringify(Object.assign(config.params || {}, obj)));
        } else if (method === 'get') {
          config.params = JSON.parse(JSON.stringify(Object.assign(config.params || {}, obj)));
        }
      }
    }
  } catch (e) {
    // console.log(e, '没有安装md5');
  }

  // 脱敏由后端判断是否有权  取消前端过滤
  // if(config && config.data && config.data.formatter){
  //   config.data.formatter = sensitiveFilter(config.data.formatter);
  // }
  // if(config && config.params && config.params.formatter){
  //   config.params.formatter = sensitiveFilter(config.params.formatter);
  // }
  if (window.localStorage.getItem('user')) {
    const data = JSON.parse(window.localStorage.getItem('user'));
    if (!Cookies.get('operator_code') || (data.operator_code !== Cookies.get('operator_code'))) {
      let token = '';
      const sessionId = 'wer3423424wrwedsf';
      token = encryptParam(data.user_token ? data.user_token : sessionId);
      Cookies.set('Admin-Token', encryptParam(sessionId));
      Cookies.set('operator_code', data.operator_code);
      Cookies.set('user_token', token);
      window.sessionStorage.setItem('operator_code', data.operator_code);
      window.sessionStorage.setItem('userName', data.username);
    }
  }

  // 防crsf攻击标识 20190717 add by zhouzx
  const crsf = window.sessionStorage.getItem('omc_crsf');
  if (crsf && crsf !== '') {
    config.headers.csrfcheck = crsf;
  }

  // 如果是IAR单点登录，请求头里面需要携带ssoName(IAR的V1.2.6&V1.1.63及其以上支持读取头)
  const isIARCasLogin = window.LOCAL_CONFIG.isIARCasLogin + '';
  if (isIARCasLogin === 'true') {
    config.headers.ssoName = window.LOCAL_CONFIG.casSsoName + '';
  }

  const isUnderscore = false;// window.HSRCMDEMO_CONFIG.isUnderscore + ''
  if (isUnderscore === 'true' && config.data) { // 兼容微服务方式
    const newData = {};
    covertObj(config.data, newData, true);
    config.data = newData;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

_axios.interceptors.response.use(response => {
  // 获取IAR返回的防crsf攻击标识 20190717 add by zhouzx
  const crsf = response.headers['csrfcheck'];
  if (crsf && crsf !== '') {
    window.sessionStorage.setItem('omc_crsf', crsf);
  }
  // ie中res.data返回为string类型，chorme为obj类型
  if (response && response.data && typeof response.data === 'string') {
    if (isJSONStr(response.data)) {
      response.data = JSON.parse(response.data);
    }
  }
  if (response && response.data && response.data.data) { // 兼容IAR模式 20180915 add by 周智星
    response.data = response.data.data.length === 1 ? response.data.data[0] : response.data.data;
  }

  // 用户行为记录
  let action_id = '';
  if (response && response.data && !response.data.return_code) {
    action_id = 'controlclick';
  } else {
    action_id = 'exception';
  }
  const isRecordUserBehavior = window.LOCAL_CONFIG.isRecordUserBehavior;
  if (isRecordUserBehavior) {
    let routeInfo = sessionStorage.getItem('routeInfo');
    let saveUserBehaviorLogInfo = sessionStorage.getItem('saveUserBehaviorLogInfo');
    let url = '/saveUserBehaviorLog' + '?time=' + new Date().getTime();
    const isUrlLowercase = window.LOCAL_CONFIG.isUrlLowercase + '';
    if (isUrlLowercase === 'true') {
      url = url.toLowerCase();
    }
    try {
      routeInfo = JSON.parse(routeInfo);
      saveUserBehaviorLogInfo = JSON.parse(saveUserBehaviorLogInfo);
      saveUserBehaviorLogInfo.tab_caption = routeInfo.name;
      saveUserBehaviorLogInfo.control_name = configUrl || '';
      saveUserBehaviorLogInfo.control_type = 'interface';
      saveUserBehaviorLogInfo.action_id = action_id;
      axios({
        url: window.LOCAL_CONFIG.OMC_GSV + url,
        method: 'post',
        data: saveUserBehaviorLogInfo
      });
    } catch (e) {
      // console.log("路由信息routeInfo保存失败在session中");
    }
  }

  if ((response.data && (response.data.return_code === 9008 || response.data.return_code === 9007 || response.data.return_code === 9006 || response.data.return_code === 9005 || response.data.return_code === 9004)) || !response) {
    let text = '';
    const returnCode = response.data.return_code;
    if (returnCode === 9008) {
      text = '对不起,您缺少访问权限';
      Message.info(text);
    } else if (returnCode === 9006) {
      text = '页面已经失效,请先登录';
    } else if (returnCode === 9007) {
      text = '会话已失效,请重新登录';
    } else if (returnCode === 9004) {
      text = '您已被踢出,请先登录';
    } else if (returnCode === 9005) {
      text = '您已在别地方登录,请先登录';
    } else if (returnCode === 9021) {
      text = '锁屏状态不能操作，请先解锁';
    } else {
      if (response.data.error_info) {
        text = '异常错误：' + response.data.error_info;
      } else {
        text = '系统出现异常';
      }
    }
    if (response && response.data && response.data.return_code === -5) {
      // 如果是IAR单点登录，单点登出
      const isIARCasLogin = window.LOCAL_CONFIG.isIARCasLogin + '';
      if (isIARCasLogin === 'true') {
        return true;
      }
      // 锁屏状态，不能请求
      Message.info('请解锁！');
      return true;
    }
  } else {
    // 如果是IAR单点登录且返回为空，表示尚未登录或者已经单点登出，这是需要跳转到登录页
    const isIARCasLogin = window.LOCAL_CONFIG.isIARCasLogin + '';
    const isCasAdapter = window.LOCAL_CONFIG.isCasAdapter + '';
    const data = response.data;
    if (response && data !== null) {
      // 微服务模式下，将下划线属性转换为驼峰
      const isUnderscore = false;// window.HSRCMDEMO_CONFIG.isUnderscore;
      if ((isUnderscore + '') === 'true' && typeof data === 'object' && data !== null && !transWhiteListTest(response.config.url)) {
        let temp;
        if (Array.isArray(data)) {
          temp = data.map(d => {
            const tempObj = {};
            covertObj(d, tempObj, false, false);
            return tempObj;
          });
        } else {
          temp = {};
          covertObj(data, temp, false, false);
        }
        response.data = temp;
      }
      return handleResponseFn(response);
    } else if (isIARCasLogin === 'true') {
      if (response.status + '' !== '200') {
        // 当返回302时
        // 清空当前的菜单缓存
        window.sessionStorage.removeItem('menus');
        if (response.request.responseURL.indexOf('cas') > 0 && response.request.responseURL.indexOf('logout') === -1) {
          // 当302的地址是cas服务器且不是登出请求
          // 跳转到cas登录页
          window.location.href = response.request.responseURL;
        } else if (response.request.responseURL.indexOf('cas') > 0 && isCasAdapter === 'true' && response.request.responseURL.indexOf('logout') !== -1) {
          // 当302的地址是cas服务器且是cas适配器且是登出接口
          // 拼接登出url后跳转到适配器登出，登出后再跳转到当前页面
          window.location.href = response.request.responseURL + '?service=' + window.location.href;
        } else {
          // 刷新当前页面
          location.reload();
        }
      } else if (response.request.responseURL.indexOf('cas') > 0 && response.request.responseURL.indexOf('logout') === -1) {
        // 当返回200页面且是cas服务器且不是登出接口
        // 清空当前的菜单缓存
        window.sessionStorage.removeItem('menus');
        // 跳转到cas登录页
        window.location.href = response.request.responseURL;
      } else if (response.request.responseURL.indexOf('cas') > 0 && isCasAdapter === 'true' && response.request.responseURL.indexOf('logout') !== -1) {
        // 当返回200且是cas适配器且是登出接口
        // 清空当前的菜单缓存
        window.sessionStorage.removeItem('menus');
        // 拼接登出url后跳转到适配器登出，登出后再跳转到当前页面
        window.location.href = response.request.responseURL + '?service=' + window.location.href;
      } else {
        return handleResponseFn(response);
      }
    } else {
      return handleResponseFn(response);
    }
  }
}, error => {
  const response = error.response;
  // ie中res.data返回为string类型，chorme为obj类型
  if (error && response && response.data && typeof response.data === 'string') {
    if (isJSONStr(response.data)) {
      response.data = JSON.parse(response.data);
    }
  }
  if (response && response.data && response.data.data) { // 兼容IAR模式
    response.data = response.data.data.length === 1 ? response.data.data[0] : response.data.data;
  }
  if (error && response && response.data && response.data.return_code) {
    const flag = true;
    let text = '';
    const tmpKey = Cookies.get('user_token') + '#' + Cookies.get('operator_code');
    const tmpData = response.data.data ? response.data.data : response.data;
    const data = (tmpData instanceof Array) ? tmpData[0] : tmpData;
    const returnCode = data.return_code ? data.return_code : 9023;
    if (returnCode === 9008) {
      text = '对不起,您缺少访问权限';
      // text = i18n.t("m.i.fetchMsg.unAuthorized")
    } else if (returnCode === 9006) {
      window.LOCAL_CONFIG.isToken && kickout(tmpKey);
      text = '页面已经失效,请先登录';
      // text = i18n.t("m.i.fetchMsg.pageTimeOut")
      // flag = false
    } else if (returnCode === 9007) {
      window.LOCAL_CONFIG.isToken && kickout(tmpKey);
      text = '会话已失效,请重新登录';
      // text = i18n.t("m.i.fetchMsg.sessionTimeOut")
      // flag = false
    } else if (returnCode === 9004) {
      text = '您已被踢出,请先登录';
      // text = i18n.t("m.i.fetchMsg.kickOut")
      // flag = false
    } else if (returnCode === 9005) {
      text = '您已在别地方登录,请先登录';
      // text = i18n.t("m.i.fetchMsg.occupied")
      // flag = false
    } else if (returnCode === 9011) {
      text = '验证码出错';
      // text = i18n.t("m.i.fetchMsg.verifyCode")
    } else if (returnCode === 9021) {
      text = '锁屏状态不能操作，请先解锁';
      // text = i18n.t("m.i.fetchMsg.lockScreenStatus")
      // flag = false
    } else {
      // flag = false
      if (data.error_info) {
        text = data.error_info;
        // text = i18n.t("m.i.fetchMsg.sysException") + data.error_info
      } else if (data.error_code || data.error_no) {
        // text = i18n.t("m.i.fetchMsg.sysException") + (data.error_code ? data.error_code : data.error_no)
      } else {
        // text = i18n.t("m.i.fetchMsg.sysException_1")
      }
    }
    if (!flag && window.LOCAL_CONFIG.isToken) {
      // 如果是验证码地址，就直接放过20200323 add by zhouzx
      const url = response.config.url;
      if (url.indexOf('getVerifyCode') !== -1 || url.indexOf('getverifycode') !== -1) return Promise.reject(error);
    } else {
      if (text !== '') {
        Message.info({
          content: text,
          duration: 3
        });
      }
    }
  } else {
    if (response && response.status == 504) {
      Message.error({
        content: '请求超时，请重试！',
        duration: 3
      });
    } else {
      const errorInfo = (response.data && response.data.error_info || response.data.message) || '请求失败，请重试！';
      Message.error({
        content: errorInfo,
        duration: 3
      });
    }
  }
  return Promise.reject(error);
});

const _mixinUrl = (url, param) => {
  url = url || '';
  param = param || {};
  if (!url) return;
  url = url.indexOf('?') > 0 ? `${url}&` : `${url}?`;
  url = Object.keys(param).reduce((preVal, curItem) => {
    preVal += `${curItem}=${encodeURIComponent(param[curItem])}&`;
    return preVal;
  }, url);
  return url.replace(/[&?]$/, '');
};

const _http = {};

_http.all = (urls) => {
  return new Promise((resolve, reject) => {
    axios.all(urls)
      .then(axios.spread((...res) => {
        resolve(res);
      }))
      .catch(err => reject(err));
  });
};

_http.getWithoutUserId = (url, params) => {
  return _axios.get(_mixinUrl(url, params));
};

_http.get = (url, params = {}, config) => {
  return _axios.get(_mixinUrl(url, params), config);
};

_http.delete = (url, params = {}, config) => {
  return _axios.delete(_mixinUrl(url, params), config);
};

_http.deleteByJson = (url, params) => {
  return _axios.delete(url, {
    data: params
  });
};

_http.post = (url, params = {}, config) => {
  return _axios.post(url, params, config);
};

_http.put = (url, params = {}, config) => {
  return _axios.put(url, params, config);
};

_http.postDownload = (url, params) => {
  return _axios.post(url, params, {
    responseType: 'blob'
  }).then(response => {
    saveFile(response, params ? params.fileName : '');
  });
};

_http.getDownload = (url, params) => {
  return _axios.get(_mixinUrl(url, params), {
    responseType: 'blob'
  }).then(response => {
    saveFile(response, params ? params.fileName : '');
  });
};

const getFileName = (response, fileName) => {
  if (!fileName) {
    const disposition = response.headers['Content-Disposition'] || response.headers['content-disposition'];
    if (disposition) {
      const _f = disposition.split(/fileName=/i);
      if (_f.length > 1) {
        fileName = _f[1];
      }
    }
  }
  return decodeURIComponent(fileName) || '文件';
};

const saveFile = (response, fileName) => {
  if (response.data.size === 0) {
    Message.error({
      content: '文件不存在',
      duration: 3
    });
    return;
  }

  if (response.data.type.toLowerCase() === 'application/json') {
    if (FileReader) {
      const _reader = new FileReader();
      _reader.onload = (e) => {
        const _error = JSON.parse(e.target.result);
        Message.error({
          content: _error.message || _error.errorMessage,
          duration: 3
        });
      };
      _reader.readAsText(response.data);
    } else {
      Message.error({
        content: '服务器错误',
        duration: 3
      });
    }
    return;
  }

  fileName = getFileName(response, fileName);
  fileName = fileName.replace(/\"|\"/g, '');
  if (typeof window.chrome !== 'undefined') {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(response.data);
    link.download = fileName;
    link.click();
  } else if (typeof window.navigation.msSaveBlob !== 'undefined') {
    const blob = new Blob([response.data], {
      type: 'application/force-download'
    });
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    const file = new File([response.data], fileName, {
      type: 'application/force-download'
    });
    window.open(URL.createObjectURL(file));
  }
};

export default _http;
