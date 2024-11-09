import { createApp } from 'vue'
import App from './App.vue'
import routers from './router/router'
import ElementPlus from 'element-plus'

import "normalize.css"
import 'element-plus/dist/index.css'


const app = createApp(App)
app.use(ElementPlus)
app.use(routers)
app.mount('#app')