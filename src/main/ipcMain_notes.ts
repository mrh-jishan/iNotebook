import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import log from 'electron-log';
import jetpack from 'fs-jetpack';
import crypto from 'crypto';

export const writeFile = () => {
  //     const remote = require('electron').remote;
  // const app = remote.app;
  // console.log(app.getPath('userData'));
};

// when try to add note
ipcMain.on('add-note', async (event, arg) => {
  const cwd = app.getPath('userData');
  const createdFile = `${crypto.randomUUID()}.md`;
  jetpack.cwd(cwd).write(createdFile, '');
  const obj = {
    title: `title - ${createdFile}`,
    markdown: '',
    path: createdFile,
  };
  event.reply('add-note-receivd', obj);
});

// on update note
ipcMain.on('update-note', async (event, arg) => {
  const cwd = app.getPath('userData');

  // console.log('this is update note', event);
  console.log('this is update note', arg);

  // const createdFile = `${crypto.randomUUID()}.md`;
  // jetpack.cwd(cwd).write(createdFile, '');
  // const obj = { greet: 'Hello World!', createdFile };
  // event.reply('add-note', obj);
});

// ipp-example
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log.info('message received-----: ', msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

module.exports = {};
