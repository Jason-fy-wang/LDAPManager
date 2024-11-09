import { createRouter, createWebHistory } from "vue-router"

/* eslint-disable */ 
import Home from '@/components/Home.vue'

const routers = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "detail",
            path: "/home",
            component: Home
        },
        {
            path: "/",
            redirect: "/home"

        }
    ]
})


export default routers

