import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../../components/popper/Home';
import * as HomeActions from '../../actions/popper/Actions';

function mapStateToProps(state) {
  return {
    Popper: state.Popper
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


/*
import React, { Component } from 'react';
import Home from '../components/Home';

export default class HomePage extends Component {
  render() {
    return (
      <Home />
    );
  }
}
*/

