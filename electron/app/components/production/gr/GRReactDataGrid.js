//require('../../react-pivot/example/demo.css')
import React, { Component, PropTypes } from 'react';
import ReactDataGrid from 'react-datagrid';
require('../../../css/production/dg.global.css')
var sorty    = require('sorty')
var _ = require('lodash');
var joins = require('lodash-joins');

var rowIndex=0;

export default class GRReactDataGrid extends React.Component{
  static propTypes = {
    GenR: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      rcvJoin:this.props.GenR.rcvJoin,
      columns : [
//        { name: 'identity_column'},
//        { name: 'fpono'},
       { name: 'fpartno', title: 'Part Number', width: 220,style: { color: '#FB667A' },
              render: function(v){
                var ret;
                if('999'==v){
                  ret='';
                }else{
                  ret=v;
                }
                return ret;
              }},
       { name: 'fpacklist',title: 'Pack List#', width: 150,
              render: function(v){
                var ret;
                var val=v.trim();
                if(''==val){
                  ret='NO Packlist!';
                }else{
                  ret=v;
                }
                return ret;
              }},
       { name: 'ffrtcarr',title: 'Carrier', width: 200},
       { name: 'fqtyrecv',title: 'Qty', width: 70,
              render: function(v){
                var ret;
                if(999==v){
                  ret='';
                }else{
                  ret=v;
                }
                return ret;
              }},
       { name: 'fucost',title: 'Cost', width: 70,
              render: function(v){
                var ret;
                if(999.9==v){
                  ret='Total:';
                }else{
                  ret='$'+v;
                }
                return ret;
              }},
       { name: 'totCost',title: 'Total',/*textAlign: 'right',*/
              render: function(v){
                return '$' + v;
              }}
      ],
      SORT_INFO: [ { name: 'fpartno', dir: 'asc'}],
      sort:this.sort.bind(this) ,
      rowIndex:0    
    };

    if ('development'==process.env.NODE_ENV) {
//      console.log(`this.test = `);
  //    console.dir(this.test);
    }

  }
  handleSortChange(sortInfo){
    if ('development'==process.env.NODE_ENV) {
      console.log(`this = `);
      console.dir(this);
    }

    this.state.SORT_INFO = sortInfo
    this.props.GenR.rcvJoin = this.state.sort(this.props.GenR.rcvJoin);

    this.setState({})
  }
  handleColumnOrderChange(index, dropIndex){
    var col = columns[index]
    this.state.columns.splice(index, 1) //delete from index, 1 item
    this.state.columns.splice(dropIndex, 0, col)
    this.setState({})
  }
  rowStyle(data, props){
    if ('development'==process.env.NODE_ENV) {
      console.log(`data = `);
      console.dir(data);
      console.log(`props = `);
      console.dir(props);
      console.log(`rowIndex =${rowIndex}`);
    }
    var style = {}
    rowIndex++;
    if (rowIndex % 2 == 0){
//      style.background = '#2C3446';
      style.color='#666B85';
      style.background= '#323C50';
      style.fontWeight='bold';

    }else{
      style.color='#668B85';
      style.background= '#2C3446';
      style.fontWeight='bold';

    }
    return style
  }

  sort(arr){
    return sorty(this.state.SORT_INFO, arr)
  }
  render(){
    var whichTable;
        whichTable = 
        <ReactDataGrid idProperty="identity_column" 
        dataSource={this.props.GenR.rcvJoin} 
        style={{height: 350}}
        rowStyle={this.rowStyle.bind(this)}
        groupBy={['poRecv']}
        columns={this.state.columns} />   
     return ( <div> {whichTable}</div>);
  }

};

