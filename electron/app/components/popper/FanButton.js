import ProgressButton from 'react-progress-button'
import React, { Component } from 'react';

const FanButton = React.createClass({
  getInitialState () {
    return {
      buttonState: ''
    }
  },

  render () {
    if ('development'==process.env.NODE_ENV) {
      console.log('button render =' + this.props.Moto.goButton);
    }


    return (
      <div>
        <ProgressButton onClick={this.handleClick} 
        state={this.props.Moto.goButton}>
          Go!
        </ProgressButton>
      </div>
    )
  },

  handleClick () {
    if ('development'==process.env.NODE_ENV) {
      console.log('handleClick');
    }
    this.props.fanStart();

  }
})

export default FanButton;