import * as ACTION from "../../../actions/rpt/production/Const.js"
import * as STATE from "../../../actions/rpt/production/State.js"
import * as PROGRESSBUTTON from "../../../const/production/ProgressButtonConst.js"
import update from 'react-addons-update';

const initialState = { 
  poWithReceivers:{
    dateHeader:{text:'Date Range',valid:true},
    dateStart:null,
    dateEnd:null,
    done:false,
    failed:false
  },
  poNoReceivers:{
    dateHeader:{text:'Date Range',valid:true},
    dateStart:null,
    dateEnd:null,
    done:false,
    failed:false
  },
  openPOEmail:{
    curPage:1,
    dateStart:null,
    dateEnd:null,
    dateHeader:{text:'Date Range',valid:true},
    emailHeader:{text:'Email',valid:true},
    emailMRO:false,
    emailVendor:false,
    maxPage:3,
    poItem:[],
    po:[],
    select:[],
    selectDelim:[],
    pager:{done:false,failed:false},
    sqlOpenPO:{done:false,failed:false},
    sqlOpenPOVendorEmail:{done:false,failed:false}
  },
  progressBtn:PROGRESSBUTTON.READY,
  reason:'',
  status:'',
  state:STATE.NOT_STARTED
}

export default function reducer( state = initialState, action) {
  switch (action.type) {
    case ACTION.INIT:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('RPT_INIT');
      }
      var newData = update(state, 
        { 
          poWithReceivers:{$set:{
            dateHeader:{text:'Date Range',valid:true},
            dateStart:null,
            dateEnd:null,
            done:false,
            failed:false
          }},
          poNoReceivers:{$set:{
            dateHeader:{text:'Date Range',valid:true},
            dateStart:null,
            dateEnd:null,
            done:false,
            failed:false
          }},
          openPOEmail:{$set:{
            curPage:1,
            dateStart:null,
            dateEnd:null,
            dateHeader:{text:'Date Range',valid:true},
            emailHeader:{text:'Email',valid:true},
            emailMRO:false,
            emailVendor:false,
            maxPage:3,
            poItem:[],
            po:[],
            select:[],
            selectDelim:[],
            pager:{done:false,failed:false},
            sqlOpenPO:{done:false,failed:false},
            sqlOpenPOVendorEmail:{done:false,failed:false}
          }},
          progressBtn:{$set:PROGRESSBUTTON.READY},
          reason:{$set:''},
          status:{$set: ''},
          state:{$set:STATE.NOT_STARTED}
        });
      return newData;
    }


 
 
    /////////////////////////////////////////////////////////////////
    // PO With Receivers Start
    /////////////////////////////////////////////////////////////////
    case ACTION.INIT_POWITHRECEIVERS:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT_POWITHRECEIVERS');
      }
      var newData = update(state, 
        { 
          poWithReceivers:{$set:{
            dateHeader:{text:'Date Range',valid:true},
            dateStart:null,
            dateEnd:null,
            done:false,
            failed:false
          }},
          progressBtn:{$set:PROGRESSBUTTON.READY},
          reason:{$set:''},
          status:{$set: ''}
        });
      return newData;
    }
    case ACTION.SET_POWITHRECEIVERS_REPORT_FAILED:
    {
      var poWithReceivers = state.poWithReceivers;
      poWithReceivers.failed=action.failed;
      var newData = update(state, {poWithReceivers: {$set: poWithReceivers}});
      return newData;
    }

    case ACTION.SET_POWITHRECEIVERS_REPORT_DONE:
    {
      var poWithReceivers = state.poWithReceivers;
      poWithReceivers.done=action.done;
      var newData = update(state, {poWithReceivers: {$set: poWithReceivers}});
      return newData;
    }

    case ACTION.SET_POWITHRECEIVERS_DATE_HEADER:
    {
      var poWithReceivers = state.poWithReceivers;
      if ('development'==process.env.NODE_ENV) {
        console.log('SET_POWITHRECEIVERS_DATE_HEADER ${action.dateHeader.text},${action.dateHeader.valid}');
      }

      poWithReceivers.dateHeader=action.dateHeader;
      var newData = update(state, {poWithReceivers: {$set: poWithReceivers}});
      return newData;
    }

    case ACTION.SET_POWITHRECEIVERS_DATE_END:
    {
      var poWithReceivers = state.poWithReceivers;
      poWithReceivers.dateEnd=action.dateEnd;
      var newData = update(state, {poWithReceivers: {$set: poWithReceivers}});
      return newData;
    }

    case ACTION.SET_POWITHRECEIVERS_DATE_START:
    {
      var poWithReceivers = state.poWithReceivers;
      poWithReceivers.dateStart=action.dateStart;
      var newData = update(state, {poWithReceivers: {$set: poWithReceivers}});
      return newData;
    }
    /////////////////////////////////////////////////////////////////
    // PO With Receivers End
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    // PO No Receivers Start
    /////////////////////////////////////////////////////////////////
   case ACTION.INIT_PONORECEIVERS:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT_PONORECEIVERS');
      }
      var newData = update(state, 
        { 
          poNoReceivers:{$set:{
            dateHeader:{text:'Date Range',valid:true},
            dateStart:null,
            dateEnd:null,
            done:false,
            failed:false
          }},
          progressBtn:{$set:PROGRESSBUTTON.READY},
          reason:{$set:''},
          status:{$set: ''}
        });
      return newData;
    }

    case ACTION.SET_PONORECEIVERS_REPORT_FAILED:
    {
      var poNoReceivers = state.poNoReceivers;
      poNoReceivers.failed=action.failed;
      var newData = update(state, {poNoReceivers: {$set: poNoReceivers}});
      return newData;
    }

    case ACTION.SET_PONORECEIVERS_REPORT_DONE:
    {
      var poNoReceivers = state.poNoReceivers;
      poNoReceivers.done=action.done;
      var newData = update(state, {poNoReceivers: {$set: poNoReceivers}});
      return newData;
    }

    case ACTION.SET_PONORECEIVERS_DATE_HEADER:
    {
      var poNoReceivers = state.poNoReceivers;
      if ('development'==process.env.NODE_ENV) {
        console.log('SET_PONORECEIVERS_DATE_HEADER ${action.dateHeader.text},${action.dateHeader.valid}');
      }

      poNoReceivers.dateHeader=action.dateHeader;
      var newData = update(state, {poNoReceivers: {$set: poNoReceivers}});
      return newData;
    }

    case ACTION.SET_PONORECEIVERS_DATE_END:
    {
      var poNoReceivers = state.poNoReceivers;
      poNoReceivers.dateEnd=action.dateEnd;
      var newData = update(state, {poNoReceivers: {$set: poNoReceivers}});
      return newData;
    }

    case ACTION.SET_PONORECEIVERS_DATE_START:
    {
      var poNoReceivers = state.poNoReceivers;
      poNoReceivers.dateStart=action.dateStart;
      var newData = update(state, {poNoReceivers: {$set: poNoReceivers}});
      return newData;
    }
    /////////////////////////////////////////////////////////////////
    // PO No Receivers End
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    // Open PO Email Start
    /////////////////////////////////////////////////////////////////
    case ACTION.INIT_OPENPOEMAIL:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log('INIT_OPENPOEMAIL');
      }
      var newData = update(state, 
        { 
          openPOEmail:{$set:{
              curPage:1,
              dateStart:null,
              dateEnd:null,
              dateHeader:{text:'Date Range',valid:true},
              emailHeader:{text:'Email',valid:true},
              emailMRO:false,
              emailVendor:false,
              maxPage:3,
              poItem:[],
              po:[],
              select:[],
              selectDelim:[],
              pager:{done:false,failed:false},
              sqlOpenPO:{done:false,failed:false},
              sqlOpenPOVendorEmail:{done:false,failed:false}
          }},
          progressBtn:{$set:PROGRESSBUTTON.READY},
          reason:{$set:''},
          status:{$set: ''}
        });
      return newData;
    }
    case ACTION.OPENPOEMAIL_MRO_TOGGLE:
    {
      var openPOEmail = state.openPOEmail;
      if ('development'==process.env.NODE_ENV) {
        console.log('OPENPOEMAIL_MRO_TOGGLE ${openPOEmail.emailMRO');
      }

      openPOEmail.emailMRO=!openPOEmail.emailMRO;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_VENDOR_TOGGLE:
    {
      var openPOEmail = state.openPOEmail;
      if ('development'==process.env.NODE_ENV) {
        console.log('OPENPOEMAIL_VENDOR_TOGGLE ${openPOEmail.emailVendor');
      }
      openPOEmail.emailVendor=!openPOEmail.emailVendor;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_PAGER_FAILED:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.pager.failed=action.failed;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_PAGER_DONE:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.pager.done=action.done;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_CURPAGE:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.curPage=action.curPage;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_DATE_HEADER:
    {
      var openPOEmail = state.openPOEmail;
      if ('development'==process.env.NODE_ENV) {
        console.log('SET_OPENPOEMAIL_DATE_HEADER ${action.dateHeader.text},${action.dateHeader.valid}');
      }

      openPOEmail.dateHeader=action.dateHeader;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_DATE_END:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.dateEnd=action.dateEnd;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_DATE_START:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.dateStart=action.dateStart;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_EMAIL_HEADER:
    {
      var openPOEmail = state.openPOEmail;
      if ('development'==process.env.NODE_ENV) {
        console.log('SET_OPENPOEMAIL_HEADER ${action.emailHeader.text},${action.emailHeader.valid}');
      }

      openPOEmail.emailHeader=action.emailHeader;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_MAXPAGE:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.maxPage = action.maxPage;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_NEXTPAGE:
    {
      var openPOEmail = state.openPOEmail;
      var curPage = state.openPOEmail.curPage;
      var maxPage = state.openPOEmail.maxPage;
      if (maxPage>curPage){
        curPage=curPage+1;
      }else{
        curPage=curPage;
      }
      openPOEmail.curPage=curPage;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_PO:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.po = action.po;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_POITEM:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.poItem = action.poItem;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_PREVPAGE:
    {
      var openPOEmail = state.openPOEmail;
      var curPage = state.openPOEmail.curPage;
      if(1>=curPage){
        curPage=1;
      }else{
        curPage=curPage-1;
      }
      openPOEmail.curPage=curPage;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_SELECT:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.select = action.select;
      var select = action.select;
      const selectLen = select.length;
      var selectDelim='';
      select.map((po, i) => {
        var poDelim;
        if (selectLen === i + 1) {
          // last one
          poDelim=po
        } else {
          // not last one
          poDelim=po+','
        }
        selectDelim+= poDelim;
      });
      openPOEmail.selectDelim = selectDelim;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    case ACTION.SET_OPENPOEMAIL_SQLOPENPO_FAILED:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.sqlOpenPO.failed=action.failed;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_SQLOPENPO_DONE:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.sqlOpenPO.done=action.done;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_FAILED:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.sqlOpenPOVendorEmail.failed=action.failed;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }

    case ACTION.SET_OPENPOEMAIL_SQLOPENPOVENDOREMAIL_DONE:
    {
      var openPOEmail = state.openPOEmail;
      openPOEmail.sqlOpenPOVendorEmail.done=action.done;
      var newData = update(state, {openPOEmail: {$set: openPOEmail}});
      return newData;
    }
    /////////////////////////////////////////////////////////////////
    // Open PO Email End
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    // Common Start
    /////////////////////////////////////////////////////////////////
    case ACTION.SET_PROGRESS_BTN:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`progressBtn=>${action.progressBtn}`);
      }
      var newData = update(state, {progressBtn: {$set: action.progressBtn}});
    //  return {chk1:'failure',chk2:'failure',chk3:'unknown',chk4:'unknown',noCatList:[{}]};   
      return newData;
    }
    
    case ACTION.SET_REASON:
    {
      if ('development'==process.env.NODE_ENV) {
        console.dir(action.reason);
      }
      var newData = update(state, {reason: {$set: action.reason}});
      return newData;
    }
    case ACTION.SET_STATE:
    {
      if ('development'==process.env.NODE_ENV) {
        console.log(`state=>${action.state}`);
      }
      var newData = update(state, {state: {$set: action.state}});
      return newData;
    }
    case ACTION.SET_STATUS:
    {
      var newData = update(state, {status: {$set: action.status}});
      return newData;
    }
    /////////////////////////////////////////////////////////////////
    // Common Start
    /////////////////////////////////////////////////////////////////

    default:
      return state;

  }

}
