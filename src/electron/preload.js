const{ipcRenderer,contextBridge} =  require('electron/renderer')


contextBridge.exposeInMainWorld("EAPI", {
    searchAll: () => {
        res = ipcRenderer.invoke("ldap:all")
        return res
    },
    objectClasses: () => {
        const res = ipcRenderer.invoke("ldap:objectclass")
        //console.log("preload objectClass: ", res)
        return res
    },
    searchDn: (dn) => {
        const res = ipcRenderer.invoke("ldap:dn", dn)
        return res
    },
    addEntry: (dn) => {
        const res = ipcRenderer.invoke("ldap:addEntry", dn)
        return res
    },
    delEntry: (dn) => {
        const res = ipcRenderer.invoke("ldap:delEntry", dn)
        return res
    }
})
