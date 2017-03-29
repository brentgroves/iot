import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,IndexLink } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import FanButton from '../../containers/moto/FanButton';
import { Grid, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron,Button} from 'react-bootstrap';
import {Header as NavbarHeader, Brand as NavbarBrand, Toggle as NavbarToggle, Collapse as NavbarCollapse, Text as NavbarText } from 'react-bootstrap/lib/Navbar'
//import mqtt from 'browserMqtt';
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
//var client  = mqtt.connect({ host: 'localhost', port: 1885 }) //mosquitto


export default class Fan extends Component {

  static propTypes = {
    Moto: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
//      loading: false
    };
  }


  render() {

  var goButton,navbar,cancelBtn,jumboTronTxt;

  jumboTronTxt=
    <Row >
      <Col >
        <Jumbotron style={{marginLeft:15,marginRight:15}} >
          <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Photocell</h1>
          <p style={{padding: '0px'}}>There are are more than 50 receivers to generate or rollback.  Ask 'IT' if you would like to override this condition check.</p>
          <br/>
        </Jumbotron>
      </Col>
    </Row>
  goButton = 
  <div>
    <Row>
      <Col xs={1}>&nbsp;</Col>
    </Row>
    <Row>
      <Col xs={5} >&nbsp;</Col>
      <Col xs={2}>Photocell value: </Col>
      <Col xs={5}>&nbsp;</Col>
    </Row>

  </div>

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


    return (

        <Grid >
          {jumboTronTxt}
          {goButton}
          {cancelBtn}
          {navbar}
        </Grid>
 
    );
  }
}



