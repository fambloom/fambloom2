import React, { Component } from "react";
import SignUpForm from "../components/SignUpForm";
import {  } from "reactstrap";

// dont forget to import stuff from reactstrap when u use them
export default class SignUpJoin extends Component {
  render() {

    return (
      <div>
        <SignUpForm subtitle="to Join an existing family tree."/>
      </div>
    );
  }

}