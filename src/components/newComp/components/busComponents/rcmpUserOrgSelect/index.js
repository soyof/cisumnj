import rcmpUserOrgSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpUserOrgSelect.install = function (Vue) {
  Vue.component(rcmpUserOrgSelect.name, rcmpUserOrgSelect)
}
// 默认导出组件
export default rcmpUserOrgSelect
