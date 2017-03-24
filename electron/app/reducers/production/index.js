// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import POReqTrans from './POReqTrans'
import Common from '../common/Common'
import GenReceivers from './GenReceivers'
import ProdReports from '../rpt/production/ProdReports'

const rootReducer = combineReducers({
  Common,
  POReqTrans,
  GenReceivers,
  ProdReports,
  routing
});

export default rootReducer;
