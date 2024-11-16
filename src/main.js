import { createApp } from 'vue'
import App from './App.vue'
import routers from './router/router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import "normalize.css"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.use(routers)
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')