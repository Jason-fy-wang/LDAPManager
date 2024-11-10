import { createRouter, createWebHistory } from "vue-router"

/* eslint-disable */ 
import Home from '@/components/Home.vue'
import Detail from '@/components/EntryDetail.vue'

const routers = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "home",
            path: "/home",
            component: Home
        },
        {
            path: "/",
            redirect: "/home"

        },
        {
            name: "detail",
            path: "/detail/:dn",
            component: Detail
        }
    ]
})


export default routers

