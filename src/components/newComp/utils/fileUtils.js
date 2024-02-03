import commonFun from './commonFun'
import hui from 'h_ui/dist/h_ui.min.js'
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
const DURATION = window.LOCAL_CONFIG.duration
export function fileup(params = {}) {
  debugger
  params.baseServer = window.HSRCMSAMLCA_CONFIG.PBS_API
  return new Promise((resolve, reject) => {
    if (params.file.size <= 0) {
      hui.hMessage.warning(`文件大小为0K,请重新上传！`)
      reject(new Error(`文件大小为0K,请重新上传！`))
      return
    }
    commonFun
      .fileUpload(params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        hui.hMessage[err.data_no]({ content: err.msg, duration: DURATION || 2 })
        reject(err.msg)
      })
  })
}
