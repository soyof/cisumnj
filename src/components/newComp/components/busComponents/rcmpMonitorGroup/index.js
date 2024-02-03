import rcmpMonitorGroup from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpMonitorGroup.install = function (Vue) {
  Vue.component(rcmpMonitorGroup.name, rcmpMonitorGroup)
}
// 默认导出组件
export default rcmpMonitorGroup
