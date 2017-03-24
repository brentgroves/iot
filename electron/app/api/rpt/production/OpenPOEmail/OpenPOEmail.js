
var sql = require('mssql');
var dateFormat = require('dateformat');
import { remote,ipcRenderer } from 'electron';
import * as CONNECT from "../../../../const/production/SQLConst.js"
import * as ACTION from "../../../../actions/rpt/production/Const.js"
import * as STATE from "../../../../actions/rpt/production/State.js"
import * as MISC from "../../../../const/production/Misc.js"
import * as PROGRESSBUTTON from "../../../../const/production/ProgressButtonConst.js"
import * as SQLPRIMEDB from "../../../common/SQLPrimeDB.js"
import * as SQLOPENPO from "./SQLOpenPO.js"
import * as SQLOPENPOVENDOREMAIL from "./SQLOpenPOVendorEmail.js"

//import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
var Moment = require('moment');
var _ = require('lodash');
var joins = require('lodash-joins');
var sorty    = require('sorty')
var fs = require('fs');
//var client = require("jsreport-client")('http://10.1.1.217:5488', 'admin', 'password')
var client = require("jsreport-client")(MISC.jsreport, 'admin', 'password')







export async function openPOEmailDateRange(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var openPOEmail=getState().ProdReports.openPOEmail;
  if ('development'==process.env.NODE_ENV) {
    console.log(`openPOEmailDateRange().dateStart=>${openPOEmail.dateStart}`);
    console.log(`openPOEmailDateRange().dateEnd=>${openPOEmail.dateEnd}`);
  }
  if(
      (null==openPOEmail.dateStart) ||
      (null==openPOEmail.dateEnd) ||
      (openPOEmail.dateStart>openPOEmail.dateEnd )
    )
  {
    dispatch({ type:ACTION.SET_OPENPOEMAIL_DATE_HEADER, dateHeader:{text:'Date Range Error!',valid:false} });
  }else{
    dispatch({ type:ACTION.SET_OPENPOEMAIL_DATE_HEADER, dateHeader:{text:'Date Range',valid:true} });

  }
  if(!openPOEmail.emailMRO && !openPOEmail.emailVendor){
    dispatch({ type:ACTION.SET_OPENPOEMAIL_EMAIL_HEADER, emailHeader:{text:'One Email recipient!',valid:false}});
  }else{
    dispatch({ type:ACTION.SET_OPENPOEMAIL_EMAIL_HEADER, emailHeader:{text:'Email',valid:true}});
  }
  if(
    ((0==openPOEmail.select.length) && (null==openPOEmail.dateStart) || (null==openPOEmail.dateEnd)) ||
    (openPOEmail.dateStart>openPOEmail.dateEnd || (!openPOEmail.emailMRO && !openPOEmail.emailVendor))
    ){
    dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY });
  }else{
    dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_DATE_RANGE_READY });
  }
}


export async function openPOEmail(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;
  var state=getState();
  var openPOEmail=getState().ProdReports.openPOEmail;

  dispatch({ type:ACTION.SET_PROGRESS_BTN,progressBtn:PROGRESSBUTTON.LOADING });
  dispatch({ type:ACTION.SET_STATE, state:STATE.STARTED });

  dispatch((dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    SQLPRIMEDB.sql1(disp,getSt);
  });
  
  maxCnt=10;
  cnt=0;
  while(!getState().Common.primed){
    if(++cnt>maxCnt ){
      break;
    }else{
      await MISC.sleep(2000);
    }
  }
  if(!getState().Common.primed){
    if ('development'==process.env.NODE_ENV) {
      console.log(`primeDB FAILED.`);
    }
    continueProcess=false;
    dispatch({ type:ACTION.SET_REASON, reason:`primeDB FAILED. ` });
    dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
    dispatch({ type:ACTION.SET_STATUS, status:'Can not connect to Cribmaster...' });
  }else{
    if ('development'==process.env.NODE_ENV) {
      console.log(`prime Success.`);
    }
  }

  if(continueProcess){
    dispatch((dispatch,getState) => {
      var disp = dispatch;
      var getSt = getState;
      SQLOPENPO.sql1(disp,getSt);
    });
    cnt=0;
    maxCnt=10;
    while(!getState().ProdReports.openPOEmail.sqlOpenPO.done){
      if(++cnt>maxCnt ){
        break;
      }else{
        await MISC.sleep(2000);
      }
    }

    if(getState().ProdReports.openPOEmail.sqlOpenPO.failed || 
      !getState().ProdReports.openPOEmail.sqlOpenPO.done){
      if ('development'==process.env.NODE_ENV) {
        console.log(`OPENPOEMAIL.SQLOPENPO.sql1() FAILED.`);
      }
      dispatch({ type:ACTION.SET_REASON, reason:`bpOpenPO FAILED. ` });
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_STATUS, status:'Can not run bpOpenPO sproc on Cribmaster...' });
      continueProcess=false;
    }else if(0<getState().ProdReports.openPOEmail.po.length){
      if ('development'==process.env.NODE_ENV) {
        console.log(`OPENPOEMAIL.SQLOPENPO.sql1() Success.`);
      }
    }else{
      dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_NO_RECORDS });
      continueProcess=false;
    }
  }

  if(continueProcess){
    dispatch({type:ACTION.SET_OPENPOEMAIL_DATE_START,dateStart:Moment().startOf('day').toDate()});
    dispatch({type:ACTION.SET_OPENPOEMAIL_DATE_END,dateEnd:Moment().startOf('day').toDate()});
    dispatch({type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY});
  }
}



export async function openPOVendorEmail(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;
  var state=getState();
  var openPOEmail=getState().ProdReports.openPOEmail;

  dispatch({ type:ACTION.SET_PROGRESS_BTN,progressBtn:PROGRESSBUTTON.LOADING });
  dispatch({ type:ACTION.SET_STATE, state:STATE.STARTED });

  dispatch((dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    SQLPRIMEDB.sql1(disp,getSt);
  });
  
  maxCnt=10;
  cnt=0;
  while(!getState().Common.primed){
    if(++cnt>maxCnt ){
      break;
    }else{
      await MISC.sleep(2000);
    }
  }
  if(!getState().Common.primed){
    if ('development'==process.env.NODE_ENV) {
      console.log(`primeDB FAILED.`);
    }
    continueProcess=false;
    dispatch({ type:ACTION.SET_REASON, reason:`primeDB FAILED. ` });
    dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
    dispatch({ type:ACTION.SET_STATUS, status:'Can not connect to Cribmaster...' });
  }else{
    if ('development'==process.env.NODE_ENV) {
      console.log(`prime Success.`);
    }
  }
  if(continueProcess){
    dispatch((dispatch,getState) => {
      var disp = dispatch;
      var getSt = getState;
      SQLOPENPOVENDOREMAIL.sql1(disp,getSt);
    });
    cnt=0;
    maxCnt=10;
    while(!getState().ProdReports.openPOEmail.sqlOpenPOVendorEmail.done){
      if(++cnt>maxCnt ){
        break;
      }else{
        await MISC.sleep(2000);
      }
    }

    if(getState().ProdReports.openPOEmail.sqlOpenPOVendorEmail.failed || 
      !getState().ProdReports.openPOEmail.sqlOpenPOVendorEmail.done){
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLOPENPOVENDOREMAIL.sql1() FAILED.`);
      }
      dispatch({ type:ACTION.SET_REASON, reason:`bpOpenPOVendorEmail FAILED. ` });
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_STATUS, status:'Can not run bpOpenPOVendorEmail sproc on Cribmaster...' });
      continueProcess=false;
    }else if(0<getState().ProdReports.openPOEmail.poItem.length){
      if ('development'==process.env.NODE_ENV) {
        console.log(`SQLOPENPOVENDOREMAIL.sql1() Success.`);
      }
    }else{
      dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_DATE_RANGE_NO_RECORDS });
      continueProcess=false;
    }
  }

  if(continueProcess){
    dispatch((dispatch,getState) => {
      var disp = dispatch;
      var getSt = getState;
      openPOPager(disp,getSt);
    });

    cnt=0;
    maxCnt=10;

    while(!getState().ProdReports.openPOEmail.pager.done){
      if(++cnt>maxCnt ){
        break;
      }else{
        await MISC.sleep(2000);
      }
    }
    if(getState().ProdReports.openPOEmail.pager.failed ||
      !getState().ProdReports.openPOEmail.pager.done){
      if ('development'==process.env.NODE_ENV) {
        console.log(`openPOPager() FAILED.`);
      }
      dispatch({ type:ACTION.SET_REASON, reason:`POPager() FAILED. ` });
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_STATUS, status:'Can not update OpenPOEmail poItem page...' });
      continueProcess=false;
    }
  }

  if(continueProcess){
    if(0<getState().ProdReports.openPOEmail.select.length){
      dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_REVIEW_READY });
    }else{
      dispatch({ type:ACTION.SET_STATE, state:STATE.OPENPOEMAIL_REVIEW_NOT_READY });
    }
  }


}


export async function ToggleOpenPOVisible(disp,getSt,po) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;
  var poNumber = po;

  if ('development'==process.env.NODE_ENV) {
    console.log(`ToggleOpenPOVisible.top()=>`);
    console.log(`poNumber=>${poNumber}`);
    console.log(`poItem=>`);
    console.dir(getState().ProdReports.openPOEmail.poItem);
  }

  var poItemNew = _.map(getState().ProdReports.openPOEmail.poItem).map(function(x){
    var newVisible;
    if(poNumber==x.poNumber){
      newVisible=!x.visible;
    }else{
      newVisible=x.visible;
    }
    var poItemAdd = _.assign(x, {'visible':newVisible});
    return poItemAdd; 
  });

  dispatch({ type:ACTION.SET_OPENPOEMAIL_POITEM, poItem:poItemNew });


  if(continueProcess){
    dispatch((dispatch,getState) => {
      var disp = dispatch;
      var getSt = getState;
      openPOPager(disp,getSt);
    });

    cnt=0;
    maxCnt=10;

    while(!getState().ProdReports.openPOEmail.pager.done){
      if(++cnt>maxCnt ){
        break;
      }else{
        await MISC.sleep(2000);
      }
    }
    if(getState().ProdReports.openPOEmail.pager.failed ||
      !getState().ProdReports.openPOEmail.pager.done){
      if ('development'==process.env.NODE_ENV) {
        console.log(`openPOPager() FAILED.`);
      }
      dispatch({ type:ACTION.SET_REASON, reason:`ToggleOpenPOVisible() FAILED. ` });
      dispatch({ type:ACTION.SET_STATE, state:STATE.FAILURE });
      dispatch({ type:ACTION.SET_STATUS, status:'Can not update OpenPO poItem page...' });
      continueProcess=false;
    }
  }
}


export async function ToggleOpenPOSelected(disp,getSt,po) {
  var dispatch = disp;
  var getState = getSt;
  var continueProcess=true;
  var cnt=0;
  var maxCnt=10;


//  var openPO = getState().Reports.openPO;
//  var poItem = getState().Reports.openPO.poItem;
  var poNumber = po;

  if ('development'==process.env.NODE_ENV) {
    console.log(`ToggleOpenPOSelected.top()=>`);
    console.log(`poNumber=>${poNumber}`);
    console.log(`poItem=>`);
    console.dir(getState().ProdReports.openPOEmail.poItem);
  }

  var anySelected=false;
  var poItemNew = _.map(getState().ProdReports.openPOEmail.poItem).map(function(x){
    var newSelected;
    if(poNumber==x.poNumber){
      if(0==x.selected){
        newSelected=1;
      }else{
        newSelected=0;
      }
    }else{
      newSelected=x.selected;
    }
    if(1==newSelected){
      anySelected=true;
    }
    var poItemAdd = _.assign(x, {'selected':newSelected});
    return poItemAdd; 
  });

  dispatch({ type:ACTION.SET_OPENPOEMAIL_POITEM, poItem:poItemNew });


  if(anySelected){
    dispatch({ type:ACTION.SET_STATE, state:STATE.PO_PROMPT_READY});
  }else{
    dispatch({ type:ACTION.SET_STATE, state:STATE.PO_PROMPT_NOT_READY});
  }
}


export function openPOPager(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  var curPO = 'start';
  var rowCount = 0;
  var pageIndex = 0;
  var page=1;
  const ROWS_PER_PAGE=8;
  var poChange=false;
  if ('development'==process.env.NODE_ENV) {
    console.log(`openPOPager() poItem=>`);
    console.dir(getState().ProdReports.openPOEmail.poItem);
  }

  dispatch({ type:ACTION.SET_OPENPOEMAIL_PAGER_FAILED, failed:false });
  dispatch({ type:ACTION.SET_OPENPOEMAIL_PAGER_DONE, done:false });


  var poItemNew=getState().ProdReports.openPOEmail.poItem.map(function(poItem){
    if(false==poItem.visible){
      if(curPO!=poItem.poNumber){
        rowCount+=1;
        pageIndex+=1;
        if('start' != curPO){
          poChange=true;
        }
        curPO=poItem.poNumber;
      }
    }else{
      if(curPO!=poItem.poNumber){
        rowCount+=2;
        pageIndex+=2;
        if('start' != curPO){
          poChange=true;
        }
        curPO=poItem.poNumber;
      }else{
        rowCount+=1;
        pageIndex+=1;
      }
    }
    if ('development'==process.env.NODE_ENV) {
      console.log(`openPOPager() poItem.poNumber / poItem.itemDescription=>${poItem.poNumber} / ${poItem.itemDescription}`);
      console.log(`openPOPager() rowCount=>${rowCount}`);
      console.log(`openPOPager() Before page change=>${page}`);
      console.log(`openPOPager() Before pageIndex change=>${pageIndex}`);
    }

    if(poChange && poItem.visible && ((ROWS_PER_PAGE+1)==pageIndex)){
      // 2 rows added
      pageIndex=2;
      page+=1;
    }else if(poChange && !poItem.visible && ((ROWS_PER_PAGE+1)==pageIndex)){
      // 1 rows added
      pageIndex=1;
      page+=1;
    }else if(poChange && poItem.visible && ((ROWS_PER_PAGE+2)==pageIndex)){
      // 2 rows added
      pageIndex=2;
      page+=1;
    }else if(poChange && !poItem.visible && ((ROWS_PER_PAGE+2)==pageIndex)){
      // cant happen
    }else if(!poChange && poItem.visible && (ROWS_PER_PAGE<pageIndex)){
      // 1 row added
      pageIndex=1;
      page+=1;
    }else if(!poChange && !poItem.visible && (ROWS_PER_PAGE<pageIndex)){
      // no rows added
    }
    if ('development'==process.env.NODE_ENV) {
      console.log(`openPOPager() After pageIndex change =>${pageIndex}`);
      console.log(`openPOPager() After page change=>${page}`);
    }
    poItem.page=page;
    poChange=false;
    return poItem;
  });
  if ('development'==process.env.NODE_ENV) {
    console.log(`openPOPager() poItemNew`);
    console.dir(poItemNew);
  }
  var maxPage=page;    
  dispatch({ type:ACTION.SET_OPENPOEMAIL_MAXPAGE, maxPage:page });
  dispatch({ type:ACTION.SET_OPENPOEMAIL_POITEM, poItem:poItemNew });
  if(getState().ProdReports.openPOEmail.curPage>maxPage){
    dispatch({ type:ACTION.SET_OPENPOEMAIL_CURPAGE, curPage:maxPage });
  }

  dispatch({ type:ACTION.SET_OPENPOEMAIL_PAGER_DONE, done:true });

}

export async function OpenPOEmailReport(disp,getSt) {
  var dispatch = disp;
  var getState = getSt;
  dispatch({ type:ACTION.SET_PROGRESS_BTN,progressBtn:PROGRESSBUTTON.LOADING });
  dispatch({ type:ACTION.SET_STATE, state:STATE.STARTED });
  var curPO='start';
  var emailMRO=getState().ProdReports.openPOEmail.emailMRO;
  var emailVendor=getState().ProdReports.openPOEmail.emailVendor;
  getState().ProdReports.openPOEmail.poItem.map(function(x){
    if(x.selected && curPO!=x.poNumber){
      var emailTo=null;
      if(emailMRO){
//         emailTo='Administrator@busche-cnc.com'; 
         emailTo='nswank@buschegroup.com'; 
      }
      if(emailVendor && ('None'!=x.eMailAddress.trim())){
        if(null==emailTo){
          emailTo=x.eMailAddress.trim();
        }else{
          emailTo+=',' + x.eMailAddress.trim();
        }
      }
//Administrator@busche-cnc.com
      if ('development'==process.env.NODE_ENV) {
        console.log(`OpenPOEmailReport.poNumber=${x.poNumber}`);
        console.log(`OpenPOEmailReport.poNumber=${x.eMailAddress}`);
        console.log(`emailTo=${emailTo}`);
      }

      if(null!=emailTo){
        client.render({
          template: { shortid:"rk6jlpXLl"},
          data: {po: x.poNumber,emailTo:emailTo,subject:"Busche Order"}

        }, function(err, response) {
            if ('development'==process.env.NODE_ENV) {
            }
            response.body(function(body) {
              if ('development'==process.env.NODE_ENV) {
              }
            });
        });
      }
      curPO=x.poNumber;
    }
   
  });
  await MISC.sleep(6000);
  dispatch({ type:ACTION.SET_STATE, state:STATE.SUCCESS});
}
