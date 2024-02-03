import rcmpAMSDepartment from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpAMSDepartment.install = function (Vue) {
  Vue.component(rcmpAMSDepartment.name, rcmpAMSDepartment)
}
// 默认导出组件
export default rcmpAMSDepartment
