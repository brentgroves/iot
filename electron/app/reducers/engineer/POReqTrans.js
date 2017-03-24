import * as PORTACTION from "../../actions/production/port/PORTActionConst.js"
import * as PORTSTATE from "../../actions/production/port/PORTState.js"
import * as PORTCHK from "../../const/production/ChkConst.js"
import * as PROGRESSBUTTON from "../../const/production/ProgressButtonConst.js"
import update from 'react-addons-update';

const initialState = { 
    catRecs:[{}],
    catTypes:['cat1','cat2','cat3'],
    chk0:PORTCHK.UNKNOWN,
    chk1:PORTCHK.UNKNOWN,
    chk2:PORTCHK.UNKNOWN,
    chk3:PORTCHK.UNKNOWN,
    chk4:PORTCHK.UNKNOWN,
    currentPO:0,
    goButton:PROGRESSBUTTON.READY, 
    logId:0,
    m2mVendors:[{}],
    m2mVendorSelect:[{}],
    noCatList:[{}],
    noCribVen:[{}], 
    noM2mVen:[{}],  
    poCount:0,
    poItem:[{}],
    poMast:[{}],
    poMastRange:{poMin:0,poMax:0},
    state:PORTSTATE.NOT_PRIMED,
    status:'',
    reason:'',
    vendors:[{}],
    vendorSelect:[{}]
  }

export default function reducer( state = initialState, action) {
  switch (action.type) {
    case PORTACTION.INIT_PORT:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT_PORT');
      }
      var newData = update(state, 
        { 
          catRecs:{$set: [{}]},  
          catTypes:{$set: ['cat1','cat2','cat3']},
          chk0: {$set: 'unknown'},
          chk1: {$set: 'unknown'},
          chk2: {$set: 'unknown'},
          chk3: {$set: 'unknown'},
          chk4: {$set: 'unknown'},
          currentPO:{$set:0},
          goButton:{$set:PROGRESSBUTTON.READY},
          logId:{$set:0},
          m2mVendors:{$set:[{}]},
          m2mVendorSelect:{$set:[{}]},
          noCatList:{$set: [{}]},
          noCribVen:{$set: [{}]},  
          noM2mVen:{$set: [{}]},  
          poCount:{$set:0},
          poItem:{$set: [{}]},  
          poMast:{$set: [{}]},  
          poMastRange:{$set:{poMin:0,poMax:0}},
          state:{$set: PORTSTATE.NOT_PRIMED},
          status:{$set: ''},
          reason:{$set:''},
          vendors:{$set:[{}]},
          vendorSelect:{$set:[{}]}
        });
      return newData;
    }
    case PORTACTION.SET_CHECK0:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set check0`);
      }
      var newData = update(state, 
        { 
          chk0: {$set: action.chk0}
        });
      return newData;

    }
    case PORTACTION.SET_CHECK1:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set check1`);
      }
      var newData = update(state, 
        { 
          chk1: {$set: action.chk1}
        });
      return newData;

    }
    case PORTACTION.SET_CHECK2:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set check2`);
      }
      var newData = update(state, 
        { 
          chk2: {$set: action.chk2}
        });
      return newData;

    }
    case PORTACTION.SET_CHECK3:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set check3`);
      }
      var newData = update(state, 
        { 
          chk3: {$set: action.chk3}
        });
      return newData;

    }
    case PORTACTION.SET_CHECK4:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set check4`);
      }
      var newData = update(state, 
        { 
          chk4: {$set: action.chk4}
        });
      return newData;

    }
    case PORTACTION.SET_CURRENT_PO:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set currentPO`);
      }
      var newData = update(state, 
        { 
          currentPO: {$set: action.currentPO}
        });
      return newData;

    }
    case PORTACTION.SET_LOGID:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set logId`);
      }
      var newData = update(state, {logId: {$set: action.logId}});
      return newData;
    }
    case PORTACTION.SET_GO_BUTTON:
    {
      var newData = update(state, {goButton: {$set: action.goButton}});
    //  return {chk1:'failure',chk2:'failure',chk3:'unknown',chk4:'unknown',noCatList:[{}]};   
      return newData;
    }
    case PORTACTION.SET_M2M_VENDORS: 
    {
      var newData = update(state, {m2mVendors: {$set: action.m2mVendors}});
      return newData;
    }
    case PORTACTION.SET_M2M_VENDOR_SELECT:
    {
      var newData = update(state, {m2mVendorSelect: {$set: action.m2mVendorSelect}});
      return newData;
    }
    case PORTACTION.SET_NO_CAT_LIST:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('update noCatList');
      }
      var newData = update(state, 
        { 
          noCatList: {$set: action.noCatList}
        });
      return newData;
    }
    case PORTACTION.SET_NO_CRIB_VEN:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('updating noCribVen');
      }
      var newData = update(state, 
        { 
          noCribVen: {$set: action.noCribVen}
        });
      return newData;
    }
    case PORTACTION.SET_NO_M2M_VEN:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('updating noM2mVen');
      }
      var newData = update(state, 
        { 
          noM2mVen: {$set: action.noM2mVen}
        });
      return newData;
    }
    case PORTACTION.SET_PO_CATEGORIES:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('update PO Categories list');
      }
      var newData = update(state, 
        { catTypes: {$set: action.catTypes}
        });
    //  return {chk1:'failure',chk2:'failure',chk3:'unknown',chk4:'unknown',noCatList:[{}]};   
      return newData;
    }
    case PORTACTION.SET_PO_CAT_RECORDS:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('update PO Cat Records list');
      }
      var newData = update(state, 
        { catRecs: {$set: action.catRecs}
        });
      return newData;
    }
    case PORTACTION.SET_PO_COUNT:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set PO Count`);
      }
      var newData = update(state, 
        { 
          poCount: {$set: action.poCount}
        });
      return newData;

    }
    case PORTACTION.SET_POITEM:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set poItem`);
      }
      var newData = update(state, 
        { 
          poItem: {$set: action.poItem}
        });
      return newData;

    }
    case PORTACTION.SET_POMAST:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set poMast`);
      }
      var newData = update(state, 
        { 
          poMast: {$set: action.poMast}
        });
      return newData;

    }
    case PORTACTION.SET_POMAST_RANGE:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`set poMastRange`);
      }
      var newData = update(state, 
        { 
          poMastRange: {$set: action.poMastRange}
        });
      return newData;

    }
    case PORTACTION.SET_REASON:
    {
      if ('development'==process.env.NODE_ENV) {
        console.dir(action.reason);
      }
      var newData = update(state, {reason: {$set: action.reason}});
      return newData;
    }
    case PORTACTION.SET_STATE:
    {
      var newData = update(state, {state: {$set: action.state}});
      return newData;
    }
    case PORTACTION.SET_STATUS:
    {
      var newData = update(state, {status: {$set: action.status}});
      return newData;
    }
    case PORTACTION.SET_VENDORS:
    {
      var newData = update(state, {vendors: {$set: action.vendors}});
      return newData;
    }
    case PORTACTION.SET_VENDOR_SELECT:
    {
      var newData = update(state, {vendorSelect: {$set: action.vendorSelect}});
      return newData;
    }
    default:
      return state;
  }
}
