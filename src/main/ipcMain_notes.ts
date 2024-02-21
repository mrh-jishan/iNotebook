import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import log from 'electron-log';

export const writeFile = () => {
  //     const remote = require('electron').remote;
  // const app = remote.app;
  // console.log(app.getPath('userData'));
};

ipcMain.on('add-note', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log.info('message received add note-----: ', msgTemplate(arg));

  console.log('userData: ----------: ',app.getPath('userData'));
  

  event.reply('add-note', msgTemplate('pong'));
});


// ipp-example

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log.info('message received-----: ', msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


module.exports = {};
