import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
class Rows extends Component{

    render(){
      
var open = new Date(this.props.data.open);
var close = new Date(this.props.data.close);
        return(
            <tr>
                <td>{this.props.data.host}</td>
                <td><a href={this.props.data.url}>{this.props.data.url.substring(0,50)}</a></td>
                <td>{this.props.data.time} sec</td>
                <td>{open.toString()}</td>
                <td>{close.toString()}</td>
                </tr>
        );
    }
}
class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            topcount:[],
            toptime:[],
            bigdata:[]
        };
    }
    componentWillMount(){
        axios.get(`http://infoeducatie-web-open/topcount`)
        .then(res => {
          this.setState({ topcount:res.data });
        });
        axios.get(`http://infoeducatie-web-open/toptime`)
        .then(res => {
          this.setState({ toptime:res.data });
        });
        axios.get(`http://infoeducatie-web-open/bigdata`)
        .then(res => {
          this.setState({ bigdata:res.data });
        });
    }
    render() {
        var labeltime=[];
        var valuetime=[];
        this.state.toptime.forEach(element => {
            labeltime.push(element.host);
            valuetime.push(element.time);
        });
        var labelcount=[];
        var valuecount=[];
        this.state.topcount.forEach(element => {
            labelcount.push(element.host);
            valuecount.push(element.count);
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
        var row=[];
        this.state.bigdata.forEach((data,key)=>{
            row.push(<Rows data={data} key={key}/>)
        });
        return (
            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Top 5 time on website</h2>
                        <Pie data={datatime} />
                    </div>
                    <div className="col-sm-6">
                        <h2>Top 5 visits on website</h2>
                        <Pie data={datecount} />
                    </div>
                </div>
         
                    <div className="table-responsive">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th>Host</th>
                                    <th>URL</th>
                                    <th>Elapsed Time</th>
                                    <th>Open URL</th>
                                    <th>Close URL</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {row}
                                    </tbody>
                        </table>
                        </div>
                    
            </div>
        );
    }
}
if (document.getElementById('react')) {
    ReactDOM.render(<Main />, document.getElementById('react'));
}
