const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const {LdapSearchAll, LdapSearchWithDn,LdapSearchObjectclass} = require("./ldap/ldap")
const path = require("node:path")

try {
    require('electron-reloader')(module)
}catch(_){}

const createWindow = () => {
    const win = new BrowserWindow ({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            //contextIsolation: false
        }
    })
    

    // remove menu
    Menu.setApplicationMenu(null)
    
    if (process.env.NODE_ENV === "dev") {
        console.log("path: ", __dirname)
        win.loadURL("http://localhost:5173/")
        win.webContents.openDevTools()
    }else {
        win.loadFile("./public/index.html")
    }
}

function searchAll() {
    result = LdapSearchAll()
    return result
}

function searchObjectClass() {
    return LdapSearchObjectclass()
}

function searchDn(event, dn) {
    return LdapSearchWithDn(dn)
}


app.whenReady().then( () => {
    ipcMain.handle("ldap:all", searchAll)

    ipcMain.handle("ldap:objectclass", searchObjectClass)

    ipcMain.handle("ldap:dn", searchDn)

    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit()
    }
})
