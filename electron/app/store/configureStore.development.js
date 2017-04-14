import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import productionReducer from '../reducers/production';
import engineerReducer from '../reducers/engineer';
import motoReducer from '../reducers/moto';
import popperReducer from '../reducers/popper';
// test extensions
import { composeWithDevTools } from 'redux-devtools-extension';

var rootReducer;

const settings = require('electron-settings');

settings.defaults({
  app: 'production'
});

settings.get('app').then(val => {
  switch (val) {
    case 'production':
      rootReducer = productionReducer;
      break;
    case 'engineer':
      rootReducer = engineerReducer;
      break;
    case 'moto':
      rootReducer = motoReducer;
      break;
    case 'popper':
      rootReducer = popperReducer;
      break;
    default:
      rootReducer = productionReducer;
      break;
  }

    console.log(val);
});

const actionCreators = {
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    //https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
    actionCreators,
  }) :
  compose;
*/
/* eslint-enable no-underscore-dangle */
/*
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

*/
/* STILL CANT GET DEVTOOLS WORKING WITH EITHER CONFIGURATION  */
const composeEnhancers = composeWithDevTools({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  });

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/production', () =>
      store.replaceReducer(require('../reducers/production')) // eslint-disable-line global-require
    );
  }

  return store;
}
