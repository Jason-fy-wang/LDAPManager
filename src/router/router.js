import { createRouter, createWebHistory } from "vue-router"

/* eslint-disable */ 
import Home from '@/components/Home.vue'
import Detail from '@/components/EntryDetail.vue'
import Entryadd from '@/components/EntryAdd.vue'
import Login from '@/components/Login.vue'
import { useObjectAttributes } from "@/store/ldapobjects"

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
    const store  = useObjectAttributes()
    const loginStatus = store.isLogin
    //console.log("beforeEach: ", to, from,loginStatus)

    const publicPages = ["login"]

    if (publicPages.includes(to.name)) {
        if (loginStatus) {
            next({ name: "home" })
        }else{
            next()
        }
    }else{

        if (loginStatus) {
            next()
        }else{
            next({ name: "login" })
        }

    }

})

export default routers

