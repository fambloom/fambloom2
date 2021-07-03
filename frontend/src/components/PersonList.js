import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import * as settings from '../settings';


class PersonList extends Component {
  
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
        parents: "",
        spouse: "",
        siblings: "",
        children: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${settings.API_SERVER}/api/person/`)
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
        .put(`${settings.API_SERVER}/api/person/${item.id}/`, item, )
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post(`${settings.API_SERVER}/api/person/`, item, )
      .then((res) => {console.log(res.data); this.refreshList(); })
      .catch(err => { console.log(err) });
  };

  handleDelete = (item) => {
    axios
      .delete(`${settings.API_SERVER}/api/person/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      birthPlace: "",
      parents: "",
      spouse: "",
      siblings: "",
      children: "",
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
          {item.firstName} {item.lastName} is {item.gender} from {item.birthPlace}
        </span>
        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}>
            Edit 
          </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Fambloom app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>
                  Add Person
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default PersonList;