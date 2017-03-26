// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../../containers/App';
import HomePage from '../../containers/moto/HomePage';
import POReqTrans from '../../containers/moto/port/POReqTrans';
import GenReceivers from '../../containers/moto/gr/GenReceivers'
import ProdReports from '../../containers/rpt/production/Reports'
import Fan from '../../containers/moto/Fan'
import '../../css/moto/app.global.css';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/POReqTrans" component={POReqTrans} />
    <Route path="/GenReceivers" component={GenReceivers} />
    <Route path="/ProdReports" component={ProdReports} />
    <Route path="/Fan" component={Fan} />
  </Route>
);
