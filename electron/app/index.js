import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import prodRoutes from './routes/production/routes';
//import routes from './routes/production/routes';
import engRoutes from './routes/engineer/routes';
import motoRoutes from './routes/moto/routes';
import configureStore from './store/configureStore';

const settings = require('electron-settings');

settings.defaults({
  app: 'production'
});

/*
var dept = settings.getSync('dept');
console.log(dept);
switch (dept) {
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
  default:
//	store = configureStore();
//	history = syncHistoryWithStore(hashHistory, store);
    break;
}
*/
/*
settings.get('dept').then(val => {
	console.log(val);
	var dept=val;
	//  whichApp=`file://${__dirname}/html/production/app.html`;
	switch (dept) {
	  case 'production':
		store = configureStore();
		history = syncHistoryWithStore(hashHistory, store);
	    break;
	  case 'engineer':
		store = configureStore();
		history = syncHistoryWithStore(hashHistory, store);
	    break;
	  default:
		store = configureStore();
		history = syncHistoryWithStore(hashHistory, store);
	    break;
	}
});
*/
/*
var dept = settings.getSync('dept');

-
console.log(dept);

if('production'==dept){
	store = configureStore();
	history = syncHistoryWithStore(hashHistory, store);

}else{
	store = configureStore();
	history = syncHistoryWithStore(hashHistory, store);

}
*/
settings.get('app').then(val => {
	var store;
	var history;
	var dept;
	var routes;
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
	  default:
//	  	routes = prodRoutes;
//		store = configureStore();
//		history = syncHistoryWithStore(hashHistory, store);
	    break;
	}

  	console.log(val);
	render(
	  <Provider store={store}>
	    <Router history={history} routes={routes} />
	  </Provider>,
	  document.getElementById('root')
	);
});


