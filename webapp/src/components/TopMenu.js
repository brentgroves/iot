import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'

// import "./index.css";
import '../App.css'
import Routes from '../Routes'
class TopMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'sidebar',
      ddActiveItem: 'production',

    }

  }

  render() {

    const { activeItem, ddActiveItem } = this.state
    const {childProps,history} = this.props;
    return (
        <Menu fluid inverted attached='top'>
          {childProps.isAuthenticated ?
            [
              <Menu.Item
                name='toggleSidebar'
                active={activeItem === 'toggleSidebar'}
                onClick={(e, { name })=> {
                  childProps.setSidebarVisible(!childProps.sidebarVisible )
                }}>
                <Icon name='sidebar'/>
              </Menu.Item>,
              <Dropdown
                icon='folder' item >
                <Dropdown.Menu>
                  <Dropdown.Item
                    name='production'
                    active={ddActiveItem === 'schedule'}
                    onClick={(e, { name }) => {
                      //  e.stopPropagation()
                      childProps.setState({ ddActiveItem: name })
                      childProps.setSidebarVisible(true)
                    }}
                  >
                    <span id='ddProduction' className='text'>Production</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    name='purchasing'
                    active={ddActiveItem === 'purchasing'}
                    onClick={(e, { name }) => {
                      //  e.stopPropagation()
                      childProps.setState({ ddActiveItem: name })
                      childProps.setSidebarVisible(true)
                    }}
                  >
                    <span id='ddPurchasing' className='text'>Purchasing</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>,
              <Menu.Item
                name='accuracy'
                active={activeItem === 'accuracy'}
                onClick={(e, { name })=> {
                  childProps.setState({ activeItem: name })
                  childProps.setSidebarVisible(false)

                }}>
                <Icon name='heartbeat'/>
                <span className='text'>Accuracy</span>
              </Menu.Item>,
              <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={(e, { name })=> {
                    childProps.setState({ activeItem: name })
                     childProps.setSidebarVisible(false)
                    childProps.handleLogout()
                  }}>
                  <Icon name='block layout'/>
                  <span className='text'>Logout&nbsp;&nbsp;&nbsp;</span>
                </Menu.Item>
              </Menu.Menu>
            ]
            :
            [
              <Menu.Item
                name='signup'
                active={activeItem === 'signup'}
                onClick={(e, { name }) => {
                  childProps.setState({ activeItem: name })
                  history.push('/signup')
                }} >
                <Icon name='add user'/>Signup
              </Menu.Item>,
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={(e, { name }) => {
                  childProps.setState({ activeItem: name })
                  history.push('/login')
                }} >
                <Icon name='mail forward'/>Login
              </Menu.Item>
            ]

          }
        </Menu>
    )
  }
}
export default withRouter(TopMenu)

