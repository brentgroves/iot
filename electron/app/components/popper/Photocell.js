import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link,IndexLink } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Bulb from '../../containers/popper/Bulb';

import { Grid, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron,Button} from 'react-bootstrap';
import {Header as NavbarHeader, Brand as NavbarBrand, Toggle as NavbarToggle, Collapse as NavbarCollapse, Text as NavbarText } from 'react-bootstrap/lib/Navbar'
//import mqtt from 'browserMqtt';
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
//var client  = mqtt.connect({ host: 'localhost', port: 1885 }) //mosquitto


export default class Photocell extends Component {

  static propTypes = {
    Popper: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
//      loading: false
    };
  }

  componentDidMount(){
    this.props.gameStart("myCanvasId");
  }
  render() {

  var myCanvas;
  myCanvas =
    <Row >
      <Col xs={12}>
        <div id="myCanvasId">Hello</div>
      </Col>
    </Row>;
  var fusionChart;
  fusionChart =
    <Row >
      <Col xs={12}>
        <div id='chart-container'>fusionChart</div>
      </Col>
    </Row>;

  var bulb;
  bulb = <Bulb />
  var navbar;
  navbar =
    <Navbar inverse fixedBottom>
      <NavbarHeader>
        <NavbarBrand>
          <div style={{color: '#33ccff'}}>IOThings</div>
        </NavbarBrand>
        <NavbarToggle />
      </NavbarHeader>
      <NavbarCollapse>
        <Nav>
          <LinkContainer  to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>      
        </Nav>
      </NavbarCollapse>

    </Navbar>;


    return (

        <Grid >
          {myCanvas}
          {fusionChart}
          {bulb}
          {navbar}
        </Grid>
 
    );
  }
}



