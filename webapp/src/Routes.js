import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import ToolCostSummaryByPlant from "./containers/ToolCostSummaryByPlant";
import Wait from "./containers/Wait";
import ErrorModal from "./containers/ErrorModal";
import AppliedRoute from "./components/AppliedRoute";
/*
    <AppliedRoute path="/" exact 
    component={ childProps.isAuthenticated ? Wait : Wait } 
    props={childProps} />

*/

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact 
    component={ childProps.isAuthenticated ? Login : Login } 
    props={childProps} />
    <AppliedRoute path="/wait" exact component={Wait} props={childProps} />
    <AppliedRoute path="/errorModal" exact component={ErrorModal} props={childProps} />

    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
	<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
	<AppliedRoute path="/tcsbyplant" exact component={ToolCostSummaryByPlant} props={childProps} />


	{ /* Finally, catch all unmatched routes */ }
	<Route component={NotFound} />
  </Switch>;


/*
    <AppliedRoute path="/" exact 
    component={ childProps.isAuthenticated ? ToolCostSummaryByPlant : Home } 
    props={childProps} />
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
*/