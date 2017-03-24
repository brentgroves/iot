// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import POReqTrans from './production/POReqTrans'
import Common from './Common'
import GenReceivers from './production/GenReceivers'
import ProdReports from './rpt/production/ProdReports'

const rootReducer = combineReducers({
  Common,
  POReqTrans,
  GenReceivers,
  ProdReports,
  routing
});

export default rootReducer;
