import { createRouter, createWebHistory } from "vue-router"

/* eslint-disable */ 
import Home from '@/components/Home.vue'
import Detail from '@/components/EntryDetail.vue'
import Entryadd from '@/components/EntryAdd.vue'

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
        },
        {
            name: "entryadd",
            path: "/entry/add",
            component: Entryadd
        }
    ]
})


export default routers

