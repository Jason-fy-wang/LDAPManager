import { defineStore } from "pinia"
import useLdap from "@/pages/api/useLdap"


export const useObjectAttributes = defineStore("objectattribute",{
        state: ()=>({
            attributes: {},
            loginState: false,
            loginName: "anonymous",
            displayName: "anonymous",
            domainName: "anonymous",
        }),
        getters: {
            isLogin: (state) => {
                return state.loginState
            },
            userName: (state) => {
                return state.loginName
            },
            getDisplayName: (state) => {
                return state.displayName
            },
            getDomainName: (state) => {
                return state.domainName
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
                const names = userName.split(",")
                this.displayName = names[0]
                this.domainName = names.slice(1).join(",")
            },
            logout (){
                this.loginState = false
                this.loginName = "anonymous"
            }
        }
    }
)


