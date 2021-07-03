import React, { Component } from "react";
import {  } from "reactstrap";

// dont forget to import stuff from reactstrap when u use them
export default class SignUpForm extends Component {
  render() {

    return (
      <div>

      <h1>Sign Up</h1>
      <h2>{this.props.subtitle}</h2>

      </div>
    );
  }

}