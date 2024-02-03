import rcmpSimpleSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSimpleSelect.install = function (Vue) {
  Vue.component(rcmpSimpleSelect.name, rcmpSimpleSelect)
}
// 默认导出组件
export default rcmpSimpleSelect
