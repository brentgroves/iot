import * as ACTION from "./Const.js"
import * as State from "./State.js"
import { push } from 'react-router-redux';
import * as OPENPOEMAIL from '../../../api/rpt/production/OpenPOEmail/OpenPOEmail';
import * as PONORECEIVERS from '../../../api/rpt/production/PONoReceivers/PONoReceivers';
import * as POWITHRECEIVERS from '../../../api/rpt/production/POWithReceivers/POWithReceivers';
import * as MISC from "../../../const/production/Misc.js"
var _ = require('lodash');
var joins = require('lodash-joins');


/////////////////////////////////////////////////////////////////
// Common Start
/////////////////////////////////////////////////////////////////

export function cancelApp() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.CancelApp()->top.`);
  }

 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT });
      dispatch(push('/'));
  };
}

export function setState(state) {
  return {
    type: ACTION.SET_STATE,
    state: state
  };
}

export function setStatus(status) {
  return {
    type: ACTION.SET_STATUS,
    status: status
  };
}


export function init() {
  return {
    type: ACTION.INIT
  };
}

export function initNoState() {
  return {
    type: ACTION.INIT_NO_STATE
  };
}

export function prodReports() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.prodReports()->top.`);
  }

 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT });
      dispatch(push('/ProdReports'));
  };
}

export function setProgressBtn(goButton) {
  return {
    type: ACTION.SET_PROGRESS_BTN,
    progressBtn: progressBtn
  };
}
/////////////////////////////////////////////////////////////////
// Common End
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
// Open PO Email Start
/////////////////////////////////////////////////////////////////
export function initOpenPOEmail() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.initOpenPOEmail()->top.`);
  }

 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT_OPENPOEMAIL });
  };
}


export function openPOEmail() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.OpenPOEMail()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.openPOEmail(disp,getSt);
  };
}
export function openPOEmailMROToggle() {
  return {
    type: ACTION.OPENPOEMAIL_MRO_TOGGLE
  };
}

export function openPOEmailVendorToggle() {
  return {
    type: ACTION.OPENPOEMAIL_VENDOR_TOGGLE
  };
}

export function openPOEmailPager() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.openPOEmailPager()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.openPOEmailPager(disp,getSt);
  };
}


export function openPOEmailDateRange() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.openPOEmailDateRange()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.openPOEmailDateRange(disp,getSt);
  };
}

export function OpenPOEmailReport() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.OpenPOEmailReport()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.openPOEmailReport(disp,getSt);
  };
}

export function setOpenPOEmailPO(po) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setOpenPOEmailPO()->top. ${po}`);
  }
  return {
    type: ACTION.SET_OPENPOEMAIL_PO,
    po: po
  };
}

export function setOpenPOEmailSelect(select) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setOpenPOEmailSelect()->top. ${select}`);
  }
  return {
    type: ACTION.SET_OPENPOEMAIL_SELECT,
    select: select
  };
}

export function setOpenPOEmailDateStart(dateStart) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setOpenPOEmailDateStart()->top. ${dateStart}`);

  }

  return {
    type: ACTION.SET_OPENPOEMAIL_DATE_START,
    dateStart: dateStart
  };
}

export function setOpenPOEmailDateEnd(dateEnd) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setOpenPOEmailDateEnd()->top. ${dateEnd}`);

  }

  return {
    type: ACTION.SET_OPENPOEMAIL_DATE_END,
    dateEnd: dateEnd
  };
}
export function openPOVendorEmail() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.openPOVendorEmail()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.openPOVendorEmail(disp,getSt);
  };
}


export function setOpenPOEmailCurPage(curPage) {
  return {
    type: ACTION.SET_OPENPOEMAIL_CURPAGE,
    curPage: curPage
  };
}
export function setOpenPOEmailPrevPage() {
  return {
    type: ACTION.SET_OPENPOEMAIL_PREVPAGE
  };
}
export function setOpenPOEmailNextPage() {
  return {
    type: ACTION.SET_OPENPOEmail_NEXTPAGE
  };
}

export function toggleOpenPOSelected(poNumber) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.toggleOpenPOSelected()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.ToggleOpenPOSelected(disp,getSt,poNumber);
  };
}

export function toggleOpenPOVisible(poNumber) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.toggleOpenPOVisible()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    OPENPOEMAIL.ToggleOpenPOVisible(disp,getSt,poNumber);
  };
}
/////////////////////////////////////////////////////////////////
// Open PO Email End
/////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////
// PO With Receivers Start
/////////////////////////////////////////////////////////////////
export function initPOWithReceivers() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.initPOWithReceivers()->top.`);
  }

 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT_POWITHRECEIVERS });
  };
}


export function poWithReceivers() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.POWithReceivers()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    POWITHRECEIVERS.poWithReceivers(disp,getSt);
  };
}

export function poWithReceiversPrompt() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.poWithReceiversrompt()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    POWITHRECEIVERS.poWithReceiversPrompt(disp,getSt);
  };
}

export function poWithReceiversDateRange() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.poWithReceiversDateRange()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    POWITHRECEIVERS.poWithReceiversDateRange(disp,getSt);
  };
}


export function setPOWithReceiversDateStart(dateStart) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setPOWithReceiversDateStart()->top. ${dateStart}`);

  }

  return {
    type: ACTION.SET_POWITHRECEIVERS_DATE_START,
    dateStart: dateStart
  };
}

export function setPOWithReceiversDateEnd(dateEnd) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setPOWithReceiversDateEnd()->top. ${dateEnd}`);

  }

  return {
    type: ACTION.SET_POWITHRECEIVERS_DATE_END,
    dateEnd: dateEnd
  };
}
/////////////////////////////////////////////////////////////////
// PO With Receivers End
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
// PO No Receivers Start
/////////////////////////////////////////////////////////////////
export function initPONoReceivers() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.initPONoReceivers()->top.`);
  }

 return (dispatch,getState) => {
      dispatch({ type:ACTION.INIT_PONORECEIVERS });
  };
}
export function poNoReceiversPrompt() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.PONoReceiversPrompt()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    PONORECEIVERS.poNoReceiversPrompt(disp,getSt);
  };
}

export function poNoReceivers() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.poNoReceivers()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    PONORECEIVERS.poNoReceivers(disp,getSt);
  };
}

export function poNoReceiversDateRange() {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.poNoReceiversDateRange()->top.`);
  }

 return (dispatch,getState) => {
    var disp = dispatch;
    var getSt = getState;
    PONORECEIVERS.poNoReceiversDateRange(disp,getSt);
  };
}


export function setPONoReceiversDateStart(dateStart) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setPONoReceiversDateStart()->top. ${dateStart}`);

  }

  return {
    type: ACTION.SET_PONORECEIVERS_DATE_START,
    dateStart: dateStart
  };
}

export function setPONoReceiversDateEnd(dateEnd) {
  if ('development'==process.env.NODE_ENV) {
    console.log(`ACTIONS.setPONoReceiversDateEnd()->top. ${dateEnd}`);

  }

  return {
    type: ACTION.SET_PONORECEIVERS_DATE_END,
    dateEnd: dateEnd
  };
}
/////////////////////////////////////////////////////////////////
// PO No Receivers End
/////////////////////////////////////////////////////////////////





