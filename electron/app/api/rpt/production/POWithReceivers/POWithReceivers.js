
var sql = require('mssql');
var dateFormat = require('dateformat');
import { remote,ipcRenderer } from 'electron';

import * as CONNECT from "../../../../const/production/SQLConst.js"
import * as ACTION from "../../../../actions/rpt/production/Const.js"
import * as STATE from "../../../../actions/rpt/production/State.js"
import * as MISC from "../../../../const/production/Misc.js"
import * as PROGRESSBUTTON from "../../../../const/production/ProgressButtonConst.js"
import * as SQLPRIMEDB from "../../../common/SQLPrimeDB.js"

//import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
var Moment = require('moment');
var _ = require('lodash');
var joins = require('lodash-joins');
var sorty    = require('sorty')
var fs = require('fs');

//var client = require("jsreport-client")('http://10.1.1.217:5488', 'admin', 'password')
var client = require("jsreport-client")(MISC.jsreport, 'admin', 'password')



export async function poWithReceiversPrompt(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;

  if(continueProcess){
    dispatch({type:ACTION.SET_POWITHRECEIVERS_DATE_START,dateStart:Moment().startOf('day').toDate()});
    dispatch({type:ACTION.SET_POWITHRECEIVERS_DATE_END,dateEnd:Moment().endOf('day').toDate()});
    dispatch({type:ACTION.SET_STATE, state:STATE.POWITHRECEIVERS_DATE_RANGE_READY});
  }
}
export async function poWithReceiversDateRange(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var poWithReceivers=getState().ProdReports.poWithReceivers;
  if ('development'==process.env.NODE_ENV) {
    console.log(`poWithReceiversDateRange().dateStart=>${poWithReceivers.dateStart}`);
    console.log(`poWithReceiversDateRange().dateEnd=>${poWithReceivers.dateEnd}`);
  }
  var valid;
  if(
      (null==poWithReceivers.dateStart) ||
      (null==poWithReceivers.dateEnd) ||
      (poWithReceivers.dateStart>=poWithReceivers.dateEnd )
    )
  {
    valid=false;
    dispatch({ type:ACTION.SET_POWITHRECEIVERS_DATE_HEADER, dateHeader:{text:'Date Range Error!',valid:false} });
  }else{
    valid=true;
    dispatch({ type:ACTION.SET_POWITHRECEIVERS_DATE_HEADER, dateHeader:{text:'Date Range',valid:true} });

  }
  if(valid   ){
    dispatch({ type:ACTION.SET_STATE, state:STATE.POWITHRECEIVERS_DATE_RANGE_READY});
  }else{
    dispatch({ type:ACTION.SET_STATE, state:STATE.POWITHRECEIVERS_DATE_RANGE_NOT_READY });
  }

}



export async function poWithReceivers(disp,getSt) {
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
    var poWithReceivers=getState().ProdReports.poWithReceivers;
    if ('development'==process.env.NODE_ENV) {
      console.log(`poWithReceivers().dateStart=>${poWithReceivers.dateStart}`);
      console.log(`poWithReceivers().dateEnd=>${poWithReceivers.dateEnd}`);
    }

    var dateStart = poWithReceivers.dateStart;
    var dtStart =Moment(new Date(poWithReceivers.dateStart)).format("MM-DD-YYYY HH:mm:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtStart=>${dtStart}`);
    }



    var dateEnd = poWithReceivers,dateEnd;
    var dtEnd =Moment(new Date(poWithReceivers.dateEnd)).format("MM-DD-YYYY HH:mm:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtEnd=>${dtEnd}`);
    }

    var dtStartFmt = dateFormat(new Date(poWithReceivers.dateStart), "mm-dd-yyyy HH:MM:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtStartFmt=>${dtStartFmt}`);
    }
    var dtEndFmt = dateFormat(new Date(poWithReceivers.dateEnd), "mm-dd-yyyy HH:MM:ss");
    if ('development'==process.env.NODE_ENV) {
      console.log(`dtEndFmt=>${dtEndFmt}`);
    }


    dispatch({ type:ACTION.SET_PROGRESS_BTN,progressBtn:PROGRESSBUTTON.LOADING });
    dispatch({ type:ACTION.SET_STATE, state:STATE.STARTED });
    client.render({
        template: { shortid:"r1omgHrLe"},
        //data: { dtStart: "01-17-2017 00:00:00",dtEnd:"01-18-2017 23:15:10"}
        data: { dtStart: dtStart,dtEnd:dtEnd}
        /*
          "dtStart": "01-17-2017 00:00:00",
          "dtEnd": "01-18-2017 23:15:10"
        */
        // data: { subject: "Busche Order",po: "122572",emailTo:"bgroves3196@yahoo.com"}
    }, function(err, response) {
        var dirName1 = dirName;

        if ('development'==process.env.NODE_ENV) {
          console.log(`dirName: ${dirName}`);
          console.log(`dirName1: ${dirName1}`);
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
            dispatch({ type:ACTION.SET_POWITHRECEIVERS_REPORT_DONE, done:true });
            if ('development'==process.env.NODE_ENV) {
              console.log(`Done creating file myfile.pdf `);
              console.log(`fileName: ${fileName}`);
            }
            ipcRenderer.send('asynchronous-message', fileName)
          });
        }
    });
    // 
    while(!getState().ProdReports.poWithReceivers.done){
       await MISC.sleep(2000);
    }

    if(getState().ProdReports.poWithReceivers.failed){
      if ('development'==process.env.NODE_ENV) {
        console.log(`poWithReceivers Report not successful.`);
      }
      continueProcess=false;
    }else{
      if ('development'==process.env.NODE_ENV) {
        console.log(`poWithReceivers Report Success.`);
      }
      dispatch({ type:ACTION.SET_STATE, state:STATE.SUCCESS});
    }
  }
}
