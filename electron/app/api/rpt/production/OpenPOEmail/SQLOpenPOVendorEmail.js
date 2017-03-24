var sql = require('mssql');
import * as ACTION from "../../../../actions/rpt/production/Const.js"
import * as STATE from "../../../../actions/rpt/production/State.js"
import * as CONNECT from "../../../../const/production/SQLConst.js"
import * as MISC from "../../../../const/production/Misc.js"


var sql1Cnt=0;
const ATTEMPTS=1;


// tested 11-29
export async function sql1(disp,getSt){
//  var that = this;
  var dispatch = disp;
  var getState = getSt;
  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLOpenPOVendorEmail()->top.`);
  }


  var cnt=0;
  init(dispatch);
  execSQL1(dispatch,getState);

}

function init(dispatch){
  sql1Cnt=0;
  dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_FAILED, failed:false });
  dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_DONE, done:false });
}


function execSQL1(disp,getSt){
  var dispatch = disp;
  var getState = getSt;

  if ('development'==process.env.NODE_ENV) {
    console.log(`SQLOpenPOVendorEmail.execSQL1() top=>${sql1Cnt}`);
  }

  var dateStart=getState().ProdReports.openPOEmail.dateStart;
  var dateEnd=getState().ProdReports.openPOEmail.dateEnd;
  var select = getState().ProdReports.openPOEmail.select;
  var selectDelim = getState().ProdReports.openPOEmail.selectDelim;

  var connection = new sql.Connection(CONNECT.cribDefTO, function(err) {
    // ... error checks
    if(null==err){
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLOpenPOVendorEmail.execSQL1() Connection Sucess`);
        console.log(`dateStart=>${dateStart}`);
        console.log(`selectDelim=>${selectDelim}`);
      }

      let sproc;

      if (MISC.PROD===true) {
        sproc = `bpGROpenPOVendorEmail`;
      }else{
        // not using a separate dev log
        sproc = `bpGROpenPOVendorEmail`;
      }

      var request = new sql.Request(connection); 
      request.input('select',sql.VarChar,selectDelim);
      request.input('dateStart', sql.DateTime, dateStart);
      request.input('dateEnd', sql.DateTime, dateEnd);
      request.execute(sproc, function(err, recordsets, returnValue, affected) {
        // ... error checks
        if(null==err){
          // ... error checks
          if ('development'==process.env.NODE_ENV) {
            console.log(`SQLOpenPOVendorEmail.execSQL1() Sucess`);
            console.log(`SQLOpenPOVendorEmail.execSQL1() recordsets[0] ${recordsets[0]}`);
            console.log(`SQLOpenPOVendorEmail.execSQL1() recordsets[1] ${recordsets[1]}`);
            console.log(`SQLOpenPOVendorEmail.execSQL1() recordsets[2] ${recordsets[2]}`);
          }
          dispatch({ type:ACTION.SET_OPENPOEMAIL_POITEM, poItem:recordsets[0] });
        }else {
          if(++sql1Cnt<ATTEMPTS) {
            if ('development'==process.env.NODE_ENV) {
              console.log(`SQLOpenPOVendorEmail.execSQL1().query:  ${err.message}` );
              console.log(`sql1Cnt = ${sql1Cnt}`);
            }
          }else{
            if ('development'==process.env.NODE_ENV) {
              console.log(`SQLOpenPOVendorEmail.execSQL1():  ${err.message}` );
            }
            dispatch({ type:ACTION.SET_REASON, reason:err.message });
            dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
            dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_FAILED, failed:true });
          }
        }
      });
      dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_DONE, done:true });
    }else{
      if(++sql1Cnt<ATTEMPTS) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLOpenPOVendorEmail.Connection: ${err.message}` );
          console.log(`sql1Cnt = ${sql1Cnt}`);
        }
      }else{
        if ('development'==process.env.NODE_ENV) {
          console.log(`SQLOpenPOVendorEmail.Connection: ${err.message}` );
        }

        dispatch({ type:ACTION.SET_REASON, reason:err.message });
        dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
        dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_FAILED, failed:true });
      }
    }
  });
  
  connection.on('error', function(err) {
    if(++sql1Cnt<ATTEMPTS) {
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLOpenPOVendorEmail.connection.on(error): ${err.message}` );
        console.log(`sql1Cnt = ${sql1Cnt}`);
      }

    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLOpenPOVendorEmail.connection.on(error): ${err.message}` );
      }

      dispatch({ type:ACTION.SET_REASON, reason:err.message });
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_FAILED, failed:true });
    }
  });
}


