import rcmpSearchStockAccount from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSearchStockAccount.install = function (Vue) {
  Vue.component(rcmpSearchStockAccount.name, rcmpSearchStockAccount)
}
// 默认导出组件
export default rcmpSearchStockAccount
