import React, { Component } from 'react';

class CircuitBreakers extends Component {

  render() {
    const divStyle = {
      "paddingRight" : 0
    };

    const insertState = (state) => {
      switch(state){
        case 'CLOSED' :
        return (<span className="label label-success">CLOSED</span>);
        case 'OPEN' :
        return (<span className="label label-danger">OPEN</span>);
        case 'HALF_OPEN' :
        return (<span className="label label-warning">HALF_OPEN</span>);
      }
    };

    const tableDatas = (this.props.circuits == undefined) ? '' : Object.keys(this.props.circuits).map(key => {
      let value = this.props.circuits[key];
      return (
        <tr key={key}>
          <td>{value.name}</td>
          <td className="state">{insertState(value.state)}</td>
          <td className="failures">{value.failures}</td>
        </tr>
      );
    });

    return (
      <div className="col-md-12" style={divStyle} id="cb">
        <div className="block">
          <h2>Circuit breakers</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Failures</th>
              </tr>
            </thead>
            <tbody>
              {tableDatas}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CircuitBreakers;
