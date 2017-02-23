import React, { Component } from 'react';
import Services from './services/Services';

class SecondRow extends Component {

  render() {
    const divStyle = {
      "marginTop" : "10px"
    };

    return (
      <div className="row" style={divStyle}>
        <Services/>
      </div>
    );
  }
}

export default SecondRow;
