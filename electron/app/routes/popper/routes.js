// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../../containers/App';
import HomePage from '../../containers/popper/HomePage';
import '../../css/popper/app.global.css';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);
/*
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/Fan" component={Fan} />
  </Route>
);
*/