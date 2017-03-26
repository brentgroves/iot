
var sql = require('mssql');
import * as PORTACTION from "../../../actions/production/port/PORTActionConst.js"
import * as PORTSTATE from "../../../actions/production/port/PORTState.js"
import * as CONNECT from "../../../const/production/SQLConst.js"
import * as MISC from "../../../const/production/Misc.js"


var sql1Done=false;
var sql1Cnt=0;
var sql1Failed=false;
var contPORT=false;
const ATTEMPTS=1;



export async function sql1(disp,getSt){
//  var that = this;
  var dispatch = disp;
  var getState = getSt;
  var state = getState(); 
  if ('development'==process.env.NODE_ENV) {
    console.log(`PORTSQL.sql1=> top`);
  }


  var cnt=0;
  init();
  execSQL1(dispatch,state);

  while(!isDone() && !didFail()){
    if(++cnt>15){
      dispatch({ type:PORTACTION.SET_REASON, reason:`PORTSQL.sql1() Timed Out or Failed.` });
      dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
      break;
    }else{
      await MISC.sleep(2000);
    }
  }

  if(isDone()){
    if ('development'==process.env.NODE_ENV) {
      console.log(`PORTSQL.sql1(): Completed`)
    }

  }else{
    if ('development'==process.env.NODE_ENV) {
      console.log(`PORTSQL.sql1(): Did NOT Complete`)
    }
  }

  if(didFail()){
    if ('development'==process.env.NODE_ENV) {
      console.log(`PORTSQL.sql1(): Failed`)
    }

  }else{
    if ('development'==process.env.NODE_ENV) {
      console.log(`PORTSQL.sql1(): Suceeded`)
    }
  }

}

function init(){
  sql1Done=false;
  sql1Cnt=0;
  sql1Failed=false;
  contPORT=false;
}

export function isDone(){
  if(
    (true==sql1Done)
    )
  {
    return true;
  } else{
    return false;
  }
}

export function didFail(){
  if(
    (true==sql1Failed)
    )
  {
    return true;
  } else{
    return false;
  }
}
export function continuePORT(){
  if(true==contPORT)
  {
    return true;
  } else{
    return false;
  }
}



function execSQL1(disp,PORTstate){
  var dispatch = disp;
  var state=PORTstate; 
  if ('development'==process.env.NODE_ENV) {
    console.log(`PORTSQL.execSQL1() top=>${sql1Cnt}`);
  }


  var connection = new sql.Connection(CONNECT.cribDefTO, function(err) {
    // ... error checks
    if(null==err){
      if ('development'==process.env.NODE_ENV) {
        console.log(`PORTSQL.execSQL1() Connection Sucess`);
        console.log(`currentPO=>${state.POReqTrans.currentPO}`);
      }

      let currentPO=state.POReqTrans.currentPO;
      let proc;
      if (MISC.PROD===true) {
        proc = `bpPORT`;
      }else{
        proc = `bpDevPORT`;
      }

      var request = new sql.Request(connection); 
      request.input('currentPO', sql.Char(6), currentPO);
      request.execute(proc, function(err, recordsets, returnValue) {
        // ... error checks
        if(null==err){
          if ('development'==process.env.NODE_ENV) {
            console.log(`PORTSQL.execSQL1().execute().Sucess`);
          }
          dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.STEP_40_PASS });
          contPORT=true;
          sql1Done=true;
        }else {
          if(++sql1Cnt<ATTEMPTS) {
            if ('development'==process.env.NODE_ENV) {
              console.log(`PORTSQL.execSQL1().query:  ${err.message}` );
              console.log(`sql1Cnt = ${sql1Cnt}`);
            }
          }else{
            if ('development'==process.env.NODE_ENV) {
              console.log(`PORTSQL.execSQL1().query():  ${err.message}` );
            }
            dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
            dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
            sql1Failed=true;
          }
        }
      });
    }else{
      if(++sql1Cnt<ATTEMPTS) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`PORTSQL.execSQL1().Connection: ${err.message}` );
          console.log(`sql1Cnt = ${sql1Cnt}`);
        }
      }else{
        if ('development'==process.env.NODE_ENV) {
          console.log(`PORTSQL.execSQL1().Connection: ${err.message}` );
        }
        dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
        dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
        sql1Failed=true;
      }
    }
  });
  
  connection.on('error', function(err) {
    if(++sql1Cnt<ATTEMPTS) {
      if ('development'==process.env.NODE_ENV) {
        console.log(`PORTSQL.connection.on(error): ${err.message}` );
        console.log(`sql1Cnt = ${sql1Cnt}`);
      }

    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`PORTSQL.connection.on(error): ${err.message}` );
      }
      dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
      dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
      sql1Failed=true;
    }
  });
}


