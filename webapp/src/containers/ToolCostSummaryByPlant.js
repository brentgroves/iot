import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {  Grid,Container, Segment, Rail, Menu, Header, Icon } from 'semantic-ui-react'
import { Button, Form, Message } from 'semantic-ui-react'
import 'react-widgets/dist/css/react-widgets.css'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import LoaderButton from '../components/LoaderButton'
let jsreport = require('jsreport-browser-client-dist')
jsreport.serverUrl = 'http://localhost:5488'



Moment.locale('en')
momentLocalizer()


class ToolCostSummaryByPlant extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      step: 1,
      defStartDate: Moment().startOf('month').toDate(),
      defEndDate: Moment().toDate(),
      startDate: Moment().startOf('month'),
      endDate: new Moment(),
      plt2Checked: false,
      plt3Checked: false,
      plt5Checked: false,
      plt6Checked: false,
      plt7Checked: false,
      plt8Checked: false,
      plt9Checked: false,
      plt11Checked: false

    }

    // This binding is necessary to make `this` work in the callback
    this.handleOnResize = this.handleOnResize.bind(this)

    // This binding is necessary to make `this` work in the callback
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this)
    // This binding is necessary to make `this` work in the callback
    this.plt2Change = this.plt2Change.bind(this)
    this.plt3Change = this.plt3Change.bind(this)
    this.plt5Change = this.plt5Change.bind(this)
    this.plt6Change = this.plt6Change.bind(this)
    this.plt7Change = this.plt7Change.bind(this)
    this.plt8Change = this.plt8Change.bind(this)
    this.plt9Change = this.plt9Change.bind(this)
    this.plt11Change = this.plt11Change.bind(this)
  }

  

  /**
     * Set a new state with an increased counter
     */
  increaseCounter() {
    this.setState(Object.assign({}, this.state, {
      counter: this.state.counter + 1
    }))
  }


  validateForm() {
    return ((this.validateDate() === 'success') && (this.validatePlantList() === 'success'))
  }

  validatePlantList() {
    if (
      (this.state.plt2Checked === true) || (this.state.plt3Checked === true)
        || (this.state.plt5Checked === true) || (this.state.plt6Checked === true)
        || (this.state.plt7Checked === true) || (this.state.plt8Checked === true)
        || (this.state.plt9Checked === true) || (this.state.plt11Checked === true)
    ) {
      return 'success'
    }
    return 'error'
  }

  validateDate() {
    if (
      (undefined === this.state.startDate) || (undefined === this.state.endDate)
        || (this.state.startDate === '') || (this.state.endDate === '')
    ) {
      return 'error'
    }
    // return true if end date is greater than start date

    //   var startDate = Moment(this.state.startDate);    
    if (!this.state.startDate.isValid()) {
      return 'error'
    }

    //   var endDate = Moment(this.state.endDate);    
    if (!this.state.endDate.isValid()) {
      return 'error'
    }

    if (!this.state.endDate.isAfter(this.state.startDate)) {
      return 'error'
    }
    return 'success'
  }

  validateEndDate() {
    if (undefined === this.state.endDate) {
      return 'error'
    }
    // return true if end date is greater than start date

    let date = Moment(this.state.endDate)
    if (!date.isValid()) {
      return 'error'
    }
    return 'success'
  }


  handleStartDateChange(value) {
    let newDate = new Moment(value)
    if (newDate.isValid()) {
      this.setState({ startDate: newDate })
    } else {
      this.setState({ startDate: '' })
    }
  }

  handleEndDateChange(value) {
    let newDate = new Moment(value)
    if (newDate.isValid()) {
      this.setState({ endDate: newDate })
    } else {
      this.setState({ endDate: '' })
    }
  }


  handleSubmit = async event => {
    event.preventDefault()
    this.setState({ isLoading: true })
    try {
      // add custom headers to ajax calls
      jsreport.headers.Authorization = 'Basic ' + btoa('admin:password')
      /*
      var request = {
         template: { 
              name: 'WorkSumTransactions',
          },
          data:{
            "dtStart": "01-1-2017 00:00:00",
            "dtEnd": "01-12-2017 23:15:10",
            "partNumber":"M0009326"
          }
      };

      //display report in the new tab
      jsreport.render('_blank', request);
      */
      let dtStart = this.state.startDate.format('MM-DD-YYYY h:mm:ss')


      let dtEnd = this.state.endDate.format('MM-DD-YYYY h:mm:ss')
      // var dtStart=this.startDate.format('MM-DD-YYYY HH:MM:SS');
      //
      //
      // https://github.com/tomkp/react-split-pane/issues/52
      let request2 = {
        template: {
          name: 'HtmlToBrowserClient'
        },
        data: {
          dtStart: '11-1-2017 00:00:00',
          dtEnd: '11-28-2017 23:15:10',
          plantList: ',',
          rptName: 'WorkSumByPlant'
        }
      }

      request2.data.dtStart = dtStart
      request2.data.dtEnd = dtEnd
      request2.data.plantList = ','
      if (this.state.plt2Checked === true) {
        request2.data.plantList += '2,'
      }
      if (this.state.plt3Checked === true) {
        request2.data.plantList += '3,'
      }
      if (this.state.plt5Checked === true) {
        request2.data.plantList += '5,'
      }
      if (this.state.plt6Checked === true) {
        request2.data.plantList += '6,'
      }
      if (this.state.plt7Checked === true) {
        request2.data.plantList += '7,'
      }
      if (this.state.plt8Checked === true) {
        request2.data.plantList += '8,'
      }
      if (this.state.plt9Checked === true) {
        request2.data.plantList += '9,'
      }
      if (this.state.plt11Checked === true) {
        request2.data.plantList += '11,'
      }


      let self = this

      jsreport.render('detail', request2)

      setTimeout(function () {
        //        self.props.setRptStep(2); 
        let detail = document.getElementById('detail')
        let childNodes = detail.childNodes
        if (childNodes.length !== 0) {
          self.setState({ isLoading: false })

          self.props.setRptStep(2)
        }
      }, 3000)
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  handleOnResize = (event) => {
    let detail = document.getElementById('detail')
    let pane = detail.parentElement.parentElement
    let splitPane = pane.parentElement

    let splitPaneHeight = splitPane.clientHeight
    let splitPaneWidth = splitPane.clientWidth
    detail.height = splitPaneHeight
    detail.width = splitPaneWidth
  }


  plt2Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt2Checked: event.target.checked
    })
  }

  plt3Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt3Checked: event.target.checked
    })
  }
  plt5Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt5Checked: event.target.checked
    })
  }
  plt6Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt6Checked: event.target.checked
    })
  }
  plt7Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt7Checked: event.target.checked
    })
  }
  plt8Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt8Checked: event.target.checked
    })
  }
  plt9Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt9Checked: event.target.checked
    })
  }
  plt11Change = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt11Checked: event.target.checked
    })
  }

  pltAllChange = (event) => {
    //    this.setState({ checkboxChecked: evt.target.checked });
    this.setState({
      plt2Checked: event.target.checked,
      plt3Checked: event.target.checked,
      plt5Checked: event.target.checked,
      plt6Checked: event.target.checked,
      plt7Checked: event.target.checked,
      plt8Checked: event.target.checked,
      plt9Checked: event.target.checked,
      plt11Checked: event.target.checked

    })
  }
  /* Dennis 1 Nov 2017 - 28 Nov  1 Sep - 28 Nov */
  /* Nancy for year */

  render() {
    let divStyle = {
      width: '90%',
      height: '100%',
      minHeight: '100%'
      //      width: '100%'
    }
    return (

  <Grid >

    <Grid.Row>
      <Grid.Column width={3}>
      </Grid.Column>
      <Grid.Column width={10}>
                    &nbsp;<br />&nbsp;

        <Segment>
          <Header as='h2'>
            <Icon name='plug' />
            <Header.Content>
              Tool Cost Summary
            </Header.Content>
          </Header>      
          <p><strong>Description:</strong>{' '}This report sums all of the issues from the tool bosses and crib for a part number for a specified date range and department(s).  It also displays the current M2M Job Number, pieces produced, value added sales, total and cunsumable tool costs as well as a Tool Cost / Value Add Sales percentage.</p>
          <p><strong>Start:</strong>{' '} </p>
                        <DateTimePicker
                          onChange={this.handleStartDateChange}
                          defaultValue={ this.state.defStartDate}
                        />
          <p><strong>End:</strong>{' '} </p>

                        <DateTimePicker
                          onChange={this.handleEndDateChange}
                          defaultValue={this.state.defEndDate}
                        />
      <Form >
  
</Form>

        </Segment>
      </Grid.Column>
      <Grid.Column width={3}>
      </Grid.Column>
    </Grid.Row>


  </Grid>


      )
  }
}

export default withRouter(ToolCostSummaryByPlant);


 