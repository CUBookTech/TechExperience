const { contextBridge } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  runExe: (path, args) => {
    const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    
   // const exePath = 'https://www.roblox.com/charts#/'; // Adjust the path
    execFile(path, args, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        return;
      }
      console.log('Output:', stdout);
    });
  }
});