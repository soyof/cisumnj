import rcmpBranchTreeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpBranchTreeSelect.install = function (Vue) {
  Vue.component(rcmpBranchTreeSelect.name, rcmpBranchTreeSelect)
}
// 默认导出组件
export default rcmpBranchTreeSelect
