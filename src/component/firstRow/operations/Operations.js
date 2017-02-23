import React, { Component } from 'react';

class Operations extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){

    var _this = this;
		setInterval(function(){
      _this.getOperations();
		}, 5000);

  }

  getOperations(){
    fetch('/operations', {})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({operations : responseData});
    })
    .catch((error) => {
      console.error('Error fetching and parsing data', error);
    });
  }

  render() {

    const divStyle ={
      "marginTop" : "10px"
    }

    const tableBody = function(){
      console.log('test...');
      console.log(this.state.operations);
      let self = this;
      if(self.state.operations !== undefined){

        if(self.state.operations.message){
          return (
            <tr>
              <td colSpan={3}>{self.state.operations.message}</td>
            </tr>
          );
        }else{
          self.state.operations.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.action}</td>
                <td>{data.amount}</td>
                <td>{data.company}</td>
              </tr>
            );
          });
        }
      }
    }

    return (
        <div className="col-md-6">
          <div className="block" style={divStyle}>
            <h2>Last operations</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Action</th>
                    <th>Amount</th>
                    <th>Company</th>
                </tr>
                </thead>
                <tbody>
                  {tableBody}
                </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

export default Operations;
