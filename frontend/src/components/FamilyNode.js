import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Container } from "reactstrap";
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

  render() {
    return (
      <Container>
      <Card>
        <CardBody>
        <CardTitle tag="h5">{this.getFirstName()}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{this.getLastName()}</CardSubtitle>
        </CardBody>
      </Card>
      </Container>
     
    );
  }

}