import rcmpSearchBox from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpSearchBox.install = function (Vue) {
  Vue.component(rcmpSearchBox.name, rcmpSearchBox)
}
// 默认导出组件
export default rcmpSearchBox
