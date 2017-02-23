import React, { Component } from 'react';

class PortfolioData extends Component {

  render() {

    const divStyle ={
      "marginTop" : "10px"
    }

    return (
      <div className="block" style={divStyle}>
        <h2>Portfolio</h2>
        <dl className="dl-horizontal">
          <dt>Cash</dt>
          <dd>{this.props.data.cash}</dd>
          <dt>Value</dt>
          <dd>{this.props.data.value}</dd>
          <dt>Total Value</dt>
          <dd>{this.props.data.total}</dd>
          <dt>Divinator Shares</dt>
          <dd>{this.props.data.shares['Divinator']}</dd>
          <dt>Black Coat Shares</dt>
          <dd>{this.props.data.shares['MacroHard']}</dd>
          <dt>MacroHard Shares</dt>
          <dd>{this.props.data.shares['Black Coat']}</dd>
        </dl>
      </div>
    );
  }
}

export default PortfolioData;
