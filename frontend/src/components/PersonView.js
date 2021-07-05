import React, { Component } from "react";
import history from '../history';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import PersonViewModal from './PersonViewModal';
import AddModal from './Modal';

class PersonView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      treeCode: history.location.state.treeCode,
      peopleList: [],
      addmodal: false,
      modal: false,
      activeItem: {
        firstName: "",
        lastName: "",
        gender: "",
        bio: "",
        birthPlace: "",
        parents: [],
        siblings: [],
        spouses: [],
        children: [],
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshPage() {
    window.location.reload(false);
  }

  refreshList = () => {
    axios
      .get(`/api/person/`)
      .then((res) => this.setState({ peopleList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggle1 = () => {
    this.setState({ addModal: !this.state.addModal });
  };

  handleSubmit1 = (item) => {
    this.toggle1();

    if (item.id) {
      axios
        .put(`/api/person/${item.id}/`, item, )
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post(`/api/person/`, item, )
      .then((res) => {console.log(res.data); this.refreshList(); })
      .catch(err => { console.log(err) });
  };

  
  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/person/${item.id}/`, item, )
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post(`/api/person/`, item, )
      .then((res) => {console.log(res.data); this.refreshList(); })
      .catch(err => { console.log(err) });
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/person/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      birthPlace: "",
      parents: [],
      spouse: [],
      siblings: [],
      children: [],
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  addItem = () => {
    const item = {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      birthPlace: "",
      parents: [],
      spouse: [],
      siblings: [],
      children: [],
    };

    this.setState({ activeItem: item, addModal: !this.state.addModal });
  };


  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.peopleList

    // MIRABELA EDIT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE FOR TREECODE
    return newItems.filter(item => item.tree == 'A').map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className="nav-link"
          title={item.bio} >
          {item.firstName} {item.lastName}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}>
            More
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        
        <h1 className=" text-uppercase text-center my-4">Fambloom App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            <button className="btn btn-primary mx-auto" onClick={this.addItem}>
                  Add Person
                </button>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <PersonViewModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
         {this.state.addModal ? (
          <AddModal
            activeItem={this.state.activeItem}
            toggle={this.toggle1}
            onSave={this.handleSubmit1}
          />
        ) : null}
      </main>
    );
  }
}

export default PersonView;