import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,IndexLink } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import GRButton from '../../../containers/production/gr/GRButton';
import GRChecks from '../../../containers/production/gr/GRChecks';
import GRGrid from '../../../containers/production/gr/GRGrid';
import GRReactDataGrid from '../../../containers/production/gr/GRReactDataGrid';
//import GRDataGrid from '../../containers/GR/GRDataGrid';
import * as GRSTATE from "../../../actions/production/gr/GRState.js"
import { Grid, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron,Button} from 'react-bootstrap';
import {Header as NavbarHeader, Brand as NavbarBrand, Toggle as NavbarToggle, Collapse as NavbarCollapse, Text as NavbarText } from 'react-bootstrap/lib/Navbar'
/*
.jumbotron {
    background-color:black !important; 
}
*/

//var initPORT;

export default class GenReceivers extends Component {

  static propTypes = {
    GenR: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.props.prime();
    this.state = {
      loading: false
    };
  }

  render() {

  const jbk ={backgroundColor: 'black' };
  const st1 ={backgroundImage: 'url(intro-bg.jpg)', backgroundSize: 'cover'};

  const toppg ={position: 'fixed',top: 0,left: 0};

  const bnr ={backgroundImage: 'url(banner.jpg)', backgroundSize: 'cover', padding: '0px 10px 0px 20px'};
  const belowbnr ={position: 'absolute',top: 80};
  const chk2 ={backgroundColor: 'black' , color: 'green',border: '1px solid blue',   padding: '5px 13px' };
  const dbg1 ={border: '1px solid blue', padding: '0px' };

  var checks,goButton,grid,reactDataGrid,pdfReport,navbar,cancelBtn,saveAndCancelBtn,jumboTronTxt,navbarStatus,navbarEnd;

  if(GRSTATE.NOT_PRIMED==this.props.GenR.state){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
             <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Connecting to Databases</h1>
            <p style={{textAlign: 'center'}}><strong>Description:{" "}</strong>Attempting to connect to CribMaster and Made2Manage</p>
            <p style={{textAlign: 'center'}}><strong>Please wait...</strong></p> 
            <br/>
          </Jumbotron>
        </Col>
      </Row>
  } else if(GRSTATE.PRIMED==this.props.GenR.state){
    jumboTronTxt=
      <Row>
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
             <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Generate Receivers</h1>
            <p style={{padding: '0px'}}>This App generates M2m receivers from items received into Cribmaster.
            It includes a ROLLBACK process so if it fails at ANY point just run it again. 
            <br/><br/>
            <strong>Do not START if you are not ready with packing list numbers for most if not ALL items received.  
            At most 5 items without a packing list number are allowed.</strong>
            <br/><br/>
            <strong>Do NOT give receipts to Accounting until the program completes successfully.</strong>
            </p>
            <br/>
            <p style={{textAlign: 'center'}}>Once the GO! button is clicked this process will start.  </p>            
            <br/>
          </Jumbotron>
          </Col >
        </Row>
  } else if(
            (GRSTATE.OUT_OF_RANGE==this.props.GenR.state)
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Out Of Range</h1>
            <p style={{padding: '0px'}}>There are are more than 50 receivers to generate or rollback.  Ask 'IT' if you would like to override this condition check.</p>
            <br/>
          </Jumbotron>
        </Col>
      </Row>
  } else if(
            (GRSTATE.UPTODATE==this.props.GenR.state)
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Up-To-Date</h1>
            <p style={{padding: '0px',textAlign:'center'}}>There are currently 'NO' PO Items needing received into Made2Manage.</p>
           <br/>
          </Jumbotron>
        </Col>
      </Row>
  } else if(
            (GRSTATE.STARTED==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Validation in Progress</h1>
            <p style={{padding: '0px'}}>Checking if the previous session finished gracefully,
            and all POs items are ready to receive into Made2Manage.  This shouldn't take long.</p>
            <br/>
          </Jumbotron>

        </Col>
      </Row>
  } else if(
            (GRSTATE.PREPARING_RECEIVERS==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Preparing Receivers</h1>
            <p style={{textAlign: 'center'}}>Preparing receivers that will need to be updated with a freight carrier & packing list.</p>
            <p style={{textAlign: 'center',paddingBottom:5}}><strong>Please wait...</strong></p> 
            <br/>
          </Jumbotron>

        </Col>
      </Row>

  } else if(
            (GRSTATE.NOT_READY_TO_REVIEW==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Freight Carrier & Packing List</h1>
            <p style={{textAlign: 'center',paddingBottom:5}}>Please enter the packing list number and
            select the appropriate freight carrier before continuing. Check the Del field to bypass this receiver.</p>
          </Jumbotron>
        </Col>
      </Row>
  } else if(
            (GRSTATE.READY_TO_REVIEW==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Ready to Review</h1>
            <p >Please enter more packing list numbers or press the 'Review' button to review receiver 
            items to be inserted. Check the Del field to bypass this receiver.</p>
            <p><strong>Note: {' '}</strong>Only PO(s) with a packing list number will be processed this run.</p>
          </Jumbotron>
        </Col>
      </Row>
  } else if(
            (GRSTATE.PRE_REVIEW_RECEIVERS==this.props.GenR.state)  
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Preparing Review</h1>
            <p style={{textAlign: 'center'}}>Preparing for review. Generating tables and calculating sums.</p>
            <p style={{textAlign: 'center',paddingBottom:5}}><strong>Please wait...</strong></p> 
            <br/>

          </Jumbotron>
        </Col>
      </Row>

  } else if(
            (GRSTATE.REVIEW_RECEIVERS==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Review Receivers</h1>
            <p >Please review items before continuing. If the 
            freight carrier, packing list number, and quantity(s) look good then press the
            'save' button to create receiver(s) in Made2Manage.</p>
          </Jumbotron>
        </Col>
      </Row>
  } else if(
            (GRSTATE.GENERATE_RECEIVERS==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col xs={1}>&nbsp;</Col>
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Generating Receivers</h1>
            <p >The verified receiver(s) are now being inserted into Made2Manage.</p>
            <p><strong>Note:{" "}</strong>This is the last crucial step in the process.  After this Accounting 
            will be able to verify the receipts.</p>
            <p style={{textAlign: 'center',paddingBottom:5}}><strong>Please wait...</strong></p> 
            <br/>
          </Jumbotron>
        </Col>
      </Row>

  } else if(
            (GRSTATE.DISPLAY_REPORT==this.props.GenR.state) 
            ){
    jumboTronTxt=
      <Row >
        <Col xs={1}>&nbsp;</Col>
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Creating Report</h1>
            <p >Generating the PO Status report now!
            This report shows the current status of all PO(s) generated by this App.</p>
            <p><strong>At this point Made2Manage has been updated with the new Receivers, and
            even if the report fails you do not need to rerun the App.</strong></p>
            <p style={{textAlign: 'center',paddingBottom:5}}><strong>Please wait...</strong></p> 
            <br/>
          </Jumbotron>
        </Col>
      </Row>

  } else if(GRSTATE.FAILURE==this.props.GenR.state){
    jumboTronTxt=
      <Row >
        <Col xs={1}>&nbsp;</Col>
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Error!</h1>
            <div style={{textAlign: 'left'}}>
            <p><strong>Description:{" "}</strong>{this.props.GenR.reason}</p>
            <p><strong>Press the Cancel button and try again.</strong></p> 
            <p><strong>If the problem persists give IT the error description above.</strong></p>
            </div>
            <br/>
          </Jumbotron>
        </Col>
      </Row>
  } else if(GRSTATE.SUCCESS==this.props.GenR.state){
    jumboTronTxt=
      <Row >
        <Col xs={1}>&nbsp;</Col>
        <Col >
          <Jumbotron style={{marginLeft:15,marginRight:15}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>SUCCESS!</h1>
            <br/>
            <div style={{textAlign: 'left'}}>
            <p >All of the requested PO(s) items have been received
            into Made2Manage successfully.</p>
            <p>Made2Manage has been updated and you can now give the receipts to the Accounting dept.</p> 
            <p>Use the menu bar to navigate back to the main menu
            or click the 'x' in the upper right corner to exit this App.</p>
            </div>
            <br/>
          </Jumbotron>
        </Col>
      </Row>
  }


  if(
    (GRSTATE.NOT_PRIMED==this.props.GenR.state) ||
      (GRSTATE.PRIMED==this.props.GenR.state) ||
      (GRSTATE.STARTED==this.props.GenR.state) ||
      (GRSTATE.PREPARING_RECEIVERS==this.props.GenR.state) ||
      (GRSTATE.PRE_REVIEW_RECEIVERS==this.props.GenR.state)  ||
      (GRSTATE.GENERATE_RECEIVERS==this.props.GenR.state) ||
      (GRSTATE.DISPLAY_REPORT==this.props.GenR.state) 
    )
  {
    goButton = 
    <div>
      <Row>
        <Col xs={1}>&nbsp;</Col>
      </Row>
      <Row>
        <Col xs={5} >&nbsp;</Col>
        <Col xs={2}><GRButton /></Col>
        <Col xs={5}>&nbsp;</Col>
      </Row>

    </div>
  }

  if(
      (GRSTATE.STARTED==this.props.GenR.state) ||
      (GRSTATE.PREPARING_RECEIVERS==this.props.GenR.state) ||
      (GRSTATE.PRE_REVIEW_RECEIVERS==this.props.GenR.state)  ||
      (GRSTATE.GENERATE_RECEIVERS==this.props.GenR.state)  ||
      (GRSTATE.DISPLAY_REPORT==this.props.GenR.state) ||
      (GRSTATE.OUT_OF_RANGE==this.props.GenR.state)  ||
      (GRSTATE.UPTODATE==this.props.GenR.state)  ||
      (GRSTATE.FAILURE==this.props.GenR.state)  
    )
  {
    checks = 
      <Row >
        <Col xs={4}></Col>
        <Col xs={4}><GRChecks /></Col>
        <Col xs={4}></Col>
      </Row>
  } 

  if(
      (GRSTATE.NOT_READY_TO_REVIEW==this.props.GenR.state)  ||
      (GRSTATE.READY_TO_REVIEW==this.props.GenR.state)  
    )
  {
    grid = 
    <div>
      <Row>
        <Col xs={12}><GRGrid /></Col>
      </Row>
    </div>
  }
  if(
      (GRSTATE.REVIEW_RECEIVERS==this.props.GenR.state)  
    )
  {
    reactDataGrid = 
      <Row>
        <Col xs={12}><GRReactDataGrid /></Col>
      </Row>
  }

  if(
      (GRSTATE.FAILURE==this.props.GenR.state) ||
      (GRSTATE.OUT_OF_RANGE==this.props.GenR.state)
    )
  {
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
    </div>
  }


  if(
      (GRSTATE.NOT_READY_TO_REVIEW==this.props.GenR.state) 

    )
  {
    saveAndCancelBtn = 

      <Row>
        <Col xs={5} >&nbsp;</Col>
        <Col xs={1}><Button  onClick={this.props.RcvJoin} bsSize="large" bsStyle="info" disabled>Review</Button></Col>
        <Col xs={3}><Button style={{marginLeft:10}} onClick={this.props.cancelApp} bsSize="large" bsStyle="warning">Cancel</Button></Col>
        <Col xs={4}>&nbsp;</Col>
      </Row>

  }

  if(
      (GRSTATE.READY_TO_REVIEW==this.props.GenR.state) 

    )
  {
    saveAndCancelBtn = 
    <div>
      <Row>
        <Col xs={1}>&nbsp;</Col>
      </Row>

      <Row>
        <Col xs={5} >&nbsp;</Col>
        <Col xs={1}><Button  onClick={this.props.RcvJoin} bsSize="large" bsStyle="info" >Review</Button></Col>
        <Col xs={2}><Button style={{marginLeft:10}} onClick={this.props.cancelApp} bsSize="large" bsStyle="warning">Cancel</Button></Col>
        <Col xs={4}>&nbsp;</Col>
      </Row>
    </div>
  }

  if(
      (GRSTATE.REVIEW_RECEIVERS==this.props.GenR.state) 

    )
  {
    saveAndCancelBtn = 
      <Row >
        <Col xs={5} >&nbsp;</Col>
        <Col xs={1}><Button style={{marginTop:100}} onClick={this.props.m2mGenReceivers} bsSize="large" bsStyle="info">Save</Button></Col>
        <Col xs={2}><Button style={{marginTop:100,marginLeft:10}} onClick={() => this.props.setState(GRSTATE.READY_TO_REVIEW)} bsSize="large" bsStyle="warning">Back</Button></Col>
        <Col xs={4}>&nbsp;</Col>
      </Row>
  }


  if(
      (GRSTATE.PRIMED==this.props.GenR.state) || 
      (GRSTATE.UPTODATE==this.props.GenR.state) ||  
      (GRSTATE.SUCCESS==this.props.GenR.state)  || 
      (GRSTATE.DISPLAY_REPORT==this.props.GenR.state) 

    )
  {
    navbar =
      <Navbar inverse fixedBottom>
        <NavbarHeader>
          <NavbarBrand >
            <IndexLink to="/" onClick={this.props.cancelApp} ><div style={{color: '#33ccff'}}>Home</div>         </IndexLink>
          </NavbarBrand>
          <NavbarToggle />
        </NavbarHeader>
        <NavbarCollapse>
          <Nav>
            <LinkContainer  to="/POReqTrans">
              <NavItem eventKey={1}>PO Request Transfer</NavItem>
            </LinkContainer>      
            <LinkContainer to="/ProdReports">
              <NavItem eventKey={1}>Reports</NavItem>
            </LinkContainer>      

          </Nav>
        </NavbarCollapse>

      </Navbar>;
  }else{
    navbar =
      <Navbar inverse fixedBottom>
        <NavbarCollapse>
          <span className="navbar-center">{this.props.GenR.status}</span>
        </NavbarCollapse>
      </Navbar>;

  }


    return (

        <Grid >
          {jumboTronTxt}
          {checks}
          {grid}
          {reactDataGrid}
          {pdfReport}
          {goButton}
          {saveAndCancelBtn}
          {cancelBtn}
          {navbar}
        </Grid>
 
    );
  }
}



