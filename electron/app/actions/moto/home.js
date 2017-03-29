import { push } from 'react-router-redux';
import * as API from '../../api/moto/Moto';



export function port() {
 return (dispatch,getState) => {
      dispatch(push('/POReqTrans'));
  };
}

export function gr() {
 return (dispatch,getState) => {
      dispatch(push('/GenReceivers'));
  };
}

export function prodReports() {
 return (dispatch,getState) => {
      dispatch(push('/ProdReports'));
  };
}


export function subscribe() {
 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    API.subscribe(disp,getSt);
  };
}

export function fan() {
 return (dispatch,getState) => {
      dispatch(push('/Fan'));
  };
}

export function photocell() {
 return (dispatch,getState) => {
      dispatch(push('/Photocell'));
  };
}
