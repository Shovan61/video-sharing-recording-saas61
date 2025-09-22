import { app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
	? path.join(process.env.APP_ROOT, "public")
	: RENDERER_DIST;

let win: BrowserWindow | null;
let studio: BrowserWindow | null;
let floaingWebCam: BrowserWindow | null;

function createWindow() {
	win = new BrowserWindow({
		width: 600,
		height: 600,
		minHeight: 600,
		minWidth: 300,
		frame: true,
		hasShadow: false,
		transparent: true,
		alwaysOnTop: true,
		focusable: true, // <-- must be true for your main window
		backgroundColor: "#00000000", // transparent background that still paints
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			devTools: true,
			preload: path.join(__dirname, "preload.mjs"),
		},
	});

	studio = new BrowserWindow({
		width: 400,
		height: 50,
		minHeight: 70,
		maxHeight: 400,
		minWidth: 300,
		maxWidth: 400,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		focusable: true,
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			devTools: true,
			preload: path.join(__dirname, "preload.mjs"),
		},
	});

	floaingWebCam = new BrowserWindow({
		width: 400,
		height: 200,
		minHeight: 70,
		maxHeight: 400,
		minWidth: 300,
		maxWidth: 400,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		focusable: true,
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			devTools: true,
			preload: path.join(__dirname, "preload.mjs"),
		},
	});

	win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
	win.setAlwaysOnTop(true, "screen-saver", 1);

	studio.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
	studio.setAlwaysOnTop(true, "screen-saver", 1);

	floaingWebCam.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
	floaingWebCam.setAlwaysOnTop(true, "screen-saver", 1);

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(RENDERER_DIST, "index.html"));
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
