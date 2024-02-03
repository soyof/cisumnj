import rcmpSettingInlineTemplate from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSettingInlineTemplate.install = function (Vue) {
  Vue.component(rcmpSettingInlineTemplate.name, rcmpSettingInlineTemplate)
}
// 默认导出组件
export default rcmpSettingInlineTemplate
