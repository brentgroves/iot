import '../../../../css/rpt/production/styles.global.css';
import React, { Component, PropTypes } from 'react';
import 'react-widgets/lib/less/react-widgets.less';
import Multiselect from 'react-widgets/lib/Multiselect';
import { FormGroup,FormControl,HelpBlock,Checkbox,ControlLabel,Label,Row,Col,ListGroup,ListGroupItem,Panel,Table,Button,Glyphicon,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
var Moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment');

var classNames = require('classnames');
import * as STATE from "../../../../actions/rpt/production/State.js"
momentLocalizer(Moment);

export default class OpenPOEmailDateRange extends React.Component {
  static propTypes = {
    ProdRpt: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
    if ('development'==process.env.NODE_ENV) {
    }
  }
 
  
  render() {
    var continueAndBackBtn;
    if(STATE.OPENPOEMAIL_DATE_RANGE_NOT_READY==this.props.ProdRpt.state){
      continueAndBackBtn = 
        <Row>
          <Col xs={4} >&nbsp;</Col>
          <Col xs={1}><Button  onClick={()=>this.props.openPOVendorEmail()} bsSize="large" bsStyle="info" disabled>Continue</Button></Col>
          <Col xs={1} >&nbsp;</Col>
          <Col xs={2}><Button onClick={()=>this.props.setState(STATE.NOT_STARTED)} bsSize="large" bsStyle="warning">Back</Button></Col>
          <Col xs={3}>&nbsp;</Col>
        </Row>;
    }else{
      continueAndBackBtn = 
        <Row>
          <Col xs={4} >&nbsp;</Col>
          <Col xs={2}><Button  onClick={()=>this.props.openPOVendorEmail()}  bsSize="large" bsStyle="info" >Continue</Button></Col>
          <Col xs={1}><Button  onClick={()=>this.props.setState(STATE.NOT_STARTED)} bsSize="large" bsStyle="warning">Back</Button></Col>
          <Col xs={3}>&nbsp;</Col>
        </Row>;
    }

    var emailMRO;
    if(this.props.ProdRpt.openPOEmail.emailMRO){
      emailMRO=
        <span style={{borderStyle:'solid'}} >
          <Label   bsStyle='default' bsSize="large" htmlFor="mro">
              MRO 
          </Label>
          <Button onClick={()=>{
            this.props.openPOEmailMROToggle();
            this.props.openPOEmailDateRange();}} 
            name="mro" bsStyle='primary' ><Glyphicon style={{  opacity: 1}} glyph="ok" />
          </Button>
        </span>;
    }else{
      emailMRO=
        <span style={{borderStyle:'solid'}} >
          <Label  bsStyle='default' bsSize="large" htmlFor="mro">
              MRO 
          </Label>
          <Button onClick={()=>{
            this.props.openPOEmailMROToggle();
            this.props.openPOEmailDateRange();}} 
            name="mro" bsStyle='primary' ><Glyphicon style={{  opacity: 0}} glyph="ok" />
          </Button>
        </span>;
    }

    var emailVendor;
    if(this.props.ProdRpt.openPOEmail.emailVendor){
      emailVendor=
        <span style={{borderStyle:'solid'}} >
          <Label   bsStyle='default' bsSize="large" htmlFor="vendor">
              Vendor
          </Label>
            <Button onClick={()=>{
              this.props.openPOEmailVendorToggle();
              this.props.openPOEmailDateRange();}} 
              name="vendor" bsStyle='primary' ><Glyphicon style={{  opacity: 1}} glyph="ok" />
            </Button>
        </span>;
    }else{
      emailVendor=
        <span style={{borderStyle:'solid'}} >
          <Label  bsStyle='default' bsSize="large" htmlFor="test">
              Vendor 
          </Label>
          <Button onClick={()=>{
            this.props.openPOEmailVendorToggle();
            this.props.openPOEmailDateRange();}} 
            name="vendor" bsStyle='primary' ><Glyphicon style={{  opacity: 0}} glyph="ok" />
          </Button>
        </span>;
    }

    var pageNoClass = classNames(
      'pagination','hidden-xs', 'pull-left'
    );

    var dateHeader; 
    var dateStyle;
    if(this.props.ProdRpt.openPOEmail.dateHeader.valid){
      dateHeader=<h3 style={{textAlign:'center'}}>{this.props.ProdRpt.openPOEmail.dateHeader.text}</h3>
      dateStyle='default';
    }else{
      dateHeader=<h3 style={{textAlign:'center',color:'red !important'}}>{this.props.ProdRpt.openPOEmail.dateHeader.text}</h3>
      dateStyle='danger';
    }

    var emailHeader;
    var emailStyle;
    if(this.props.ProdRpt.openPOEmail.emailHeader.valid){
      emailHeader=<h3 style={{textAlign:'center'}}>{this.props.ProdRpt.openPOEmail.emailHeader.text}</h3>
      emailStyle='default';
    }else{
      emailHeader=<h3 style={{textAlign:'center',color:'red !important'}}>{this.props.ProdRpt.openPOEmail.emailHeader.text}</h3>
      emailStyle='danger';
    }

    var poHeader;
    var poStyle;
    poHeader=<h3 style={{textAlign:'center'}}>PO Multi-select</h3>
    poStyle='default';


    return (
      <div>
        <Panel>
          <Col xs={6}>
              <Panel bsStyle={poStyle} header={poHeader}>
                <Multiselect
                  data={this.props.ProdRpt.openPOEmail.po}
                  value={this.props.ProdRpt.openPOEmail.select}
                  onChange={select => {
                    this.props.setOpenPOEmailSelect(select);
                    this.props.openPOEmailDateRange();
                  }} />
              </Panel>
              <Panel bsStyle={emailStyle} header={emailHeader}>
                <Row>
                  <Col sm={6} >
                    <h1>
                      {emailMRO}
                    </h1>
                  </Col>
                  <Col sm={6}>
                    <h1>
                      {emailVendor}
                    </h1>
                  </Col>
                </Row>
              </Panel>
          </Col>
        <Col xs={6}>
          <Panel bsStyle={dateStyle} header={dateHeader}>
            <Row>
              <Col xs={1} >
                <h1 style={{marginTop:0}}><Label  bsStyle="primary">Start</Label></h1>
              </Col>
              <Col xs={8} xsOffset={2} style={{}}>
                <DateTimePicker 
                  onChange={(name,value)=>{
                    this.props.setOpenPODateStart(name);
                    this.props.openPOEmailDateRange();
                  }}
                defaultValue={this.props.ProdRpt.openPOEmail.dateStart} />
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                <h1 style={{marginTop:0}}><Label  bsStyle="primary">End</Label></h1>
              </Col>
              <Col xs={8} xsOffset={2}>
                <DateTimePicker 
                  onChange={(name,value)=>{
                    this.props.setOpenPODateEnd(name);
                    this.props.openPOEmailDateRange();
                  }}
                defaultValue={this.props.ProdRpt.openPOEmail.dateEnd} />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Panel>
      {continueAndBackBtn}
      </div>

    );
  }
}


