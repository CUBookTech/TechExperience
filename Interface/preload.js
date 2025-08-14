const { contextBridge } = require('electron');
const { app } = require("electron");
const { execFile } = require('child_process');
const path = require('path');
const fs = require("fs");

contextBridge.exposeInMainWorld('electron', {
  runExe: (_path, args) => {
        execFile(path.join(__dirname, _path), args, (error, stdout, stderr) => {
            if (error) {
                console.error('Error:', error);
            return;
            }
        });
    },

    readConfig: () => {
        return fs.readFileSync(path.join(__dirname, 'launcher.cfg'), 'utf-8')
    },

    getApData: () => {
        return "nah";
    }
});