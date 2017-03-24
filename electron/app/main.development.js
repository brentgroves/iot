import { app, BrowserWindow, Menu, shell,ipcMain } from 'electron';
//require('pdfjs-dist');
const qs = require ("querystring");
var fs = require('fs');
var path = require("path");
const settings = require('electron-settings');

let menu;
let template;
let mainWindow = null;
let pdfWindow = null;
let temp=app.getPath('temp');

const debug=true;


settings.defaults({
  app: 'production'
});



if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if ((true==debug)||(process.env.NODE_ENV === 'development')) {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if ((true==debug)||(process.env.NODE_ENV === 'development')) {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  }
};
ipcMain.on('asynchronous-message', (event, fullPathName) => {
  console.log(fullPathName);  // prints "ping"

  pdfWindow = new BrowserWindow({
    show: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });
  let pdfURL = 'file://' + fullPathName;
//    let pdfURL = 'file://' + app.getPath('temp') + '/myfile.pdf';
  let param = qs.stringify({file: pdfURL});
  if ('development'==process.env.NODE_ENV) {
    console.log(`pdfURL: ${pdfURL}`);
    console.log(param);
  }
//  pdfWindow.webContents.openDevTools();
  pdfWindow.on('closed', function() {
    pdfWindow = null;
  });

  pdfWindow.loadURL('file://' + __dirname + '/pdfjs/web/viewer.html?' + param);
  //event.sender.send('asynchronous-reply', 'pong')
  
});

app.on('ready', async () => {
  await installExtensions();


  await settings.get('app').then(val => {
    var width;
    var height;
    switch (val) {
      case 'production':
        width=1400;
        height=1200;
        break;
      case 'engineer':
        width=1900;
        height=1200;
        break;
      default:
        break;
    }

    mainWindow = new BrowserWindow({
      show: false,
      width: width,
      height: height
    });


    mainWindow.loadURL(`file://${__dirname}/html/production/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show();
      mainWindow.focus();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    if ((true==debug)||(process.env.NODE_ENV === 'development')) {
      mainWindow.openDevTools();
      mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([{
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(x, y);
          }
        }]).popup(mainWindow);
      });
    }

    menu = Menu.buildFromTemplate(template);
    //    mainWindow.setMenu(menu);
    mainWindow.setMenu(null);

  });



});
