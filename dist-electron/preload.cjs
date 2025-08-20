"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
/* context bridge used to bridge data between electron process and main window  */
/* These functions will be loaded before the mainWindow is opened  */
electron.contextBridge.exposeInMainWorld("electron", {
    // On doesn't care if anyone is listeneing
    // Invoke Expects a return value
    startServer: (callback) => ipcOn("startServer", (response) => {
        callback(response);
    }),
    sendFrameAction: (payload) => {
        ipcSend("sendFrameAction", payload);
    },
    startOverlay: () => ipcSend("startOverlay", null),
    openExternalLink: (url) => ipcSend("openExternalLink", url),
    openHudsDirectory: () => ipcSend("openHudsDirectory", undefined),
});
function ipcInvoke(key) {
    return electron.ipcRenderer.invoke(key);
}
/* Using callbacks because these functions are async */
function ipcOn(key, callback) {
    electron.ipcRenderer.on(key, (_, payload) => callback(payload));
}
function ipcSend(key, payload) {
    electron.ipcRenderer.send(key, payload);
}
