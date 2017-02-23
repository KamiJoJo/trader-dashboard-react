import React, { Component } from 'react';

class Services extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    let self = this;
		setInterval(function(){
      self.getServices();
		}, 5000);
  }

  getServices(){
    let self = this;
    fetch('/discovery', {})
    .then((response) => response.json())
    .then((responseData) => {
      self.setState({services : responseData});
    })
    .catch((error) => {
      console.error('Error fetching and parsing data', error);
    });
  }

  render() {

    const divStyle={
      "paddingRight" : 0
    };

    const insertMetaDatas = function(metadata){
      for(let key in metadata){
        return (
          <li> {key} = {metadata[key]} </li>
        );
      }
    };

    const insertServiceMetadata = function(metadata){
      return (
        <ul>
          {insertMetaDatas(metadata)}
        </ul>
      );
    };

    const tableDatas = (this.state.services == undefined) ? '' : Object.keys(this.state.services).map(key => {
        let value = this.state.services[key];
          return (
            <tr key={value.name} id={value.name}>
              <td>{value.name}</td>
              <td className="status">{value.status}</td>
              <td className="type">{value.type}</td>
              <td className="registration">{value.registration}</td>
              <td className="location">{insertServiceMetadata(value.location)}</td>
              <td className="location">{insertServiceMetadata(value.metadata)}</td>
            </tr>
          );

    });

    return (
      <div className="col-md-12" style={divStyle}>
        <div className="block">
          <h2>Available services</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Registration Id</th>
                <th>Location</th>
                <th>Metadata</th>
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

export default Services;
