import rcmpDrawer from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpDrawer.install = function (Vue) {
  Vue.component(rcmpDrawer.name, rcmpDrawer)
}
// 默认导出组件
export default rcmpDrawer
