import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import update from 'react-addons-update';

const initialState = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      boardColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      label: "Divinator"
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      boardColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      label: "Black Coat"
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      fillColor: "rgba(80,90,180,0.2)",
      strokeColor: "rgba(80,90,180,1)",
      boardColor: "rgba(80,90,180,1)",
      pointColor: "rgba(80,90,180,1)",
      pointStrokeColor: "#fff",
      label: "MacroHard"
    }
  ]
};

class PortfolioChart extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.setState(initialState);
  }

  componentDidMount(){

    var _this = this;

    setInterval(function(){
      let oldDataSet = _this.state;
      let newLabels = oldDataSet.labels;
      let newDatasets = [];

      const dataKeys = ['divinator', 'blackcoat', 'macrohard'];

      //set labels
      newLabels = newLabels.slice(1);
      newLabels.push(newLabels[7] + 1);

      //set Datas
      oldDataSet.datasets.map((dataset, index) => {
        dataset.data = dataset.data.slice(1);
        dataset.data.push(_this.props.data[dataKeys[index]]);
        newDatasets.push(dataset);
      });
      _this.setState({labels : newLabels, datasets : newDatasets});

    }, 5000);
  }

  render() {

    const divStyle ={
      "marginTop" : "10px"
    }

    return (
      <div className="block" style={divStyle}>
        <Line data={this.state} width={400} height={255}/>
      </div>
    );
  }
}

export default PortfolioChart;
