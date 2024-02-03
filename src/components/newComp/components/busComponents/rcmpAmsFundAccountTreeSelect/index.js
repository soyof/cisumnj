import rcmpAmsFundAccountTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpAmsFundAccountTreeSelect.install = function (Vue) {
  Vue.component(rcmpAmsFundAccountTreeSelect.name, rcmpAmsFundAccountTreeSelect)
}
// 默认导出组件
export default rcmpAmsFundAccountTreeSelect
