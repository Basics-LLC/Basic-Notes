const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let mainWindow
/**
 * create main window for our application
 */
function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })
  //Open the dev tools
  // mainWindow.webContents.openDevTools()

  // Create Menu
  menuTemplate = require('./frontend/static/js/menu.js')(mainWindow);
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile(__dirname + '/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
