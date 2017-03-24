
var sql = require('mssql');
var dateFormat = require('dateformat');
import { remote,ipcRenderer } from 'electron';

import * as ACTION from "../../../../actions/rpt/production/Const.js"
import * as STATE from "../../../../actions/rpt/production/State.js"

import * as CONNECT from "../../../../const/production/SQLConst.js"
import * as MISC from "../../../../const/production/Misc.js"
import * as PROGRESSBUTTON from "../../../../const/production/ProgressButtonConst.js"
import * as SQLPRIMEDB from "../../../common/SQLPrimeDB.js"

//import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
var Moment = require('moment');
var _ = require('lodash');
var joins = require('lodash-joins');
var sorty    = require('sorty')
var fs = require('fs');
var client = require("jsreport-client")(MISC.jsreport, 'admin', 'password')


export async function poNoReceiversPrompt(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;

  if(continueProcess){
    dispatch({type:ACTION.SET_PONORECEIVERS_DATE_START,dateStart:Moment().startOf('day').toDate()});
    dispatch({type:ACTION.SET_PONORECEIVERS_DATE_END,dateEnd:Moment().endOf('day').toDate()});
    dispatch({type:ACTION.SET_STATE, state:STATE.PONORECEIVERS_DATE_RANGE_READY});
  }
}
export async function poNoReceiversDateRange(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var poNoReceivers=getState().ProdReports.poNoReceivers;
  if ('development'==process.env.NODE_ENV) {
    console.log(`PONoReceiversDateRange().dateStart=>${poNoReceivers.dateStart}`);
    console.log(`PONoReceiversDateRange().dateEnd=>${poNoReceivers.dateEnd}`);
  }
  var valid;
  if(
      (null==poNoReceivers.dateStart) ||
      (null==poNoReceivers.dateEnd) ||
      (poNoReceivers.dateStart>=poNoReceivers.dateEnd )
    )
  {
    valid=false;
    dispatch({ type:ACTION.SET_PONORECEIVERS_DATE_HEADER, dateHeader:{text:'Date Range Error!',valid:false} });
  }else{
    valid=true;
    dispatch({ type:ACTION.SET_PONORECEIVERS_DATE_HEADER, dateHeader:{text:'Date Range',valid:true} });

  }
  if(valid   ){
    dispatch({ type:ACTION.SET_STATE, state:STATE.PONORECEIVERS_DATE_RANGE_READY});
  }else{
    dispatch({ type:ACTION.SET_STATE, state:STATE.PONORECEIVERS_DATE_RANGE_NOT_READY });
  }

}


export async function poNoReceivers(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;



  var dirName=remote.app.getPath('temp');

  if ('development'==process.env.NODE_ENV) {
    console.log(`remote = } `);
    console.dir(remote);
    console.log(` dirName: ${ dirName}`);
  }

  if(continueProcess){
    var poNoReceivers=getState().ProdReports.poNoReceivers;
    if ('development'==process.env.NODE_ENV) {
      console.log(`poNoReceivers().dateStart=>${poNoReceivers.dateStart}`);
      console.log(`poNoReceivers().dateEnd=>${poNoReceivers.dateEnd}`);
    }

    var dateStart = poNoReceivers.dateStart; // DOES NOT WORK MUST NOT USE dateStart ?????? maybe 
    // because i typed noReceivers,dateStart instead of noReceivers.dateStart!!!
    var dtStart =Moment(new Date(poNoReceivers.dateStart)).format("MM-DD-YYYY HH:mm:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtStart=>${dtStart}`);
    }



    var dateEnd = poNoReceivers.dateEnd;
    var dtEnd =Moment(new Date(poNoReceivers.dateEnd)).format("MM-DD-YYYY HH:mm:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtEnd=>${dtEnd}`);
    }

    var dtStartFmt = dateFormat(new Date(poNoReceivers.dateStart), "mm-dd-yyyy HH:MM:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtStartFmt=>${dtStartFmt}`);
    }
    var dtEndFmt = dateFormat(new Date(poNoReceivers.dateEnd), "mm-dd-yyyy HH:MM:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtEndFmt=>${dtEndFmt}`);
    }


    dispatch({ type:ACTION.SET_PROGRESS_BTN,progressBtn:PROGRESSBUTTON.LOADING });
    dispatch({ type:ACTION.SET_STATE, state:STATE.STARTED });
    client.render({
        template: { shortid:"S1S4DAv8e"},
        data: { dtStart: dtStart,dtEnd:dtEnd}
    }, function(err, response) {
        var dirName1 = dirName;

        if ('development'==process.env.NODE_ENV) {
          console.log(`dirName: ${dirName}`);
          console.log(`dirName1: ${dirName1}`);
          console.log(`err =  `);
          console.dir(err);
        }
        if(err){
          dispatch({ type:ACTION.SET_REASON, reason:err.message});
          dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
          dispatch({ type:ACTION.SET_STATUS, status:'Can not connect to Report Server...' });
          dispatch({ type:ACTION.SET_POWITHRECEIVERS_REPORT_FAILED, failed:true });
          dispatch({ type:ACTION.SET_POWITHRECEIVERS_REPORT_DONE, done:true });
        }else{
          response.body(function(body) {
            var dirName2 = dirName1;
            let fileName =  dirName2 + '/myfile.pdf';
            if ('development'==process.env.NODE_ENV) {
              console.log(`dirName: ${dirName}`);
              console.log(`dirName1: ${dirName1}`);
              console.log(`dirName2: ${dirName2}`);
              console.log(`fileName: ${fileName}`);
            }

            fs.writeFileSync(fileName,body);
            dispatch({ type:ACTION.SET_PONORECEIVERS_REPORT_DONE, done:true });
            if ('development'==process.env.NODE_ENV) {
              console.log(`Done creating file myfile.pdf `);
              console.log(`fileName: ${fileName}`);
            }
            ipcRenderer.send('asynchronous-message', fileName)
          });
        }
    });
    var cnt=0;
    var maxCnt=15;
    while(!getState().ProdReports.poNoReceivers.done){
      if(++cnt>maxCnt){
        continueProcess=false;
        break;
      }else{
        await MISC.sleep(2000);
      }
    }

    if(getState().ProdReports.poNoReceivers.failed || 
      !getState().ProdReports.poNoReceivers.done){
      if ('development'==process.env.NODE_ENV) {
        console.log(`poNoReceivers() Report not successful.`);
      }
      dispatch({ type:ACTION.SET_REASON, reason:`Network or server problem preventing access to the Report Server. `});
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_STATUS, status:'Can not connect to Report Server...' });
      continueProcess=false;
    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`poNoReceiversReport Success.`);
      }
      dispatch({ type:ACTION.SET_STATE, state:STATE.SUCCESS});
    }
  }
}


