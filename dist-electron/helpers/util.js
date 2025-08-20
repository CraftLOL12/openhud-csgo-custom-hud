import { ipcMain, Notification } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { app, shell } from "electron";
import path from "path";
import fs from "fs";
export let userHasCustomHud;
/* Tells our electron script if we are in development mode or not */
export function isDev() {
    return process.env.NODE_ENV === "development";
}
// Using generics to set the type of key which determines the handler type
export function ipcMainHandle(key, handler) {
    ipcMain.handle(key, (event) => {
        // Verify the url the user is accessing the fil from
        if (event.senderFrame) {
            validateEventFrame(event.senderFrame);
        }
        return handler();
    });
}
export function ipcMainOn(key, handler) {
    ipcMain.on(key, (event, payload) => {
        // Verify the url the user is accessing the fil from
        if (event.senderFrame) {
            validateEventFrame(event.senderFrame);
        }
        return handler(payload);
    });
}
export function ipcWebContentsSend(key, webContents, payload) {
    webContents.send(key, payload);
}
export function validateEventFrame(frame) {
    // verify when in dev mode
    if (isDev() && new URL(frame.url).host === "localhost:5123") {
        return;
    }
    // if request comes from something other than our index.html file
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error("Frame URL Error: possible malicious event");
    }
}
function createMissingDir(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
}
// Ensure we have a userData folder and a Huds folder to store custom built huds
export function checkDirectories() {
    const userData = app.getPath("userData");
    const customHudDir = path.join(app.getPath("home"), "OpenHud-Huds");
    const uploadsDir = path.join(userData, "uploads");
    const playerPicturesDir = path.join(uploadsDir, "player_pictures");
    const teamLogosDir = path.join(uploadsDir, "team_logos");
    [customHudDir, userData, uploadsDir, playerPicturesDir, teamLogosDir].forEach(createMissingDir);
    /* Check to see if the user has a custom hud loaded */
    const customHudData = path.join(app.getPath("home"), "OpenHud-Huds/build/index.html");
    if (fs.existsSync(customHudData)) {
        userHasCustomHud = true;
    }
    else {
        userHasCustomHud = false;
    }
}
export function showNotification(body) {
    new Notification({
        title: "OpenHud:",
        body,
    }).show();
}
export function openHudsDirectory() {
    const customHudDir = path.join(app.getPath("home"), "OpenHud-Huds");
    shell.openPath(customHudDir); // ✅ Correct way to open the folder
}
