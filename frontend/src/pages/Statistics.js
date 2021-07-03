import React, { Component } from "react";
import {  } from "reactstrap";
import { VictoryPie } from 'victory';

// Example data
// backend will pass in array of two numbers: # of female, # of male.
const data = [40, 60]

// dont forget to import stuff from reactstrap when u use them
export default class Statistics extends Component {
  render() {

    return (
      <div>

      <h1>Statistics</h1>

      <h2>{data[0]} are female</h2>
      <h2>{data[1]} are male</h2>

      </div>
    );
  }

}