const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const {LdapSearchAll} = require("./ldap/ldap")
const path = require("node:path")


const createWindow = () => {
    const win = new BrowserWindow ({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    

    // remove menu
    Menu.setApplicationMenu(null)
    
    if (process.env.NODE_ENV === "dev") {
        console.log("path: ", __dirname)
        win.loadURL("http://localhost:8080/")
        win.webContents.openDevTools()
    }else {
        win.loadFile("./public/index.html")
    }
}

function searchAll() {
    result = LdapSearchAll()
    return result
}


app.whenReady().then( () => {
    ipcMain.handle("ldap:all", searchAll)

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
