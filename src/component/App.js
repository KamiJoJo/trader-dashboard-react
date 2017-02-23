import React, { Component } from 'react';
import EventBus from 'vertx3-eventbus-client';
import PortfolioService from '../extra_libs/portfolio_service-proxy';
import FirstRow from './firstRow/FirstRow';
import SecondRow from './secondRow/SecondRow';
import ThirdRow from './thirdRow/ThirdRow';

const initialState = {
  quotes : {
    divinator: 0,
    blackcoat: 0,
    macrohard: 0,
    index: 0
  },
  portfolio : {
    cash: 0,
    shares:{
      'Divinator' : 0,
      'MacroHard' : 0,
      'Black Coat' : 0
    },
    value : 0,
    total : 0
  },
  circuits : {}
};

class App extends Component {

  constructor(){
    super();
    this.state = {};
    this.eventbus = null;
    this.service = null;
  }

  componentWillMount(){
    this.setState(initialState);
  }

  componentDidMount(){
    //Set EventBus
    this.eventbus = new EventBus('/eventbus');

    const eventbus = this.eventbus;
    const self = this;

    //timer....
    eventbus.onopen = function(){

      eventbus.registerHandler('market', function (error, message) {
        console.log('received a message on shares ' + JSON.stringify(message));
        self.handleStockUpdate(message.body);
      });

      self.service = new PortfolioService(eventbus, "service.portfolio");
      self.updatePortfolio();

      //Eventbus for circuits breaker
      eventbus.registerHandler('vertx.circuit-breaker', function (error, message) {
        let name = message.body.name;

        // console.log('### check cuicuits ###');
        // console.log('Message Body Name : ' + name);
        // console.log(self.state.circuits);

        if(self.state.circuits[name] === undefined){
          self.insertNewCircuitBreaker(name, message.body);
        }else{
          self.updateCircuitBreaker(name, message.body);
        }
      });
    }

    //Reload updatePortfolio
    setInterval(function(){
      self.updatePortfolio();
    }, 5000);
  }

  handleStockUpdate(quote){
    let self = this;
    let price = quote.bid;
    let previousState = self.state;
    if (quote.name === "Divinator") {
      previousState.quotes.divinator = price;
      // quotes.divinator = price;
    } else if (quote.name === "Black Coat") {
      previousState.quotes.blackcoat = price;
      // quotes.blackcoat = price;
    } else {
      previousState.quotes.macrohard = price;
    }
    self.setState(previousState);
  }

  updatePortfolio() {
    let self = this;
    if (!self.service) {
      console.log("Portfolio Service not available");
    } else {
      self.service.getPortfolio(function (err, res) {

        let previousState = self.state;

        if (err) {
          console.log("Error while retrieving the portfolio", err);
        } else {
          //Set Portfolio State
          let divinator = res.shares["Divinator"];
          let macrohard = res.shares["MacroHard"];
          let blackcoat = res.shares["Black Coat"];

          if(!divinator) res.shares["Divinator"] = 0;
          if(!macrohard) res.shares["MacroHard"] = 0;
          if(!blackcoat) res.shares["Black Coat"] = 0;

          self.service.evaluate(function (err, result) {
            if (err) {
              console.log("Cannot evaluate portfolio", err);
            } else {
              res.value = result;
              res.total = res.cash + result;
            }
            previousState.portfolio = res;
            self.setState(previousState);
          });
        }
      });
    }
  }

  insertNewCircuitBreaker(name, circuit) {
    let self = this;
    let previousState = self.state;
    previousState.circuits.name = circuit;
    self.setState(previousState);
  }

  updateCircuitBreaker(name, circuit) {
    let self = this;
    let previousState = self.state;
    previousState.circuits.name = circuit;
    self.setState(previousState);
  }

  //Set Interval....
  render() {
    return (
      <div>
        <FirstRow portfolio={this.state.portfolio} chartData={this.state.quotes}/>
        <SecondRow/>
        <ThirdRow circuits={this.state.circuits}/>
      </div>
    );
  }
}

export default App;
