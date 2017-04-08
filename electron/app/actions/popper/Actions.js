import * as ACTION from "./Const.js"
import { push } from 'react-router-redux';
import * as API from '../../api/popper/api';


export function gameStart() {
 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    API.gameStart(disp,getSt);
  };
}

export function fan() {
 return (dispatch,getState) => {
      dispatch(push('/Fan'));
  };
}

export function cancelApp() {
 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT });
      dispatch(push('/'));
  };
}

export function init() {
  return {
    type: ACTION.INIT
  };
}




export function setGoButton(goButton) {
  return {
    type: ACTION.SET_GO_BUTTON,
    goButton: goButton
  };
}


export function setStatus(status) {
  return {
    type: ACTION.SET_STATUS,
    status: status
  };
}



export function fanStart() {
 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    API.fanStart(disp,getSt);
  };
}

export function subscribe() {
 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    API.subscribe(disp,getSt);
  };
}

