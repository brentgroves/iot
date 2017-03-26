import * as ACTION from "./Const.js"
import { push } from 'react-router-redux';
import * as API from '../../api/moto/Moto';

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



export function start(prime) {
 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    API.start(disp,getSt,prime);
  };
}


