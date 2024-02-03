import rcmpDictCodeSimpleSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpDictCodeSimpleSelect.install = function (Vue) {
  Vue.component(rcmpDictCodeSimpleSelect.name, rcmpDictCodeSimpleSelect)
}
// 默认导出组件
export default rcmpDictCodeSimpleSelect
