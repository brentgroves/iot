import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'
//import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import './Login.css'
import config from '../config'
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      email: '',
      password: '',
      emailStatus:'',
      passwordStatus:'',
      formStatus:''
    }
  // This binding is necessary to make `this` work in the callback
  this.emailChange = this.emailChange.bind(this)
  // This binding is necessary to make `this` work in the callback
  this.passwordChange = this.passwordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
  this.validateEmail = this.validateEmail.bind(this)


  }



  login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })
    const user = new CognitoUser({ Username: email, Pool: userPool })
    const authenticationData = { Username: email, Password: password }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: result => resolve(),
        onFailure: err => reject(err)
      })
    )
  }


  validateEmail(x) {
    let atpos = x.indexOf('@')
    let dotpos = x.lastIndexOf('.')
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      //  alert("Not a valid e-mail address");
      return 'error'
    }
    return 'success'
  }

  // cant combine change functions because of async nature of setState
  emailChange = event => {
    let emailStatus = this.validateEmail(event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
      emailStatus: emailStatus
    }) //async so be careful
    let formStatus;
    if (emailStatus === 'success' &&  this.state.passwordStatus === 'success'){
      formStatus='success';
    }else{
      formStatus='error';
    }
    this.setState({
      formStatus: formStatus
    }) //async so be careful


  }

  passwordChange = event => {
    let passwordStatus;
    if(event.target.value.length>0){
      passwordStatus='success';
    }else{
      passwordStatus='error';
    } 
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus
    }) //async so be careful
    let formStatus;
    if (this.state.emailStatus === 'success' &&  passwordStatus === 'success'){
      formStatus='success';
    }else{
      formStatus='error';
    }
    this.setState({
      formStatus: formStatus
    }) //async so be careful

  }

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    try {
      await this.login(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)

        this.props.history.push('/wait');
        
        
    } catch (e) {
      alert(e)
      this.props.history.push('/errorModal');
    }
  }

  render() {
   const {emailStatus,passwordStatus,loading} = this.state; 
   let disableSubmitButton = (this.state.formStatus!=='success')?true:false;
    return (
  <Form >
    {(emailStatus === 'error'
      ? 
        <Form.Input 
          error
           id='email'
          label='Email' placeholder='joe@schmoe.com' 
          onChange={this.emailChange}
        />
      : 
        <Form.Input 
          id='email'
          label='Email' placeholder='joe@schmoe.com' 
          onChange={this.emailChange}
        />
    )}


        <Message
          success
          header='Form Completed'
          content="You're all signed up for the newsletter"
        />


    {(passwordStatus === 'error'
      ? 
        <Form.Input 
          error
          id='password'
          label='Enter Password' 
          type='password' 
          onChange={this.passwordChange}
        />
      : 
        <Form.Input 
          id='password'
          label='Enter Password' 
          type='password' 
          onChange={this.passwordChange}
        />
    )}

    <Button disabled={disableSubmitButton} loading={loading} onClick={this.handleSubmit}>Submit</Button>
  </Form>
    )
  }
}

export default withRouter(Login)
