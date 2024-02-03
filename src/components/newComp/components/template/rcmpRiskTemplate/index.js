import rcmpRiskTemplate from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpRiskTemplate.install = function (Vue) {
  Vue.component(rcmpRiskTemplate.name, rcmpRiskTemplate)
}
// 默认导出组件
export default rcmpRiskTemplate
