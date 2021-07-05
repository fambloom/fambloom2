import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label,
} from "reactstrap";

export default class TreeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }
  

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return ( <div>
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tree</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="treeName">Tree Name</Label>
              <Input
                type="text"
                id="treeName"
                name="treeName"
                value={this.state.activeItem.treeName}
                onChange={this.handleChange}
                placeholder="Enter tree name"
              />
            </FormGroup>
            <FormGroup>
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