import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import fintIgnore from'fusioncharts/themes/fusioncharts.theme.fint';
// Pass fusioncharts as a dependency of charts
charts(FusionCharts)


export default class Bulb extends Component {

  static propTypes = {
    Popper: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      myDataSource: {
        chart: {
          caption: "Temperature status of deep freezers",
          upperlimit: "-5",
          lowerlimit: "-60",
          captionPadding: "30",
          numberSuffix: "°C",
          showshadow: "0",
          showvalue: "1",
          valueFontSize: "16",

          //Placing value inside the gauge
          placeValuesInside: "1",

          //Theme
          theme: "fint"
        },
        colorrange: {
            color: [{
                minvalue: "-60",
                maxvalue: "-35",
                label: "Mission control,we have a situation!",
                code: "#ff0000"
            }, {
                minvalue: "-35",
                maxvalue: "-25",
                label: "Something is just  not right!",
                code: "#ff9900"
            }, {
                minvalue: "-25",
                maxvalue: "-5",
                label: "All well ahoy!",
                code: "#00ff00"
            }]
        },
        value: "-5"
      }
    };
  }

  render() {
  var fusionChart;
  var myDataSource = this.state.myDataSource;
  var bulbConfigs = {
    id: "myBulb",
      renderAt: "chart-container",
    type: "angulargauge",
    width:300,
      height: 300,
      dataFormat: "json",
      dataSource: myDataSource
  };

  if ('development'==process.env.NODE_ENV) {
//    console.log('publish fan->fanon');
  }

    return (
      <ReactFC {...bulbConfigs} />
    );
  }
}



