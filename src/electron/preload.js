const{ipcRenderer,contextBridge} =  require('electron/renderer')


contextBridge.exposeInMainWorld("EAPI", {
    searchAll: (domain) => {
        res = ipcRenderer.invoke("ldap:all",domain)
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
    addEntry: (dn, attribute) => {
        console.log("preload addEntry : ", attribute)
        const res = ipcRenderer.invoke("ldap:addEntry", dn,attribute)
        return res
    },
    delEntry: (dn) => {
        const res = ipcRenderer.invoke("ldap:delEntry", dn)
        return res
    },
    login: (host, port, user, passwd) => {
        const res = ipcRenderer.invoke("ldap:login", host, port, user, passwd)
        return res
    },
    isLogin: () => {
        const res = ipcRenderer.invoke("ldap:checklogin")
        return res
    },
})
