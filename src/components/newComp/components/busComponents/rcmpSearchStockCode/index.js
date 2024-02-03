import rcmpSearchStockCode from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSearchStockCode.install = function (Vue) {
  Vue.component(rcmpSearchStockCode.name, rcmpSearchStockCode)
}
// 默认导出组件
export default rcmpSearchStockCode
