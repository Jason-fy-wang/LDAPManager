import { createRouter, createWebHistory } from "vue-router"

/* eslint-disable */ 
import Home from '@/components/Home.vue'
import Detail from '@/components/EntryDetail.vue'
import Entryadd from '@/components/EntryAdd.vue'
import Login from '@/components/Login.vue'
import useLdap from "@/pages/api/useLdap"

const { isLogin } = useLdap()
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
            redirect: "/login"
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
        },
        {
            name: "login",
            path: "/login",
            component: Login
        }
    ]
})

routers.beforeEach(async (to, from, next) => {
    const loginStatus = await isLogin()
    console.log("beforeEach: ", to, from,loginStatus)
    // not login
    if (to.name !== "login" && !loginStatus) {
        next({ name: "login" })
        // already login
    }else if (to.name === "login" && loginStatus) {
        next({ name: "home" })
    }else{
        next()
    }
})

export default routers

