import rcmpExchangeDateBox from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpExchangeDateBox.install = function (Vue) {
  Vue.component(rcmpExchangeDateBox.name, rcmpExchangeDateBox)
}
// 默认导出组件
export default rcmpExchangeDateBox
