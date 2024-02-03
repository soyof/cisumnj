import rcmpAMSFundAccount from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpAMSFundAccount.install = function (Vue) {
  Vue.component(rcmpAMSFundAccount.name, rcmpAMSFundAccount)
}
// 默认导出组件
export default rcmpAMSFundAccount
