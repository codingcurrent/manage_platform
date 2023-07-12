import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import svgIcon from '@/components/svgIcon/index.vue'
import router from './router'
import '@/styles/index.scss' // 引入全局样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import '../permission'
//大仓库
import { createPinia } from 'pinia'
//创建大仓库
let pinia = createPinia()

// 挂载
let app = createApp(App)

app.use(router)
app.use(pinia)

app.component('svgIcon', svgIcon) // 将svgIcon设为全局组件
// 将ele+的图标注册成为组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
