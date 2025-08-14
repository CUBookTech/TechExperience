const { app, BrowserWindow, contextBridge } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
   fullscreen: true,
   webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})