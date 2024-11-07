const{ipcRenderer,contextBridge} =  require('electron/renderer')


contextBridge.exposeInMainWorld("EAPI", {
    searchAll: () => {
        res = ipcRenderer.invoke("ldap:all")
        return res
    }
})
