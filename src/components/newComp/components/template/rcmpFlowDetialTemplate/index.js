import rcmpFlowDetialTemplate from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpFlowDetialTemplate.install = function (Vue) {
  Vue.component(rcmpFlowDetialTemplate.name, rcmpFlowDetialTemplate)
}
// 默认导出组件
export default rcmpFlowDetialTemplate
