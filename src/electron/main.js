const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const {IsLogin,LoginLdap,LdapSearchAll, LdapSearchWithDn,LdapSearchObjectclass,LdapEntryAdd,LdapEntryDel} = require("./ldap/ldap")
const path = require("node:path")

try {
    require('electron-reloader')(module)
}catch(_){}

const createWindow = () => {
    const win = new BrowserWindow ({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
            //contextIsolation: false
        }
    })
    

    // remove menu
    Menu.setApplicationMenu(null)
    
    if (process.env.NODE_ENV === "dev") {
        console.log("path: ", __dirname)
        win.loadURL("http://localhost:5173/")
        win.webContents.openDevTools()

        // open devtools 
        win.webContents.on("devtools-closed", () => {
            win.webContents.openDevTools()
        })
    }else {
        // production 
        const indexPath = path.join(process.resourcesPath,"app.asar","dist","index.html")
        win.loadFile(indexPath)
    }
}

function searchAll(event,domain) {
    result = LdapSearchAll(domain)
    return result
}

function searchObjectClass() {
    return LdapSearchObjectclass()
}

function searchDn(event, dn) {
    return LdapSearchWithDn(dn)
}

function addEntry(event, dn, entry) {
    console.log("main add entry: ", entry, typeof(entry))
    return LdapEntryAdd(dn,entry)
}

function delEntry(event, dn) {
    return LdapEntryDel(dn)
}

function login(event, host,port,user, passwd) {
    return LoginLdap(host,port,user, passwd)
}

function isLogin() {
    return IsLogin()
}

app.whenReady().then( () => {
    ipcMain.handle("ldap:all", searchAll)

    ipcMain.handle("ldap:objectclass", searchObjectClass)

    ipcMain.handle("ldap:dn", searchDn)

    ipcMain.handle("ldap:addEntry", addEntry)

    ipcMain.handle("ldap:delEntry", delEntry)

    ipcMain.handle("ldap:login", login)

    ipcMain.handle("ldap:checklogin", isLogin)

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
