import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "gender") {
      value = value.toLowerCase();
    }
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

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
                value={this.state.activeItem.firstName}
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
                value={this.state.activeItem.lastName}
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
            <FormGroup check inline className="mb-2">
              <Label className="mr-3" for="gender"check >Gender</Label><br></br>
                <Input type="radio" id="gender" name="gender"
                  value="male"
                  onChange={this.handleChange}
                  placeholder="Enter gender"/> {'  '}Male <br></br>
               <Input className="ml-2" type="radio" id="gender" name="gender"
                  value="female"
                  onChange={this.handleChange}
                  placeholder="Enter gender"/> {'  '} Female
            </FormGroup>  
          {/*   <FormGroup>
              <Label for="gender">Gender</Label>
                <Input type="select" id="gender" name="gender"
                  value={this.state.activeItem.gender}
                  onChange={this.handleChange}
                  placeholder="Enter gender">
                  <option>female</option>
                  <option>male</option>
                  <option>other</option>
                </Input>
            </FormGroup> */}
            <FormGroup>
              <Label for="bio">Biography</Label>
              <Input
                type="text"
                id="bio"
                name="bio"
                value={this.state.activeItem.bio}
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
                value={this.state.activeItem.birthPlace}
                onChange={this.handleChange}
                placeholder="Enter birth place"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal> </div>
    );
  }
}