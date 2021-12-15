import React, { Component } from "react";
import { Card, CardBody, CardTitle, Button, CardImg } from "reactstrap";
import '../App.css';

// dont forget to import stuff from reactstrap when u use them
export default class FamilyNode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      node: this.props.node,

    };
  }

  getFirstName = () => {
    if (this.state.node) {
      return this.state.node.firstName;
    } else {
      return "FirstName"
    }
  }

  getLastName = () => {
    if (this.state.node) {
      return this.state.node.lastName;
    } else {
      return "LastName"
    }
  }

  renderImage = () => {
    let gen = this.state.node.gender;
    if (gen==="female") {
      return (
        <div>
        <CardImg className="pt-3 pb-1 px-5"  width="65%" src="female.png" />
        </div>
      );
    } else {
      return (
        <div>
          <CardImg className="pt-3 pb-1 px-5" width="65%" src="male.png" />
        </div>
      );
    }
  }

  render() {
    return (
      <Card style={{width:"200px", height:"200px"}}>
        {this.renderImage()}
        <CardBody>
          <CardTitle tag="h6"> {this.state.node.firstName}   {this.state.node.lastName} </CardTitle> 
        
        </CardBody>
      </Card>
   
     
    );
  }

}