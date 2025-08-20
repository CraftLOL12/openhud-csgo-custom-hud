import { app, Menu } from "electron";
import { isDev } from "./helpers/util.js";
export function createMenu(mainWindow) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            // MacOS makes first option a default name
            label: process.platform === "darwin" ? undefined : "OpenHud",
            type: "submenu",
            submenu: [
                {
                    label: "Quit",
                    click: app.quit,
                },
                // {
                //   label: "DevTools",
                //   click: () => {
                //     mainWindow.webContents.openDevTools();
                //   },
                //   visible: isDev(),
                // },
            ],
        },
        {
            label: "DevTools",
            click: () => {
                mainWindow.webContents.openDevTools();
            },
            visible: isDev(),
        },
    ]));
}
