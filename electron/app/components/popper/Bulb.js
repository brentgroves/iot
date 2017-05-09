import React, { Component, PropTypes }  from 'react';
import ReactDOM from 'react-dom';
import fusioncharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import widgets from 'fusioncharts/fusioncharts.widgets';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';
import ReactFC from 'react-fusioncharts';

charts(FusionCharts);
theme(FusionCharts);
widgets(FusionCharts);


export default class Bulb extends Component {

  static propTypes = {
    Popper: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: {
        "chart": {
            "caption": "Customer Satisfaction Score",
            "subcaption": "Last week",
            "lowerLimit": "0",
            "upperLimit": "100",
            "lowerLimitDisplay": "Bad",
            "upperLimitDisplay": "Good",
            "showValue": "1",
            "valueBelowPivot": "1",
            "theme": "fint"
        },
        "colorRange": {
            "color": [
                {
                    "minValue": "0",
                    "maxValue": "50",
                    "code": "#e44a00"
                },
                {
                    "minValue": "50",
                    "maxValue": "75",
                    "code": "#f8bd19"
                },
                {
                    "minValue": "75",
                    "maxValue": "100",
                    "code": "#6baa01"
                }
            ]
        },
        "dials": {
            "dial": [{
                "value": "67"
            }]
        }
      }
    };
  }
  render() {
    var myDataSource = this.state.dataSource;
    var chartConfigs = {
        type: "angulargauge",
        className: "fc-angular", // ReactJS attribute-name for DOM classes
        dataFormat: "JSON",
        dataSource: myDataSource
    };

    if ('development'==process.env.NODE_ENV) {
    //    console.log('publish fan->fanon');
    }

    return (
      <ReactFC {...chartConfigs} />
    );
  }
}



