import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import '../App.css';

// dont forget to import stuff from reactstrap when u use them
export default class FamilyNode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      node: this.props.node,

    };
  }

  

  render() {
    return (
      <div>
      <Card>
        <CardBody>
        <CardTitle tag="h5">{this.state.node.firstName}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{this.state.node.lastName}</CardSubtitle>
        </CardBody>
      </Card>
      </div>
    );
  }

}