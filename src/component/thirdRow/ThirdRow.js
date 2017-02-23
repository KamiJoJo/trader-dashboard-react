import React, { Component } from 'react';
import CircuitBreakers from './circuitBreakers/CircuitBreakers'
class ThirdRow extends Component {

  render() {
    const divStyle = {
      "marginTop" : "10px"
    };

    return (
      <div className="row" style={divStyle}>
        <CircuitBreakers circuits={this.props.circuits}/>
      </div>
    );
  }
}

export default ThirdRow;
