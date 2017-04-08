// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import productionReducer from '../reducers/production';
import engineerReducer from '../reducers/engineer';
import motoReducer from '../reducers/moto';
import popperReducer from '../reducers/popper';

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

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
