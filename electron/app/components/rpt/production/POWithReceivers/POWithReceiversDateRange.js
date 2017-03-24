import '../../../../css/rpt/production/styles.global.css';
import styles from '../../../../css/rpt/production/styles.css';
import React, { Component, PropTypes } from 'react';
import 'react-widgets/lib/less/react-widgets.less';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Multiselect from 'react-widgets/lib/Multiselect';
import { FormGroup,FormControl,HelpBlock,Checkbox,ControlLabel,Label,Row,Col,ListGroup,ListGroupItem,Panel,Table,Button,Glyphicon,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';
import * as STATE from "../../../../actions/rpt/production/State.js"

var dateFormat = require('dateformat');
var Moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment');
var classNames = require('classnames');
momentLocalizer(Moment);


export default class POWithReceiversDateRange extends React.Component {
  static propTypes = {
    ProdRpt: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      test:this.test.bind(this)
    };
    if ('development'==process.env.NODE_ENV) {
    }
  }
 
 test(dt,dateStart,dateEnd){
  console.log(`dt: ${dt}`);
  var dtStart = dateFormat(new Date(dt), "mm-dd-yyyy hh:MM:ss");
  if ('development'==process.env.NODE_ENV) {
    console.log(`dtStart=>${dtStart}`);
  }
   var dtStartFmt = dateFormat(new Date(dateStart), "mm-dd-yyyy hh:MM:ss");
  if ('development'==process.env.NODE_ENV) {
    console.log(`dtStartFmt=>${dtStartFmt}`);
  }
  var dtEndFmt = dateFormat(new Date(dateEnd), "mm-dd-yyyy hh:MM:ss");
  if ('development'==process.env.NODE_ENV) {
    console.log(`dtEndFmt=>${dtEndFmt}`);
  }
 }

  
  render() {

    var runAndBackBtn;
    if(STATE.POWITHRECEIVERS_DATE_RANGE_NOT_READY==this.props.ProdRpt.state){
     runAndBackBtn = 
      <Row>
        <Col xs={4} >&nbsp;</Col>
        <Col xs={1}><Button  onClick={()=>this.props.poWithReceivers()} bsSize="large" bsStyle="info" disabled>Run</Button></Col>
        <Col xs={1} >&nbsp;</Col>
        <Col xs={2}><Button onClick={()=>this.props.setState(STATE.NOT_STARTED)} bsSize="large" bsStyle="warning">Back</Button></Col>
        <Col xs={3}>&nbsp;</Col>
      </Row>
    }else{
      runAndBackBtn = 
      <Row>
        <Col xs={4} >&nbsp;</Col>

        <Col xs={2}><Button  onClick={()=>this.props.poWithReceivers()}  bsSize="large" bsStyle="info" >Run</Button></Col>
        <Col xs={1}><Button  onClick={()=>this.props.setState(STATE.NOT_STARTED)} bsSize="large" bsStyle="warning">Back</Button></Col>
        <Col xs={3}>&nbsp;</Col>
      </Row>
    }
    var pageNoClass = classNames(
      'pagination','hidden-xs', 'pull-left'
    );

    var dateHeader; 
    var dateStyle;
    if(this.props.ProdRpt.poWithReceivers.dateHeader.valid){
      dateHeader=<h3 style={{textAlign:'center'}}>{this.props.ProdRpt.poWithReceivers.dateHeader.text}</h3>
      dateStyle='default';
    }else{
      dateHeader=<h3 style={{textAlign:'center',color:'red !important'}}>{this.props.ProdRpt.poWithReceivers.dateHeader.text}</h3>
      dateStyle='danger';
    }

    return (
      <div>
        <Panel bsStyle={dateStyle} header={dateHeader}>
          <Row>
            <Col xs={1} >
              <h1 style={{marginTop:0}}><Label  bsStyle="primary">Start</Label></h1>
            </Col>
            <Col xs={8} xsOffset={1} style={{}}>
              <DateTimePicker 
                onChange={(name,value)=>{
                  this.state.test(name,this.props.ProdRpt.poWithReceivers.dateStart,this.props.ProdRpt.poWithReceivers.dateEnd);
                  this.props.setPOWithReceiversDateStart(name);
                  this.props.poWithReceiversDateRange();
                }}
              defaultValue={this.props.ProdRpt.poWithReceivers.dateStart} />
            </Col>
          </Row>
          <Row>
            <Col xs={1}>
              <h1 style={{marginTop:0}}><Label  bsStyle="primary">End</Label></h1>
            </Col>
            <Col xs={8} xsOffset={1}>
              <DateTimePicker 
                onChange={(name,value)=>{
                  this.props.setPOWithReceiversDateEnd(name);
                  this.props.poWithReceiversDateRange();
                }}
              defaultValue={this.props.ProdRpt.poWithReceivers.dateEnd} />
            </Col>
          </Row>
        </Panel>
      {runAndBackBtn}
      </div>

    );
  }
}


