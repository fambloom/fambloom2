import React, { Component } from "react";
import SignUpForm from "../components/SignUpForm";
import {  } from "reactstrap";


// dont forget to import stuff from reactstrap when u use them
export default class SignUpCreate extends Component {
  render() {

    return (
      <div>
        <SignUpForm subtitle="to Create a new family tree."/>
      </div>
    );
  }

}