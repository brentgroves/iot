import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Segment, Header, Icon, Button, Form, Message } from 'semantic-ui-react'
import GenericModal from '../components/GenericModal'
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
      formStatus:'',
      modalOpen: false,
      modalMessage: '',
      modalHeading: ''

    }
  // This binding is necessary to make `this` work in the callback
  this.emailChange = this.emailChange.bind(this)
  // This binding is necessary to make `this` work in the callback
  this.passwordChange = this.passwordChange.bind(this)
    // This binding is necessary to make `this` work in the callback
  this.validateEmail = this.validateEmail.bind(this)

// This binding is necessary to make `this` work in the callback
this.setModal = this.setModal.bind(this)
 

  }


  setModal(open, message, heading) {
    if (message) {
      this.setState({
        modalOpen: open,
        modalMessage: message,
        modalHeading: heading
      })
    } else {
      this.setState({ modalOpen: open })
    }
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

    this.setState({ loading: false })

          this.setState({
            modalOpen: true,
            modalHeading: 'Script Failure',
            modalMessage: 'SSIS scripts did not process!'
          })


   //     this.props.history.push('/wait');
        
        
    } catch (e) {
      alert(e)
      this.props.history.push('/errorModal');
    }
  }

  render() {
   const {emailStatus,passwordStatus,loading,modalOpen} = this.state; 
   let disableSubmitButton = (this.state.formStatus!=='success')?true:false;
    const childProps = {
      modalOpen: this.state.modalOpen,
      modalHeading: this.state.modalHeading,
      modalMessage: this.state.modalMessage,
      setModal: this.setModal
    }

    return (
      <div >

        {modalOpen ? <GenericModal childProps={childProps} />
          :
          <Grid >
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={10}>
                    &nbsp;<br />&nbsp;

                <Segment>
                  <Header as='h2'>
                    <Icon name='plug' />
                    <Header.Content>
              Welcome to Busche!
                    </Header.Content>
                  </Header>

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

    <Button disabled={disableSubmitButton} 
      loading={loading} onClick={this.handleSubmit}>Submit</Button>
  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>


          </Grid>
        }
      </div>

    )
  }
}

export default withRouter(Login)
