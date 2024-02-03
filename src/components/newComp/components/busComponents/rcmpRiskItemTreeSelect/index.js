import rcmpRiskItemTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpRiskItemTreeSelect.install = function (Vue) {
  Vue.component(rcmpRiskItemTreeSelect.name, rcmpRiskItemTreeSelect)
}
// 默认导出组件
export default rcmpRiskItemTreeSelect
