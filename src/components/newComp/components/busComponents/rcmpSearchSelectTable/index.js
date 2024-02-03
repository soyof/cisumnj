import rcmpSearchSelectTable from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSearchSelectTable.install = function (Vue) {
  Vue.component(rcmpSearchSelectTable.name, rcmpSearchSelectTable)
}
// 默认导出组件
export default rcmpSearchSelectTable
