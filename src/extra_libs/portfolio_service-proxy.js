/*
 * Copyright 2014 Red Hat, Inc.
 *
 * Red Hat licenses this file to you under the Apache License, version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License.  You may obtain a copy of the License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

  /**
 A service managing a portfolio.

 @class
  */
  let PortfolioService = function(eb, address) {

    let j_eb = eb;
    let j_address = address;
    let closed = false;
    let that = this;
    let convCharCollection = function(coll) {
      let ret = [];
      for (let i = 0;i < coll.length;i++) {
        ret.push(String.fromCharCode(coll[i]));
      }
      return ret;
    };

    /**

     @public
     @param resultHandler {function}
     */
    this.getPortfolio = function(resultHandler) {
      let __args = arguments;
      if (__args.length === 1 && typeof __args[0] === 'function') {
        if (closed) {
          throw new Error('Proxy is closed');
        }
        j_eb.send(j_address, {}, {"action":"getPortfolio"}, function(err, result) { __args[0](err, result &&result.body); });
        return;
      } else throw new TypeError('function invoked with invalid arguments');
    };

    /**

     @public
     @param amount {number}
     @param quote {Object}
     @param resultHandler {function}
     */
    this.buy = function(amount, quote, resultHandler) {
      let __args = arguments;
      if (__args.length === 3 && typeof __args[0] ==='number' && (typeof __args[1] === 'object' && __args[1] != null) && typeof __args[2] === 'function') {
        if (closed) {
          throw new Error('Proxy is closed');
        }
        j_eb.send(j_address, {"amount":__args[0], "quote":__args[1]}, {"action":"buy"}, function(err, result) { __args[2](err, result &&result.body); });
        return;
      } else throw new TypeError('function invoked with invalid arguments');
    };

    /**

     @public
     @param amount {number}
     @param quote {Object}
     @param resultHandler {function}
     */
    this.sell = function(amount, quote, resultHandler) {
      let __args = arguments;
      if (__args.length === 3 && typeof __args[0] ==='number' && (typeof __args[1] === 'object' && __args[1] != null) && typeof __args[2] === 'function') {
        if (closed) {
          throw new Error('Proxy is closed');
        }
        j_eb.send(j_address, {"amount":__args[0], "quote":__args[1]}, {"action":"sell"}, function(err, result) { __args[2](err, result &&result.body); });
        return;
      } else throw new TypeError('function invoked with invalid arguments');
    };

    /**

     @public
     @param resultHandler {function}
     */
    this.evaluate = function(resultHandler) {
      let __args = arguments;
      if (__args.length === 1 && typeof __args[0] === 'function') {
        if (closed) {
          throw new Error('Proxy is closed');
        }
        j_eb.send(j_address, {}, {"action":"evaluate"}, function(err, result) { __args[0](err, result &&result.body); });
        return;
      } else throw new TypeError('function invoked with invalid arguments');
    };

    /**

     @memberof module:vertx-workshop-portfolio-js/portfolio_service
     @param vertx {Vertx}
     @return {PortfolioService}
     */
    this.getProxy = function(vertx) {
      let __args = arguments;
      if (__args.length === 1 && typeof __args[0] === 'object' && __args[0]._jdel) {
        if (closed) {
          throw new Error('Proxy is closed');
        }
        j_eb.send(j_address, {"vertx":__args[0]}, {"action":"getProxy"});
        return;
      } else throw new TypeError('function invoked with invalid arguments');
    };


  };

export default PortfolioService;
