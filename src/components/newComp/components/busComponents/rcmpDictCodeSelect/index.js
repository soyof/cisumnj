import rcmpDictCodeSelect from './src'
// 为组件提供 install 安装方法，供按需引入
rcmpDictCodeSelect.install = function (Vue) {
  Vue.component(rcmpDictCodeSelect.name, rcmpDictCodeSelect)
}
// 默认导出组件
export default rcmpDictCodeSelect