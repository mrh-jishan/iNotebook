import { app, BrowserWindow, shell, ipcMain, screen } from 'electron';
import log from 'electron-log';
import jetpack from 'fs-jetpack';
import crypto from 'crypto';
import os from 'os';

const cwd = `${app.getPath('userData')}/${os.userInfo().username}`;

// when try to add note
ipcMain.on('add-note', async (event, arg) => {
  const createdFile = `${crypto.randomUUID()}.md`;
  jetpack.cwd(cwd).write(createdFile, '');
  event.reply('add-note', {
    title: `title - ${createdFile}`,
    markdown: '',
    path: createdFile,
  });
});

// on update note
ipcMain.on('update-note', async (event, arg) => {
  const { file, md } = arg;
  jetpack.cwd(cwd).write(file, md);
});

ipcMain.on('get-note', async (event, arg) => {
  const md = jetpack.read(`${cwd}/${arg}`);
  event.reply('get-notes', md);
});

ipcMain.on('load-notes', async (event, arg) => {
  const data = jetpack
    .list(cwd)
    ?.filter((f) => f.endsWith('.md'))
    .map((file) => {
      const md = jetpack.read(`${cwd}/${file}`);
      return {
        title: md,
        markdown: md,
        path: file,
      };
    });
  console.log('data: ', data);
  event.reply('load-notes', data);
});

// ipp-example
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  log.info('message received-----: ', msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

module.exports = {};
