import rcmpZTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpZTreeSelect.install = function (Vue) {
  Vue.component(rcmpZTreeSelect.name, rcmpZTreeSelect)
}
// 默认导出组件
export default rcmpZTreeSelect
