import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label,
} from "reactstrap";
import axios from "axios";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      newItem: this.props.newItem,
      parent: this.props.parent,
      relationship: this.props.relationship,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "gender") {
      value = value.toLowerCase();
    }
    const newItem = { ...this.state.newItem, [name]: value };

    this.setState({ newItem });
  };

  render() {
    const { toggle, onSave, onParentSave } = this.props;

    return ( <div>
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Person</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={this.state.newItem.firstName}
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={this.state.newItem.lastName}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
          <FormGroup>
              <Label for="gender">Gender</Label>
                <Input type="radio" id="gender" name="gender"
                  value="male"
                  onChange={this.handleChange}
                  placeholder="Enter gender"/> Male 
               <Input type="radio" id="gender" name="gender"
                  value="female"
                  onChange={this.handleChange}
                  placeholder="Enter gender"/> Female
            </FormGroup> 
            <FormGroup>
              <Label for="bio">Biography</Label>
              <Input
                type="text"
                id="bio"
                name="bio"
                value={this.state.newItem.bio}
                onChange={this.handleChange}
                placeholder="Enter biography"
              />
            </FormGroup>
            <FormGroup>
              <Label for="bio">BirthPlace</Label>
              <Input
                type="text"
                id="birthPlace"
                name="birthPlace"
                value={this.state.newItem.birthPlace}
                onChange={this.handleChange}
                placeholder="Enter birth place"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem, this.state.newItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal> </div>
    );
  }
}