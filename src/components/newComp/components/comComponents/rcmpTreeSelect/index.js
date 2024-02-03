import rcmpTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpTreeSelect.install = function (Vue) {
  Vue.component(rcmpTreeSelect.name, rcmpTreeSelect)
}
// 默认导出组件
export default rcmpTreeSelect
