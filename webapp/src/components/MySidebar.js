import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Message, Dropdown, Sidebar, Segment, Button, Image, Header, Accordion, Icon, List, Menu } from 'semantic-ui-react'

// import "./index.css";
import '../App.css'
import Routes from '../Routes'
class MySidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sbActiveItem: 'tcsbyplant',

    }

  }

  render() {


    const {sbActiveItem} = this.state;
    const {childProps,history} = this.props;

    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }    
    return (
      <div style={divStyle}>
<Sidebar childProps={childProps} />
        {ddActiveItem === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={childProps.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  childProps.setState({ sbActiveItem: name })
                  history.push('/tcsbyplant')
                  childProps.setSidebarVisible(false)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  history.push('/tcsbyplant')
                  childProps.setSidebarVisible(false)
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={childProps.sidebarVisible} style={divStyle} >
                <Routes childProps={childProps} />
              <div id='detail' style={divStyle} className='container fill mycontainer' />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} style={divStyle} attached='bottom'>
            <Sidebar as={Menu} style={divStyle} animation='push' width='thin' visible={childProps.sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplantXLS'
                active={activeItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  history.push('/tcsbyplant')
                  childProps.setSidebarVisible(false)

                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
              <Menu.Item
                name='tcsbyplant'
                active={activeItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  this.setState({ sbActiveItem: name })
                  history.push('/tcsbyplant')
                  childProps.setSidebarVisible(false)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>

            </Sidebar>
            <Sidebar.Pusher dimmed={childProps.sidebarVisible} style={divStyle} >
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
export default withRouter(MySidebar)

