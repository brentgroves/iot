import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import Routes from './Routes'
import { authUser, signOutUser } from './libs/awsLib'
import TopMenu from './components/TopMenu'
import MySidebar from './components/MySidebar'

// import './App.css'
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      rptStep: 1,
      sidebarVisible: false,
      dtStart: '12-6-2017 23:15:10',
      
    }

    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.setSidebarVisible = this.setSidebarVisible.bind(this)
  }


  async componentDidMount() {

  }



  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }


  setSidebarVisible = visible => {
    this.setState({ sidebarVisible: visible })
  }

  getRptStep = () => {
    return this.state.rptStep
  }


  handleLogout = (event) => {
    signOutUser()
    this.userHasAuthenticated(false)
    this.setState({ sidebarVisible: false })
    this.props.history.push('/login')
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      setSidebarVisible: this.setSidebarVisible,
      sidebarVisible:this.state.sidebarVisible,


    }


    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }

    return (
      <div style={divStyle} className='mycontainer'>

 <TopMenu childProps={childProps}/>
 <MySidebar childProps={childProps} />
      </div>
    )
  }
}

export default withRouter(App)

