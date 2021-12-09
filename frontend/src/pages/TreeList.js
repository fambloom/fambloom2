import React, { Component } from "react";
import history from '../history';
import { withRouter } from 'react-router'


import Modal from "../components/TreeModal";
import axios from "axios";


class TreeList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      trees: [],
      activeItem: {
        treeName: '',
      },
      treeCode: '',
      treeName: '',
    };
  }

  componentDidMount() {
    this.renderTrees();
  }

  renderTrees = () => {
    axios
      .get(`/api/tree/`)
      .then((res) => this.setState({ trees: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  
  handleSubmit = (item) => {
    this.toggle();

    if (item.treeCode) {
      axios
        .put(`/api/tree/${item.treeCode}/`, item, )
        .then((res) => { this.renderTrees(); })
      return;
    }

    axios
      .post(`/api/tree/`, item, )
      .then((res) => { this.renderTrees(); })
      .catch(err => { console.log(err) });

  };

  gotoTree = (item) => {
    history.push('/persontreeview', {treeCode: item.treeCode, treeName: item.treeName})
  }
  

  handleDelete = (item) => {
    axios
      .delete(`/api/tree/${item.treeCode}/`)
      .then((res) => this.renderTrees());
  };

  createItem = () => {
    const item = {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      birthPlace: "",
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const newItems = this.state.trees
    return newItems.map((item) => (
      <li
        key={item.treeCode}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className="nav-link"
          title={item.bio} >
          {item.treeName}
        </span>
        <span>
        <button onClick={() => {this.gotoTree(item)}} className="btn btn-primary mr-2">Go</button>

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
         <h1 className=" text-center my-4">List of Trees</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
           
                <button className="btn btn-success mx-auto" onClick={this.createItem}>
                  Add Tree
                </button>
             
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

export default withRouter(TreeList);