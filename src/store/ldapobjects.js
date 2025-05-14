import { defineStore } from "pinia"
import useLdap from "@/pages/api/useLdap"


export const useObjectAttributes = defineStore("objectattribute",{
        state: ()=>({
            attributes: {}
        }),
        actions: {
            async fetchAttribute() {
                const {objectClasses, getObjectAttribute} = useLdap()
                const objs = await objectClasses()
                const res = await getObjectAttribute(objs[0])
                //console.log("got res: ", res)
                this.attributes = res
            },
        }
    }
    
)


