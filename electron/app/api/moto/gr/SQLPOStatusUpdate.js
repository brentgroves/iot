var sql = require('mssql');

import * as GRACTION from "../../../actions/production/gr/GRConst.js"
import * as GRSTATE from "../../../actions/production/gr/GRState.js"
import * as CONNECT from "../../../const/production/SQLConst.js"
import * as MISC from "../../../const/production/Misc.js"

var sql1Cnt=0;
const ATTEMPTS=1;



export async function sql1(disp,getSt,rollbck){
//  var that = this;
  var dispatch = disp;
  var getState = getSt;
  var rollback = rollbck;
  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLPOStatusUpdate()->top.`);
  }


  var cnt=0;
  init(dispatch);
  execSQL1(dispatch,getState,rollback);

}

function init(dispatch){
  sql1Cnt=0;
  dispatch({ type:GRACTION.PO_STATUS_UPDATE_FAILED, failed:false });
  dispatch({ type:GRACTION.PO_STATUS_UPDATE_DONE, done:false });
}


function execSQL1(disp,getSt,rollbck){
  var dispatch = disp;
  var getState = getSt;
  var rollback = rollbck;

  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLPOStatusUpdate.execSQL1() top=>${sql1Cnt}`);
  }

  var connection = new sql.Connection(CONNECT.m2mDefTO, function(err) {
    // ... error checks
    if(null==err){
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLPOStatusUpdate.execSQL1() Connection Sucess`);
      }

      let sproc;

      if (MISC.PROD===true) {
        sproc = `bpGRPOStatusUpdate`;
      }else{
        sproc = `bpGRPOStatusUpdateDev`;
      }

      var request = new sql.Request(connection); 
      /* start function test */
//      request.input('rcvStart', sql.Char(6), '284155');
//      request.input('rcvEnd', sql.Char(6), '285839');
      /* end function test */
      var rcvStart;
      var rcvEnd;
      if(rollback){
        rcvStart = getState().GenReceivers.logEntryLast.rcvStart;
        rcvEnd = getState().GenReceivers.logEntryLast.rcvEnd;
      }else{
        let rcmastRange = getState().GenReceivers.rcmastRange;
        rcvStart=rcmastRange.start;
        rcvEnd=rcmastRange.end;
      }

      if ('development'==process.env.NODE_ENV) {
        console.log(`rcvStart ${rcvStart}`);
        console.log(`rcvEnd ${rcvEnd}`);
        console.log(`rollback=${true}`);
      }

      request.input('rcvStart', sql.Char(6), rcvStart);
      request.input('rcvEnd', sql.Char(6), rcvEnd);
      request.execute(sproc, function(err, recordsets, returnValue) {
        // ... error checks
        if(null==err){
          // ... error checks
          if ('development'==process.env.NODE_ENV) {
            console.log(`SQLPOStatusUpdate.execSQL1() Sucess`);
          }
        }else {
          if(++sql1Cnt<ATTEMPTS) {
            if ('development'==process.env.NODE_ENV) {
              console.log(`SQLPOStatusUpdate.execSQL1().query:  ${err.message}` );
              console.log(`sql1Cnt = ${sql1Cnt}`);
            }
          }else{
            if ('development'==process.env.NODE_ENV) {
              console.log(`SQLPOStatusUpdate.execSQL1():  ${err.message}` );
            }
            dispatch({ type:GRACTION.SET_REASON, reason:err.message });
            dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
            dispatch({ type:GRACTION.PO_STATUS_UPDATE_FAILED, failed:true });
          }
        }
      });
      dispatch({ type:GRACTION.PO_STATUS_UPDATE_DONE, done:true });
    }else{
      if(++sql1Cnt<ATTEMPTS) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLPOStatusUpdate.Connection: ${err.message}` );
          console.log(`sql1Cnt = ${sql1Cnt}`);
        }
      }else{
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLPOStatusUpdate.Connection: ${err.message}` );
        }

        dispatch({ type:GRACTION.SET_REASON, reason:err.message });
        dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
        dispatch({ type:GRACTION.PO_STATUS_UPDATE_FAILED, failed:true });
      }
    }
  });
  
  connection.on('error', function(err) {
    if(++sql1Cnt<ATTEMPTS) {
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLPOStatusUpdate.connection.on(error): ${err.message}` );
        console.log(`sql1Cnt = ${sql1Cnt}`);
      }

    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLPOStatusUpdate.connection.on(error): ${err.message}` );
      }

      dispatch({ type:GRACTION.SET_REASON, reason:err.message });
      dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
      dispatch({ type:GRACTION.PO_STATUS_UPDATE_FAILED, failed:true });
    }
  });
}


