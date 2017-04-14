// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import { Grid, Label, Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Jumbotron,Button} from 'react-bootstrap';
import {Header as NavbarHeader, Brand as NavbarBrand, Toggle as NavbarToggle, Collapse as NavbarCollapse, Text as NavbarText } from 'react-bootstrap/lib/Navbar'


export default class Home extends Component {
  static propTypes = {
    Popper: PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);
    if ('development'==process.env.NODE_ENV) {
      console.log(`Popper=${this.props.Popper.clickCount}`);
    }

    this.state = {
     // loading: false
    };
  }

  render() {

  var jumboTronTxt;
  jumboTronTxt=
    jumboTronTxt=
      <Row >
        <Col >
          <Jumbotron style={{marginLeft:0,marginRight:0}} >
            <h1 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Internet of Things</h1>
            <h2 style={{textAlign: 'center',marginTop:15,marginBottom:0}}>Phaser</h2>
            <p style={{textAlign: 'center'}}><strong>Description:{" "}</strong>Please choose from one of the activities listed below.</p>
            <br/>
          </Jumbotron>
        </Col>
      </Row>
  var gridMenu;
  gridMenu =
  <div>
    <Row>
      <Col xs={1}>&nbsp;</Col>
    </Row>
    <Row>
      <Col xs={1}>&nbsp;</Col>
    </Row>
    <Row>
      <Col xs={3}></Col>
      <Col xs={6}>
        <table className="tg">
        <tbody>
          <tr>
              <td className="btnPrimary" onClick={()=>{this.props.gameStart();}}>OSEPP Fan</td>
              <td className="btnSuccess"onClick={()=>{this.props.fan();}}>Photocell</td>
              <td className="btnWarning" onClick={()=>{this.props.fan();}}>Reports</td>
          </tr>
          </tbody>
        </table>
      </Col>
      <Col xs={3}></Col>
    </Row>

  </div>;

  var navbar;
  navbar=
  <Navbar inverse  fixedBottom>
    <NavbarHeader>
      <NavbarBrand>
        <div style={{color: '#33ccff'}}>IOThings</div>
      </NavbarBrand>
      <NavbarToggle />
    </NavbarHeader>
    <NavbarCollapse>
      <Nav>
        <LinkContainer to="/Fan">
          <NavItem eventKey={1}>Fan</NavItem>
        </LinkContainer>      
      </Nav>
    </NavbarCollapse>
  </Navbar>

    return (
      <div>
        <Grid>
        {jumboTronTxt}
        {gridMenu}
        </Grid>
        {navbar}
      </div>
    );
  }
}
