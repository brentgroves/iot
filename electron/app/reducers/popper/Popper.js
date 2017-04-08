import * as ACTION from "../../actions/popper/Const.js"
import * as PROGRESSBUTTON from "../../const/popper/ProgressButtonConst.js"
import update from 'react-addons-update';

const initialState = { 
    goButton:PROGRESSBUTTON.READY,
    clickCount:0, 
    reason:'',
    status:''
  }

export default function reducer( state = initialState, action) {
  switch (action.type) {

    case ACTION.INIT:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT');
      }
      var newData = update(state, 
        { 
          goButton:{$set:PROGRESSBUTTON.READY},
          status:{$set: ''}
        });
      return newData;
    }
    
    case ACTION.SET_GO_BUTTON:
    {
      var newData = update(state, {goButton: {$set: action.goButton}});
    //  return {chk1:'failure',chk2:'failure',chk3:'unknown',chk4:'unknown',noCatList:[{}]};   
      return newData;
    }

    case ACTION.SET_STATUS:
    {
      var newData = update(state, {status: {$set: action.status}});
      return newData;
    }

    case ACTION.SET_CLICKCOUNT:
    {
      var newData = update(state, {status: {$set: action.clickCount}});
      return newData;
    }


    default:
      return state;
  }
}
