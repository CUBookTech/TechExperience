const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
   fullscreen: true,
   webPreferences: {
      preload: "C:\\Users\\CUBS Customer\\Documents\\TechExp\\preload.js",//path.join(__dirname, 'preload.js')
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
