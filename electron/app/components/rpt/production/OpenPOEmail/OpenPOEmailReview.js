import React, { Component, PropTypes } from 'react';
import { Row,Col,ListGroup,ListGroupItem,Panel,Table,Button,Glyphicon,ButtonGroup,ButtonToolbar} from 'react-bootstrap';
var classNames = require('classnames');
import * as STATE from "../../../../actions/rpt/production/State.js"
import styles from '../../../../css/rpt/production/styles.css';
var sorty    = require('sorty')
var _ = require('lodash');
var joins = require('lodash-joins');

var rowIndex=0;
var poitems=
[
  {fpono: "111111", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
  {fpono: "111111", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
  {fpono: "111112", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
  {fpono: "111112", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
  {fpono: "111113", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
  {fpono: "111113", fstatus:'OPEN',fpartno:'1',fordqty: 1, frcvqty:1},
];

var setStyle;
class PORow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poNumber:this.props.poItem.poNumber,
      vendorName:this.props.poItem.vendorName,
      eMailAddress:this.props.poItem.eMailAddress,
      visible:this.props.poItem.visible
    };
  }
  render() {
    var selected=this.props.poItem.selected;
    if ('development'==process.env.NODE_ENV) {
      console.log(`PORow:poNumber=>${this.state.poNumber}`);
    }
    var checkbox;
    if(selected){
      checkbox=<input type="checkbox" checked onChange={()=>this.props.toggleOpenPOSelected(this.state.poNumber)}/>;     
    }else{
      checkbox=<input type="checkbox" onChange={()=>this.props.toggleOpenPOSelected(this.state.poNumber)}/>;     
    }
    var showButton;
    if(this.state.visible){
      showButton=
        <Button bsSize="xsmall" 
          onClick={()=>this.props.toggleOpenPOVisible(this.state.poNumber)}>
          <Glyphicon glyph="chevron-down" />
        </Button>     
    }else{
      showButton=
        <Button bsSize="xsmall" 
          onClick={()=>this.props.toggleOpenPOVisible(this.state.poNumber)}>
          <Glyphicon glyph="chevron-right" />
        </Button>     
    }
    var noEmailAddress=false;
    if('None'==this.state.eMailAddress){
      noEmailAddress=true;
    }

    var poStyle;
    if(noEmailAddress){
      poStyle={
        color:'red'
      }
    }else{
      poStyle={
      }
    }
 
    return (
      <tr >
        <th colSpan="4" >
          {showButton}
          <span style={{paddingLeft:25,color:'steelblue'}}>PO: </span> 
          {this.state.poNumber}{" / "}{this.state.vendorName}{' / '}
          <span style={poStyle}>
            {this.state.eMailAddress}
          </span>
          <span style={{paddingLeft:25,color:'steelblue'}}>Select: </span> 
          {checkbox}     
        </th>
      </tr>
    );
  }
}

class POItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    var myRow=null;
    var poNumber=this.props.poItem.poNumber;
    var itemDescription=this.props.poItem.itemDescription;
    var qtyOrd=this.props.poItem.qtyOrd;
    var qtyReceived=this.props.poItem.qtyReceived;
    if(true==this.props.poItem.visible){
      myRow=<tr>
            <td>{poNumber}</td>
            <td>{itemDescription}</td>
            <td>{qtyOrd}</td>
            <td>{qtyReceived}</td>
          </tr>;
    }  
    if ('development'==process.env.NODE_ENV) {
      console.log(`myRow=>`);
      console.dir(myRow);
    }

    return myRow;
  }
}

var rowsPerPage;
class OpenPOTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    if ('development'==process.env.NODE_ENV) {
    }
  }
  render() {
    var rows = [];
    var lastPO = null;
    if ('development'==process.env.NODE_ENV) {
      console.log(`OpenPOTable.render()=>`);
    }
    var poItem=this.props.poItem;
    var curPage=this.props.curPage;
    var toggleOpenPOSelected=this.props.toggleOpenPOSelected;
    var toggleOpenPOVisible=this.props.toggleOpenPOVisible;
    if ('development'==process.env.NODE_ENV) {
      console.log(`OpenPOTable.render().curPage=>${curPage}`);
    }
    poItem.forEach(function(poItem) {
      if (poItem.poNumber !== lastPO) {
        if ('development'==process.env.NODE_ENV) {
          console.log(`poItem.poNumber=>${poItem.poNumber}`);
          console.log(`lastPO=>${lastPO}`);
          console.log(`poItem.poNumber !== lastPO`);
        }
        if(curPage==poItem.page){
          rows.push(<PORow 
                      toggleOpenPOSelected={toggleOpenPOSelected} 
                      toggleOpenPOVisible={toggleOpenPOVisible}
                      poItem={poItem} key={poItem.poNumber} />);          
        }

      }else{
        if ('development'==process.env.NODE_ENV) {
          console.log(`poItem.poNumber=>${poItem.poNumber}`);
          console.log(`lastPO=>${lastPO}`);
          console.log(`poItem.poNumber === lastPO`);
        }

      }
      var key = poItem.poNumber+poItem.itemDescription;
      if(curPage==poItem.page){
        rows.push(<POItemRow poItem={poItem} key={key} />);
      }
      lastPO = poItem.poNumber;
    });
    return (
      <Table style={{marginTop:0,marginBottom:0}} fill striped bordered condensed >
        <thead>
          <tr className={styles.tableHeader}>
            <th>PO</th>
            <th>Description#</th>
            <th>Ordered</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}


export default class OpenPOEmailReview extends React.Component {
  static propTypes = {
    ProdRpt: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      test:this.test.bind(this)
    };
    if ('development'==process.env.NODE_ENV) {
      console.log(`POPrompt:this.props.toggleOpenPOSelected=>`);
      console.dir(this.props.toggleOpenPOSelected);
    }
  }
 
 test(greeting){
  console.log(`greeting: ${greeting}`);
 }

  render() {
    
    var pageClass = classNames(
      'pagination','hidden-xs', 'pull-right'
    );
    var pageNoClass = classNames(
      'pagination','hidden-xs', 'pull-left'
    );
    var pages = [];
    var poItem=this.props.ProdRpt.openPOEmail.poItem;
    var curPage=this.props.ProdRpt.openPOEmail.curPage;
    var maxPage=this.props.ProdRpt.openPOEmail.maxPage;
    var prevPage=this.props.ProdRpt.openPOEmail.prevPage;
    var nextPage=this.props.ProdRpt.openPOEmail.nextPage;
    if ('development'==process.env.NODE_ENV) {
      console.log(`OpenPOEmailReview.Render().curPage=>${curPage}`);
      console.log(`OpenPOEmailReview.Render().maxPage=>${maxPage}`);
      console.log(`OpenPOEmailReview.Render().prevPage=>${prevPage}`);
      console.log(`OpenPOEmailReview.Render().nextPage=>${nextPage}`);
    }

    for(var x=1;x<=maxPage;x++){
        let page=x;
        pages.push(<li key={x}><a onClick={()=>{this.props.setOpenPOEmailCurPage(page)}}>{x}</a></li>);
    }
  const rpt1Style = {
    fontWeight:'bold'
  };
    var saveAndBackBtn;
    if(
        (STATE.OPENPOEMAIL_REVIEW_NOT_READY==this.props.ProdRpt.state) 
      ){

      saveAndBackBtn = 
      <div>
        <Col xs={1}>
          <Button disabled style={{marginTop:15}} bsSize="large" bsStyle="success" onClick={()=>this.props.openPOEmailReport()}>Run</Button>
        </Col>
        <Col xs={2}>
          <Button  style={{marginTop:15,marginLeft:15}} bsSize="large" bsStyle="info" onClick={()=>this.props.setState(STATE.OPENPO_DATE_RANGE_READY)}>Back</Button>
        </Col>
      </div>
    }else{
      saveAndBackBtn = 
      <div>
        <Col xs={1}>
          <Button style={{marginTop:15}} bsSize="large" bsStyle="success" onClick={()=>this.props.OpenPOEmailReport()}>Run</Button>
        </Col>
        <Col xs={2}>
          <Button  style={{marginTop:15,marginLeft:15}} bsSize="large" bsStyle="info" onClick={()=>this.props.setState(STATE.OPENPO_DATE_RANGE_READY)}>Back</Button>
        </Col>
      </div>
    }

    return (
      <div>
          <OpenPOTable poItem={poItem} curPage={curPage}
            toggleOpenPOSelected={this.props.toggleOpenPOSelected} 
            toggleOpenPOVisible={this.props.toggleOpenPOVisible}/>
                <Row>
                  <Col xs={3}>
                    <ul className={pageNoClass}>
                      <li><span style={{color:'black'}} >Page {curPage} of {maxPage}</span></li>
                    </ul>
                  </Col>
                  {saveAndBackBtn}
                   <Col xs={6}>
                    <ul className={pageClass}>
                      <li><a onClick={()=>{this.props.setOpenPOPrevPage()}}>«</a></li>
                      <li><a onClick={()=>{this.props.setOpenPONextPage()}}>»</a></li>
                      {pages}  
                    </ul>
                  </Col>
                </Row>

      </div>
    );
  }
}


