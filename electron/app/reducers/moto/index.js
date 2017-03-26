// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import POReqTrans from './POReqTrans'
import Common from '../common/Common'
import GenReceivers from './GenReceivers'
import Moto from './Moto'
import ProdReports from '../rpt/production/ProdReports'

const rootReducer = combineReducers({
  Common,
  POReqTrans,
  GenReceivers,
  ProdReports,
  Moto,
  routing
});

export default rootReducer;
