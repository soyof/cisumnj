import rcmpSearchTemplate from './src';
// 为组件提供 install 安装方法，供按需引入
rcmpSearchTemplate.install = function(Vue) {
  Vue.component(rcmpSearchTemplate.name, rcmpSearchTemplate);
};
// 默认导出组件
export default rcmpSearchTemplate;
