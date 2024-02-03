import rcmpBusinessFlag from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpBusinessFlag.install = function (Vue) {
  Vue.component(rcmpBusinessFlag.name, rcmpBusinessFlag)
}
// 默认导出组件
export default rcmpBusinessFlag
