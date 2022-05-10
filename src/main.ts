
/* eslint-disable */
import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "element-plus/es/components/icon/style/css"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
  locale: zhCn,
})

import '@/styles/global/index.less'
import 'normalizecss/normalize.css'

import axios from '@/plugins/axios'

// 全局组件相关
import globalComponents from './globalComponents'

globalComponents(app)

app.config.globalProperties.$http = axios

app.use(ElementPlus).use(store).use(router).mount('#app')
