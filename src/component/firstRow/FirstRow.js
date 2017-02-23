import React, { Component } from 'react';
import Portfolio from './portfolio/Portfolio';
import Operations from './operations/Operations';

class FirstRow extends Component {
  render() {
    return (
      <div className="row">
        <Portfolio portfolioData={this.props.portfolio} chartData={this.props.chartData}/>
        <Operations />
      </div>
    );
  }
}

export default FirstRow;
