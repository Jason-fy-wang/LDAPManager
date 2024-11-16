import { defineStore } from "pinia"
import useLdap from "@/pages/api/useLdap"


export const useObjectAttributes = defineStore("objectattribute",{
        state: ()=>({
            attributes: {}
        }),
        actions: {
            async fetchAttribute() {
                //if (!this.attributes.top) {
                    const {objectClasses, getObjectAttribute} = useLdap()
                    const objs = await objectClasses()
                    const res = await getObjectAttribute(objs[0])
                    console.log("got res: ", res)
                    this.attributes = res
                //}
            },
        }
    }
    
)


