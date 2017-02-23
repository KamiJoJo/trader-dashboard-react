import React, { Component } from 'react';
import PortfolioData from './PortfolioData';
import PortfolioChart from './PortfolioChart';


class Portfolio extends Component {
  render() {
    return (
      <div className="col-md-6">
        <PortfolioData data={this.props.portfolioData}/>
        <PortfolioChart data={this.props.chartData}/>
      </div>
    );
  }
}

export default Portfolio;
