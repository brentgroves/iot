import * as PORTACTION from "../../actions/production/port/PORTActionConst.js"
import * as PORTSTATE from "../../actions/production/port/PORTState.js"
import update from 'react-addons-update';

const initialState = { 
    primed:false
  }

export default function reducer( state = initialState, action) {
  switch (action.type) {
    case PORTACTION.INIT_COMMON:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT_COMMON');
      }
      var newData = update(state, 
        { 
          primed:{$set:false}
        });
      return newData;
    }
    case PORTACTION.SET_PRIMED:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set primed`);
      }
      var newData = update(state, 
        { 
          primed: {$set: action.primed}
        });
      return newData;

    }
    default:
      return state;
  }
}
