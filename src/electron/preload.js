const{ipcRenderer,contextBridge} =  require('electron/renderer')


contextBridge.exposeInMainWorld("EAPI", {
    searchAll: () => {
        res = ipcRenderer.invoke("ldap:all")
        return res
    },

    objectClasses: () => {
        const res = ipcRenderer.invoke("ldap:objectclass")
        console.log("preload objectClass: ", res)
        return res
    },
    searchDn: (dn) => {
        const res = ipcRenderer.invoke("ldap:dn", dn)
        return res
    }
})
