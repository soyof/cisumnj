import rcmpRiskLeveleSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpRiskLeveleSelect.install = function (Vue) {
  Vue.component(rcmpRiskLeveleSelect.name, rcmpRiskLeveleSelect)
}
// 默认导出组件
export default rcmpRiskLeveleSelect
