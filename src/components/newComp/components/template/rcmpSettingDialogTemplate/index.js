import rcmpSettingDialogTemplate from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSettingDialogTemplate.install = function (Vue) {
  Vue.component(rcmpSettingDialogTemplate.name, rcmpSettingDialogTemplate)
}
// 默认导出组件
export default rcmpSettingDialogTemplate
