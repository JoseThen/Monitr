'use strict';
const electron = require('electron');
const app = electron.app;
const ipc = require('electron').ipcMain;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')(__dirname);


require('electron-reload')(__dirname, {
    hardResetMethod: 'exit'
});

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    // dereference the window
    // for multiple windows store them in an array
    mainWindow = null;
}

function createMainWindow() {
    const win = new electron.BrowserWindow({
        // titleBarStyle: 'customButtonsOnHover',
        frame: false,
        width: 600,
        height: 400,
        minWidth: 580,
        title: 'MonitrTitle'

    });

    win.loadURL(`file://${__dirname}/src/index.html`);
    win.webContents.openDevTools();
    win.on('closed', onClosed);


    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});


ipc.on('update-notify-value', function(event, arg) {
    mainWindow.webContents.send('targetPriceVal', arg)
});

ipc.on('update-coin-value', function(event, arg){
	mainWindow.webContents.send('coinTicker', arg)
});

