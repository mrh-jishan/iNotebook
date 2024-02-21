/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from '../utils';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let popupWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

/**
 * popupWindow create
 */
const createPopup = () => {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  // Define the percentages for positioning
  const xPercentage = 0.95; // 89% from the left
  const yPercentage = 0.15; // 15% from the top

  // Calculate the default position based on percentages
  const defaultX = Math.floor(screenWidth * xPercentage) - 100; // Assuming the width of the window is 100 pixels
  const defaultY = Math.floor(screenHeight * yPercentage); // Assuming the height of the window is 100 pixels

  popupWindow = new BrowserWindow({
    width: 100,
    height: 100,
    x: defaultX,
    y: defaultY,
    frame: false,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      devTools: false,
    },
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
  });

  popupWindow.loadURL(resolveHtmlPath('bubble.html'));

  // Implement dragging for the popup icon
  popupWindow.setIgnoreMouseEvents(false); // Enable mouse events to allow dragging
  popupWindow.setAlwaysOnTop(true); // Ensure the icon is always visible

  // new AppUpdater();
  console.log('this would be create popup-icon');
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  // Detect click outside of the main window
  mainWindow.on('blur', () => {
    // if (popupWindow === null) {
    //   createPopup();
    // } else {
    //   popupWindow.show();
    // }
    // mainWindow?.hide();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Create the chat bubble window
  // createChatBubbleWindow();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

// Handle click on the popup icon

ipcMain.on('close-popup', async () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
  popupWindow?.hide();
});

// Handle message from renderer process to start dragging

ipcMain.on('start-drag', (event, position) => {
  log.info('position moved----------: ', position);
  // log.info('event------:', event);
  const { x, y } = position;
  // // Update the position of the popupWindow
  popupWindow?.setPosition(x, y);
});

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    require('./ipcMain_notes')
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow();
      }
    });
  })
  .catch(console.log);
