import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import routers from './router/router'


const app = createApp(App)
app.use(ElementPlus)
app.use(routers)
app.mount('#app')