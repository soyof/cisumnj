import rcmpDataGrid from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpDataGrid.install = function (Vue) {
  Vue.component(rcmpDataGrid.name, rcmpDataGrid)
}
// 默认导出组件
export default rcmpDataGrid
