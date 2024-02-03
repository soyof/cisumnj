import rcmpSplitTable from './src';
// 为组件提供 install 安装方法，供按需引入
rcmpSplitTable.install = function(Vue) {
  Vue.component(rcmpSplitTable.name || 'rcmpSplitTable', rcmpSplitTable);
};
// 默认导出组件
export default rcmpSplitTable;
