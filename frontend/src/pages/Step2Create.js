import React, { Component } from "react";
import Step2Form from "../components/Step2Form";
import {  } from "reactstrap";

// dont forget to import stuff from reactstrap when u use them
export default class Step2Create extends Component {
  render() {

    return (
      <div>
        <Step2Form title="Create" subtitle="a new family tree."/>
      </div>
    );
  }

}