
var sql = require('mssql');

import * as PORTACTION from "../../../actions/production/port/PORTActionConst.js"
import * as PORTSTATE from "../../../actions/production/port/PORTState.js"
import * as PORTCHK from "../../../const/production/ChkConst.js"
import * as CONNECT from "../../../const/production/SQLConst.js"
import * as MISC from "../../../const/production/Misc.js"


var portCheck1Done=false;
var portCheck1Cnt=0;
var portCheck1Failed=false;
var contChecks=false;

export async function portCheck1(disp){
  var dispatch=disp;
  var cnt=0;
  portCheck1Init();
  portChk1(dispatch);

  while(!isPortCheck1Done() && !portCheck1Failed){
    if(++cnt>15){
      dispatch({ type:PORTACTION.SET_REASON, reason:`portCheck1(disp) Cannot Connection` });
      dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
      break;
    }else{
      await MISC.sleep(2000);
    }
  }

  if(isPortCheck1Done()){
    if ('development'==process.env.NODE_ENV) {
      console.log(`portCheck1() Done`)
    }

  }

}

function portCheck1Init(){
  portCheck1Done=false;
  portCheck1Cnt=0;
  portCheck1Failed=false;
  contChecks=false;
}

export function isPortCheck1Done(){
  if(
    (true==portCheck1Done)
    )
  {
    return true;
  } else{
    return false;
  }
}

export function didCheckFail(){
  if(
    (true==portCheck1Failed)
    )
  {
    return true;
  } else{
    return false;
  }
}

export function continueChecks(){
  if(true==contChecks)
  {
    return true;
  } else{
    return false;
  }
}

/********************CHECK IF ALL PO CATEGORIES HAVE BEEN SELECTED FOR EACH PO ITEM & THE RECORDS ARE NOT LOCKED****************/

function portChk1(disp){
  var dispatch=disp;
  if ('development'==process.env.NODE_ENV) {
    console.log(`portChk1(disp) top=>${portCheck1Cnt}`);
  }


  var cribConnection = new sql.Connection(CONNECT.cribDefTO, function(err) {
    // ... error checks
    if(null==err){
      if ('development'==process.env.NODE_ENV) {
        console.log(`portChk1(disp) Connection Sucess`);
      }

      // Query
      let qry;
      if (MISC.PROD===true) {
        qry = `
          SELECT ROW_NUMBER() OVER(ORDER BY PONumber, Item) id,PONumber,RTrim(Item) Item,RTrim(ItemDescription) ItemDescription,RTrim(UDF_POCATEGORY) UDF_POCATEGORY
          FROM PODETAIL
          WHERE PONUMBER in
          (
            SELECT ponumber FROM [PO]  WHERE [PO].POSTATUSNO = 3 and [PO].SITEID <> '90'
          )
          and UDF_POCATEGORY is null
        `;
      }else{
        qry = `
          SELECT ROW_NUMBER() OVER(ORDER BY PONumber, Item) id,PONumber,RTrim(Item) Item,RTrim(ItemDescription) ItemDescription,RTrim(UDF_POCATEGORY) UDF_POCATEGORY
          FROM btPODETAIL
          WHERE PONUMBER in
          (
            SELECT ponumber FROM [btPO]  WHERE [btPO].POSTATUSNO = 3 and [btPO].SITEID <> '90'
          )
          and UDF_POCATEGORY is null
        `;
      }


      var request = new sql.Request(cribConnection); // or: var request = connection1.request();
      request.query(
      qry, function(err, recordset) {
          if(null==err){
            // ... error checks
            if ('development'==process.env.NODE_ENV) {
              console.log(`portChk1(disp) Query Sucess`);
              console.dir(recordset);
            }
            portCheck1Done=true;
            if(recordset.length!==0){
              let cribRsErr ="";
              recordset.forEach(function(podetail,i,arr){
                if ('development'==process.env.NODE_ENV) {
                  console.log(podetail.Item);
                }

                if(arr.length===i+1){
                  cribRsErr+=`PO# ${podetail.PONumber}, Item: ${podetail.Item}`;
                }else{
                  cribRsErr+= `PO# ${podetail.PONumber}, Item: ${podetail.Item}\n`;
                }
              });
              if ('development'==process.env.NODE_ENV) {
                console.log("Failed PO category check.");
              }

              dispatch({ type:PORTACTION.SET_NO_CAT_LIST, noCatList:recordset });
              dispatch({ type:PORTACTION.SET_CHECK1, chk1:PORTCHK.FAILURE });
              dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.STEP_10_FAIL });
              dispatch({ type:PORTACTION.SET_STATUS, status:'Found PO(s) with missing Category...' });

            }else {
              contChecks=true;
              dispatch({ type:PORTACTION.SET_CHECK1, chk1:PORTCHK.SUCCESS });
              dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.STEP_10_PASS });
            }
          }else{
            if(++portCheck1Cnt<3) {
              if ('development'==process.env.NODE_ENV) {
                console.log(`portChk1.query:  ${err.message}` );
                console.log(`portCheck1Cnt = ${portCheck1Cnt}`);
              }
            }else{
              dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
              dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
              portCheck1Failed=true;
            }
          }
        }
      );
    }else{
      if(++portCheck1Cnt<3) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`portChk1.Connection:  ${err.message}` );
          console.log(`portCheck1Cnt = ${portCheck1Cnt}`);
        }
      }else{
        dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
        dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
        portCheck1Failed=true;
      }
    }
  });
  
  cribConnection.on('error', function(err) {
    if(++portCheck1Cnt<3) {
      if ('development'==process.env.NODE_ENV) {
        console.log(`portChk1.on('error', function(err):  ${err.message}` );
        console.log(`portCheck1Cnt = ${portCheck1Cnt}`);
      }
    }else{
      dispatch({ type:PORTACTION.SET_REASON, reason:err.message });
      dispatch({ type:PORTACTION.SET_STATE, state:PORTSTATE.FAILURE });
      portCheck1Failed=true;
    }
  });
}


