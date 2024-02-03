import rcmpStockGroup from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpStockGroup.install = function (Vue) {
  Vue.component(rcmpStockGroup.name, rcmpStockGroup)
}
// 默认导出组件
export default rcmpStockGroup
