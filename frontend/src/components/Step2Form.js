import React, { Component } from "react";
import {  } from "reactstrap";

// dont forget to import stuff from reactstrap when u use them
export default class Step2Form extends Component {
  render() {

    return (
      <div>

      <h1>{this.props.heading}</h1>
      <h2>{this.props.subtitle}</h2>

      </div>
    );
  }

}