import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import Routes from './Routes'
import { authUser, signOutUser } from './libs/awsLib'
import TopMenu from './components/TopMenu'
// import './App.css'
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      rptStep: 1,
      sidebarvisible: false,
      activeItem: 'sidebar',
      sbActiveItem: 'tcsbyplant',
      ddActiveItem: 'production',
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
      sidebarVisible:this.sidebarVisible,
      history:this.props.history

    }

    const { activeItem, sbActiveItem, ddActiveItem } = this.state

    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }

    return (
      <div style={divStyle} className='mycontainer'>

 <TopMenu childProps={childProps}/>

        {this.state.ddActiveItem === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                  this.setRptStep(1)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
                <Routes childProps={childProps} />
              <div id='detail' style={divStyle} className='container fill mycontainer' />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} style={divStyle} attached='bottom'>
            <Sidebar as={Menu} style={divStyle} animation='push' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  this.setRptStep(1)
                  this.props.history.push('/tcsbyplant')
                  this.setState({ sidebarVisible: false })
                  this.setRptStep(1)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>

            </Sidebar>
            <Sidebar.Pusher dimmed={this.state.sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic >
                <Routes childProps={childProps} />
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        }
      </div>
    )
  }
}

export default withRouter(App)

