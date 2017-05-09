import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import oceanIgnore from'fusioncharts/themes/fusioncharts.theme.ocean';
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
            caption: "Harry's SuperMart",
            subCaption: "Top 5 stores in last month by revenue",
            numberPrefix: "$",
            theme: "ocean"
        },
        data:[
          {
              label: "Bakersfield Central",
              value: "880000"
          },
          {
              label: "Garden Groove harbour",
              value: "730000"
          },
          {
              label: "Los Angeles Topanga",
              value: "590000"
          },
          {
              label: "Compton-Rancho Dom",
              value: "520000"
          },
          {
              label: "Daly City Serramonte",
              value: "330000"
          }
        ]
      }
    };
  }

  render() {
  var fusionChart;
  var myDataSource = this.state.myDataSource;
  var revenueChartConfigs = {
    id: "revenue-chart",
      renderAt: "chart-container",
    type: "column2d",
    width:600,
      height: 400,
      dataFormat: "json",
      dataSource: myDataSource
  };

  fusionChart =
    <ReactFC {...revenueChartConfigs} />
  if ('development'==process.env.NODE_ENV) {
//    console.log('publish fan->fanon');
  }

    return (
      <ReactFC {...revenueChartConfigs} />
    );
  }
}



