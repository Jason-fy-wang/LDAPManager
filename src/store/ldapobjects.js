import { defineStore } from "pinia"
import useLdap from "@/pages/api/useLdap"


export const useObjectAttributes = defineStore("objectattribute",{
        state: ()=>({
            attributes: {},
            loginState: false,
            loginName: "anonymous",
        }),
        getters: {
            isLogin: (state) => {
                return state.loginState
            },
            userName: (state) => {
                return state.loginName
            },
        },
        actions: {
            async fetchAttribute() {
                const {objectClasses, getObjectAttribute} = useLdap()
                const objs = await objectClasses()
                const res = await getObjectAttribute(objs[0])
                //console.log("got res: ", res)
                this.attributes = res
            },
            login(userName) {
                this.loginState = true
                this.loginName = userName
            },
            logout (){
                this.loginState = false
                this.loginName = "anonymous"
            }
        }
    }
)


