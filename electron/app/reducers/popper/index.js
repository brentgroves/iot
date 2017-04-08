// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import Popper from './Popper'

const rootReducer = combineReducers({
  Popper,
  routing
});

export default rootReducer;
