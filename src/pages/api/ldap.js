
const ldap = {
     searchAll: async () => {
        const res = await window.EAPI.searchAll()
        //console.log("render ldap:", res)
        return res
    }
}



module.exports = {ldap}

