import rcmpRiskTypeTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpRiskTypeTreeSelect.install = function (Vue) {
  Vue.component(rcmpRiskTypeTreeSelect.name, rcmpRiskTypeTreeSelect)
}
// 默认导出组件
export default rcmpRiskTypeTreeSelect
