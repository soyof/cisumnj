import rcmpUserSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpUserSelect.install = function (Vue) {
  Vue.component(rcmpUserSelect.name, rcmpUserSelect)
}
// 默认导出组件
export default rcmpUserSelect
