import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import PersonViewModal from './PersonViewModal';


class PersonView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      peopleList: [],
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

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.peopleList
    return newItems.map((item) => (
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
        <h1 className=" text-uppercase text-center my-4">Fambloom app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
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
      </main>
    );
  }
}

export default PersonView;