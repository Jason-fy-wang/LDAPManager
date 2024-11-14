
const ldap = {
     searchAll: async () => {
        const res = await window.EAPI.searchAll()
        //console.log("render searchAll:", res)
        return res
    },

    objectClasses: async ()=>{
        const res = await window.EAPI.objectClasses()
        console.log("render objectClasses:", res)
        return res
    },
    searchDn:  async (dn) => {
        const res = await window.EAPI.searchDn(dn)
        console.log("render searchDn:", res)
        return res
    }
}



export {ldap}

