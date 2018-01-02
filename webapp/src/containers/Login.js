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
      emailStatus: '',
      passwordStatus: '',
      formStatus: '',
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
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
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
    let emailStatus = this.validateEmail(event.target.value)
    this.setState({
      [event.target.id]: event.target.value,
      emailStatus: emailStatus
    }) // async so be careful
    let formStatus
    if (emailStatus === 'success' && this.state.passwordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      formStatus: formStatus
    }) // async so be careful
  }

  passwordChange = event => {
    let passwordStatus
    if (event.target.value.length > 0) {
      passwordStatus = 'success'
    } else {
      passwordStatus = 'error'
    }
    this.setState({
      [event.target.id]: event.target.value,
      passwordStatus: passwordStatus
    }) // async so be careful
    let formStatus
    if (this.state.emailStatus === 'success' && passwordStatus === 'success') {
      formStatus = 'success'
    } else {
      formStatus = 'error'
    }
    this.setState({
      formStatus: formStatus
    }) // async so be careful
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

  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    let thisLv1 = this

    await this.login(this.state.email, this.state.password)
      .then(function () {
        let thisLv2 = thisLv1
        thisLv2.props.userHasAuthenticated(true)
        thisLv2.setState({ loading: false })
        thisLv2.setState({
          modalOpen: true,
          modalHeading: 'Next',
          modalMessage: 'Implement Next Screen!'
        })
      }).catch(function (e) {
        thisLv1.setState({
          loading: false,
          modalOpen: true,
          modalHeading: 'Login failure!',
          modalMessage: e.message
        })
      })
  }

  render() {
    const { emailStatus, passwordStatus, loading, formStatus, modalOpen } = this.state
    let disableSubmitButton = (formStatus !== 'success') ? true : false
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
              <Grid.Column width={5} />
              <Grid.Column width={6}>
                    &nbsp;<br />&nbsp;

                <Segment inverted>
                  <Header as='h2'>
                    <Icon name='user outline' />
                    <Header.Content>
              Welcome to IOT!
                    </Header.Content>
                  </Header>
                  <Form inverted>
                    <Form.Input
                      error={emailStatus === 'error'}
                      id='email'
                      label='Email' placeholder='joe@schmoe.com'
                      onChange={this.emailChange}
                    />
                    <Message
                      success
                      header='Form Completed'
                      content="You're all signed up for the newsletter"
                    />
                    <Form.Input
                      error={passwordStatus === 'error'}
                      id='password'
                      label='Enter Password'
                      type='password'
                      onChange={this.passwordChange}
                    />

                    <Button disabled={disableSubmitButton}
                      loading={loading} onClick={this.handleSubmit}>Submit</Button>
                  </Form>
                </Segment>
              </Grid.Column>
              <Grid.Column width={5} />
            </Grid.Row>


          </Grid>
        }
      </div>

    )
  }
}

export default withRouter(Login)
