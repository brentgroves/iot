import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import prodRoutes from './routes/production/routes';
import engRoutes from './routes/engineer/routes';
import motoRoutes from './routes/moto/routes';
import popperRoutes from './routes/popper/routes';
import configureStore from './store/configureStore';

const settings = require('electron').remote.require('electron-settings');

const val = settings.get('app');
console.log(`setting.app= ${val}`);
let store;
let history;
let routes;
switch (val) {
  case 'production':
    routes = prodRoutes;
    store = configureStore();
    history = syncHistoryWithStore(hashHistory, store);
    break;
  case 'engineer':
    routes = engRoutes;
    store = configureStore();
    history = syncHistoryWithStore(hashHistory, store);
    break;
  case 'moto':
    routes = motoRoutes;
    store = configureStore();
    history = syncHistoryWithStore(hashHistory, store);
    break;
  case 'popper':
    routes = popperRoutes;
    store = configureStore();
    history = syncHistoryWithStore(hashHistory, store);
    break;
  default:
    break;
}

console.log(val);
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
