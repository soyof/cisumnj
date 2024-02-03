import rcmpSearchRelatedAccount from './src';
// 为组件提供 install 安装方法，供按需引入
rcmpSearchRelatedAccount.install = (Vue) => {
  Vue.component(rcmpSearchRelatedAccount.name, rcmpSearchRelatedAccount);
};
// 默认导出组件
export default rcmpSearchRelatedAccount;
