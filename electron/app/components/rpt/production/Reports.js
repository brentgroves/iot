import styles from '../../../css/rpt/production/styles.css';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,IndexLink } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import * as STATE from "../../../actions/rpt/production/State.js"
import { Grid, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron,Button} from 'react-bootstrap';
import {Header as NavbarHeader, Brand as NavbarBrand, Toggle as NavbarToggle, Collapse as NavbarCollapse, Text as NavbarText } from 'react-bootstrap/lib/Navbar'

import ProgressBtn from '../../../containers/rpt/common/ProgressBtn';
import PONoReceiversDateRange from "../../../containers/rpt/production/PONoReceivers/PONoReceiversDateRange";
import POWithReceiversDateRange from "../../../containers/rpt/production/POWithReceivers/POWithReceiversDateRange";
import OpenPOEmailReview from "../../../containers/rpt/production/OpenPOEmail/OpenPOEmailReview";
import OpenPOEmailDateRange from "../../../containers/rpt/production/OpenPOEmail/OpenPOEmailDateRange";
var Moment = require('moment');


export default class Reports extends Component {

  static propTypes = {
    ProdRpt: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.props.init();
    this.state = {
     // loading: false
    };
  }

  render() {
    var jumboTronTxt,rptMenu,progressBtn,backBtn,cancelBtn,navbar,
    openPOEmailReview,
    openPOEmailDateRange,
    poWithReceiversDateRange,
    poNoReceiversDateRange;

    /////////////////////////////////////////////////////////////////
    // PO With Receivers Start
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // OPEN PO EMAIL Start
    /////////////////////////////////////////////////////////////////

    if(STATE.OPENPOEMAIL_REVIEW_NOT_READY==this.props.ProdRpt.state) {
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >Please select which PO(s) you wish to have email notifications prepared for.
                After selecting at least one PO the 'run' button will be enabled so you may 
                continue. </p>
                <p><strong>Warning: </strong><span style={{color:'red'}}>'None'</span> indicates 
                there is no Email Address in Cribmaster for this vendor. </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }

    if(STATE.OPENPOEMAIL_REVIEW_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >You may now press the 'run' button to begin. After 'run' is
                pressed this program will create an email notification for each applicable vendor
                and send them to the designated MRO personel for review and forwarding. 
                </p>
                <p><strong>Warning: </strong><span style={{color:'red'}}>'None'</span> indicates 
                there is no Email Address in Cribmaster for this vendor. </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(
        (STATE.OPENPOEMAIL_REVIEW_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_REVIEW_READY==this.props.ProdRpt.state)
      )
    {
      openPOEmailReview = 
      <div>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={1} >&nbsp;</Col>
          <Col xs={10}><OpenPOEmailReview/></Col>
          <Col xs={1}>&nbsp;</Col>
        </Row>
      </div>;
    }

    if(STATE.OPENPOEMAIL_NO_RECORDS==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >There are no Open PO(s) within the specified date range. </p>
                <p>To continue press the back button to select a different report.</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(STATE.OPENPOEMAIL_NO_RECORDS==this.props.ProdRpt.state){
      backBtn = 
      <div>
        <Row>
          <Col xs={5} >&nbsp;</Col>
          <Col xs={2}><Button  onClick={()=> {
                                this.props.reports();
                              }} bsSize="large" bsStyle="warning">Back</Button>
          </Col>
          <Col xs={5}>&nbsp;</Col>
        </Row>
      </div>;
    }

    if(STATE.OPENPOEMAIL_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >There are no PO(s) within the specified date range. </p>
                <p>To continue press the back button to select a different date range...</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    } 
    if(STATE.OPENPOEMAIL_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      backBtn = 
        <div>
          <Row>
            <Col xs={5} >&nbsp;</Col>
            <Col xs={2}><Button  onClick={()=> {
                                  this.props.setState(STATE.OPENPOEMAIL_DATE_RANGE_READY);
                                }} bsSize="large" bsStyle="warning">Back</Button></Col>
            <Col xs={5}>&nbsp;</Col>
          </Row>
        </div>;
    }
    if(STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >Please select the Date Range for the PO(s) and who will receive an Email. </p>
                <p>After specifying these items the 'Continue' 
                button will be enabled. </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(
        (STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_DATE_RANGE_READY==this.props.ProdRpt.state)
      )
    {
      openPOEmailDateRange = 
      <div>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={1} >&nbsp;</Col>
          <Col xs={10}><OpenPOEmailDateRange/></Col>
          <Col xs={1}>&nbsp;</Col>
        </Row>
      </div>;
    }

    if(STATE.OPENPOEMAIL_DATE_RANGE_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >You may now press the 'Continue' button which will take you to a screen that will ask you to select individual PO(s). 
                </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }

    /////////////////////////////////////////////////////////////////
    // OPEN PO EMAIL END
    /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    // PO With Receivers Start
    /////////////////////////////////////////////////////////////////
    if(STATE.POWITHRECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO Date Range</h1>
              <div style={{textAlign: 'left'}}>
                <p >This report lists PO(s) with receivers within the specified date range.</p>
                <p>After specifying the dates the 'Run' 
                button will be enabled. </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(STATE.POWITHRECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>PO Date Range Selected</h1>
              <div style={{textAlign: 'left'}}>
                <p >You may now press the 'run' button to begin. After 'run' is
                pressed this program will create a report of all PO's with receivers 
                within the specified date range.
                </p>
                <p><strong>Note: </strong>The report should appear in a separate window within a few minutes.</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(STATE.POWITHRECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >There are no PO(s) within the specified date range. </p>
                <p>To continue press the back button to select a different date range...</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(
        (STATE.POWITHRECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.POWITHRECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state)
      )
    {
      poWithReceiversDateRange = 
      <div>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={1} >&nbsp;</Col>
          <Col xs={10}><POWithReceiversDateRange/></Col>
          <Col xs={1}>&nbsp;</Col>
        </Row>
      </div>;
    }
    if(STATE.POWITHRECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      backBtn = 
        <div>
          <Row>
            <Col xs={5} >&nbsp;</Col>
            <Col xs={2}><Button  onClick={()=> {
                                  this.props.setState(STATE.POWITHRECEIVERS_DATE_RANGE_READY);
                                }} bsSize="large" bsStyle="warning">Back</Button></Col>
            <Col xs={5}>&nbsp;</Col>
          </Row>
        </div>;
    }

    /////////////////////////////////////////////////////////////////
    // PO With Receivers End
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    // PO No Receivers Start
    /////////////////////////////////////////////////////////////////
    if(STATE.PONORECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO Date Range</h1>
              <div style={{textAlign: 'left'}}>
                <p >This report lists PO(s) without receivers within the specified date range.</p>
                <p>After specifying the dates the 'Run' 
                button will be enabled. </p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(STATE.PONORECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>PO Date Range Selected</h1>
              <div style={{textAlign: 'left'}}>
                <p >You may now press the 'run' button to begin. After 'run' is
                pressed this program will create a report of all PO's that have NO receivers
                within the specified date range.
                </p>
                <p><strong>Note: </strong>The report should appear in a separate window within a few minutes.</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(
        (STATE.PONORECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.PONORECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state)
      )
    {
      poNoReceiversDateRange = 
        <div>
          <Row>
            <Col xs={1}>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs={1} >&nbsp;</Col>
            <Col xs={10}><PONoReceiversDateRange/></Col>
            <Col xs={1}>&nbsp;</Col>
          </Row>
        </div>;
    }

    if(STATE.PONORECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select PO(s)</h1>
              <div style={{textAlign: 'left'}}>
                <p >There are no PO(s) within the specified date range. </p>
                <p>To continue press the back button to select a different date range...</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }

    if(STATE.PONORECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state){
      backBtn = 
        <div>
          <Row>
            <Col xs={5} >&nbsp;</Col>
            <Col xs={2}><Button  onClick={()=> {
                                  this.props.setState(STATE.PONORECEIVERS_DATE_RANGE_READY);
                                }} bsSize="large" bsStyle="warning">Back</Button></Col>
            <Col xs={5}>&nbsp;</Col>
          </Row>
        </div>;
    }
    /////////////////////////////////////////////////////////////////
    // PO No Receivers End
    /////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////
    // Common Start
    /////////////////////////////////////////////////////////////////
    if(STATE.NOT_STARTED==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
               <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Select Report</h1>
              <p style={{padding: '0px'}}>This app generates reports some of which are displayed by this App
              others are emailed as a PDF attachment to a user specified recipient.</p>
              <p><strong>Note:</strong> Some vendor(s) email address may not be available from Cribmaster if this is the case 
              please update Cribmaster with the appropriate email address and re-run the report.
              </p>
              <br/>
            </Jumbotron>
            </Col >
          </Row>;
    }
    if(STATE.STARTED==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Creating Report</h1>
              <div style={{textAlign: 'left'}}>
                <p >The report you hava selected is being prepared now!  When it is finished another window
                will appear if it is a PDF report.  If it is an email report no window will appear but this window
                will display SUCCESS!. 
                </p>
                <p>Time varies based upon network conditions and server workload.</p>
                <p style={{textAlign: 'center',paddingBottom:5}}><strong>Please wait...</strong></p> 
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    } 
    if(STATE.STARTED==this.props.ProdRpt.state){
      progressBtn = 
      <div>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={5} >&nbsp;</Col>
          <Col xs={2}><ProgressBtn/></Col>
          <Col xs={5}>&nbsp;</Col>
        </Row>

      </div>;
    }

    if(STATE.FAILURE==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Error!</h1>
              <div style={{textAlign: 'left'}}>
              <p><strong>Description:{" "}</strong>{this.props.ProdRpt.reason}</p>
              <p><strong>Press the Cancel button and try again.</strong></p> 
              <p><strong>If the problem persists give IT the error description above.</strong></p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    } 
    if(STATE.SUCCESS==this.props.ProdRpt.state){
      jumboTronTxt=
        <Row >
          <Col xs={1}>&nbsp;</Col>
          <Col >
            <Jumbotron style={{marginLeft:15,marginRight:15}} >
              <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>SUCCESS!</h1>
              <br/>
              <div style={{textAlign: 'left'}}>
                <p >Your report has been prepared successfully! You may now select another report to run, 
                use the menu bar to navigate back to the main menu, or click the 'x' in the upper right 
                corner to exit this App.</p>
              </div>
              <br/>
            </Jumbotron>
          </Col>
        </Row>;
    }
    if(
        (STATE.NOT_STARTED==this.props.ProdRpt.state) ||
        (STATE.SUCCESS==this.props.ProdRpt.state)
      )
    {
      const rpt1Style = {
        fontWeight:'bold'
      };

      var rptMenu;
      rptMenu =
        <div>
          <Row>
            <Col xs={1}>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs={1}>&nbsp;</Col>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <table className={styles.tg}>
              <tbody>
                <tr>
                  <td className={styles.btnPrimary} onClick={()=>{
                    this.props.initPONoReceivers();
                    this.props.poNoReceiversPrompt();
                  }} ><span style={rpt1Style}>PO(s) with No Receivers</span><br/>PDF format</td>
                  <td className={styles.btnWarning} onClick={()=>{
                    this.props.initPOWithReceivers();
                    this.props.poWithReceiversPrompt();}} ><span style={rpt1Style}>PO(s) with Receivers</span><br/>PDF format</td>
                </tr>
                </tbody>
              </table>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </div>;
    }

/*
                  <td className={styles.btnSuccess} 
                  onClick={()=>{
                    this.props.initOpenPOEmail();
                    this.props.openPOEmail();}}>
                  <span style={rpt1Style}>Open PO</span><br/>MRO/Vendor Email</td>
*/

    if(STATE.FAILURE==this.props.ProdRpt.state){
      cancelBtn = 
      <div>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={1}>&nbsp;</Col>
        </Row>
        <Row>
          <Col xs={5} >&nbsp;</Col>
          <Col xs={2}><Button  onClick={this.props.cancelApp} bsSize="large" bsStyle="warning">Cancel</Button></Col>
          <Col xs={5}>&nbsp;</Col>
        </Row>
      </div>;
    }
    if(
        (STATE.SUCCESS==this.props.ProdRpt.state)  || 
        (STATE.NOT_STARTED==this.props.ProdRpt.state) ||
        (STATE.POWITHRECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state) ||
        (STATE.POWITHRECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.POWITHRECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state) ||

        (STATE.PONORECEIVERS_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state) ||
        (STATE.PONORECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.PONORECEIVERS_DATE_RANGE_READY==this.props.ProdRpt.state) ||

        (STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_DATE_RANGE_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_PROMPT_NOT_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_PROMPT_READY==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_NO_RECORDS==this.props.ProdRpt.state) ||
        (STATE.OPENPOEMAIL_DATE_RANGE_NO_RECORDS==this.props.ProdRpt.state) 
      )
    {
      navbar =
        <Navbar inverse fixedBottom>
          <NavbarHeader>
            <NavbarBrand >
              <IndexLink to="/" onClick={this.props.cancelApp} >Home
              </IndexLink>
            </NavbarBrand>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            <Nav>
              <LinkContainer to="/POReqTrans">
                <NavItem eventKey={1}>PO Request Transfer</NavItem>
              </LinkContainer>      
              <LinkContainer to="/GenReceivers">
                <NavItem eventKey={1}>Generate Receivers</NavItem>
              </LinkContainer>      

            </Nav>
          </NavbarCollapse>
        </Navbar>;
    }else{
      navbar =
        <Navbar inverse fixedBottom>
          <NavbarCollapse>
            <span className="navbar-center">{this.props.ProdRpt.status}</span>
          </NavbarCollapse>
        </Navbar>;

    }


    return (
      <Grid >
        {jumboTronTxt}
        {progressBtn}
        {rptMenu}

        {openPOEmailDateRange}
        {openPOEmailReview}

        {poWithReceiversDateRange}

        {poNoReceiversDateRange}

        {backBtn}
        {cancelBtn}
        {navbar}
      </Grid>
    );
  }
}

/////////////////////////////////////////////////////////////////
// Common End
/////////////////////////////////////////////////////////////////

  /*cncbusche/chips2017*/

