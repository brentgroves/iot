
var sql = require('mssql');


import * as GRACTION from "../../../actions/production/gr/GRConst.js"
import * as GRSTATE from "../../../actions/production/gr/GRState.js"
import * as CONNECT from "../../../const/production/SQLConst.js"
import * as MISC from "../../../const/production/Misc.js"


var sql1Cnt=0;
const ATTEMPTS=1;



export async function sql1(disp,getSt){
//  var that = this;
  var dispatch = disp;
  var getState = getSt;
  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLTransInsert->top.`);
  }


  var cnt=0;
  init(dispatch);
  execSQL1(dispatch,getState);

}

function init(dispatch){
  sql1Cnt=0;
  dispatch({ type:GRACTION.TRANS_INSERT_FAILED, failed:false });
  dispatch({ type:GRACTION.TRANS_INSERT_DONE, done:false });
}


function execSQL1(disp,getSt){
  var dispatch = disp;
  var getState = getSt;
  var state = getState(); 

  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLTransInsert.execSQL1() top=>${sql1Cnt}`);
  }


  var connection = new sql.Connection(CONNECT.cribDefTO, function(err) {
    // ... error checks
    if(null==err){
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLTransInsert.execSQL1() Connection Sucess`);
      }
      var allInsSucceded=true;
      var sessionId=state.GenReceivers.logId;
      state.GenReceivers.rcmast.forEach(function(rcmast,i,arr){
        let fpckLen = rcmast.fpacklist.trim().length;
        var Remove = rcmast.Remove.trim();
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLTransInsert.execSQL1().fpacklist.length=>${fpckLen}`);
          console.log(`SQLTransInsert.execSQL1().Remove=>${Remove}`);
        }
        if( (('Y'==Remove) ||(fpckLen>0)) && allInsSucceded ){
          let sproc;

          if (MISC.PROD===true) {
            sproc = `bpGRTransInsert`;
          }else{
            sproc = `bpGRTransInsertDev`;
          }


          var request = new sql.Request(connection); 
          request.input('sessionId', sql.Int, sessionId);
          request.input('freceiver', sql.Char(6), rcmast.freceiver);
          request.input('remove', sql.Char(1), Remove);
          request.execute(sproc, function(err, recordsets, returnValue) {
            // ... error checks
            if(null==err){
              // ... error checks
              if ('development'==process.env.NODE_ENV) {
                console.log(`SQLTransInsert.execSQL1() Sucess`);
              }
            }else {
              if(++sql1Cnt<ATTEMPTS) {
                if ('development'==process.env.NODE_ENV) {
                  console.log(`SQLTransInsert.execSQL1().query:  ${err.message}` );
                  console.log(`sql1Cnt = ${sql1Cnt}`);
                }
              }else{
                if ('development'==process.env.NODE_ENV) {
                  console.log(`SQLTransInsert.execSQL1():  ${err.message}` );
                }
                dispatch({ type:GRACTION.SET_REASON, reason:err.message });
                dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
                dispatch({ type:GRACTION.TRANS_INSERT_FAILED, failed:true });
                allInsSucceded=false;
              }
            }
          });
        }
      });
      dispatch({ type:GRACTION.TRANS_INSERT_DONE, done:true });

    }else{
      if(++sql1Cnt<ATTEMPTS) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLTransInsert.Connection: ${err.message}` );
          console.log(`sql1Cnt = ${sql1Cnt}`);
        }
      }else{
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLTransInsert.Connection: ${err.message}` );
        }

        dispatch({ type:GRACTION.SET_REASON, reason:err.message });
        dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
        dispatch({ type:GRACTION.TRANS_INSERT_FAILED, failed:true });
      }
    }
  });
  
  connection.on('error', function(err) {
    if(++sql1Cnt<ATTEMPTS) {
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLTransInsert.connection.on(error): ${err.message}` );
        console.log(`sql1Cnt = ${sql1Cnt}`);
      }

    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLTransInsert.connection.on(error): ${err.message}` );
      }

      dispatch({ type:GRACTION.SET_REASON, reason:err.message });
      dispatch({ type:GRACTION.SET_STATE, state:GRSTATE.FAILURE });
      dispatch({ type:GRACTION.TRANS_INSERT_FAILED, failed:true });
    }
  });
}


