import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
class App extends Component {
  constructor(props){
    super(props);
    this.state=({
      topcount:[],
    toptime:[]
    });
  }
  componentDidMount(){
    axios.get(`http://infoeducatie-web-open/api/topcount/dccd73ac1d46983e87ec42f1a66ba54551e6eb823872247e91c4af857770`)
    .then(res => {
      this.setState({ topcount:res.data });
    });
    axios.get(`http://infoeducatie-web-open/api/toptime/dccd73ac1d46983e87ec42f1a66ba54551e6eb823872247e91c4af857770`)
    .then(res => {
      this.setState({ toptime:res.data });
    });
  }
  render() {
    var labeltime=[];
    var valuetime=[];
    this.state.toptime.forEach(element => {
        labeltime.push(element.host);
        alert(element.time);
        valuetime.push(element.time);
    });
    var labelcount=[];
    var valuecount=[];
    this.state.topcount.forEach(element => {
        labelcount.push(element.host);
        valuecount.push(element.count);
        console.log(element.host);
    });
    const datatime = {
        labels:labeltime,
        datasets: [{
            data: valuetime,
            backgroundColor: [
            '#d400e2',
            '#d77ee7',
            '#741a1a',
            '#dce543',
            '#FFEE56'
            ],
            hoverBackgroundColor: [
            '#d400e2',
            '#d77ee7',
            '#741a1a',
            '#dce543',
            '#FFEE56'
            ]
        }]
    };
    const datecount = {
        labels:labelcount,
        datasets: [{
            data: valuecount,
            backgroundColor: [
            '#d400e2',
            '#d77ee7',
            '#741a1a',
            '#dce543',
            '#FFEE56'
            ],
            hoverBackgroundColor: [
            '#d400e2',
            '#d77ee7',
            '#741a1a',
            '#dce543',
            '#FFEE56'
            ]
        }]
    };
    return (
      <div className="App">
              <h2>Top 5 visits on website</h2>
              <Pie data={datecount} />
              <h2>Top 5 time on website</h2>
              <Pie data={datatime} />    
      </div>
    );
  }
}

export default App;
