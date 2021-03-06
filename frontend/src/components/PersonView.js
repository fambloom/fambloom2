import React, { Component } from "react";
import history from '../history';

import { Container, Card, CardImg, CardBody, CardColumns, CardTitle, Row, Button } from "reactstrap";
import axios from "axios";
import PersonViewModal from './PersonViewModal';
import AddModal from './Modal';
import EditModal from './Modal';


class PersonView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      treeCode: history.location.state.treeCode,
      treeName: history.location.state.treeName,
      peopleList: [],
      addModal: false,
      editmodal: false,
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

  toggle2 = () => {
    this.setState({ editModal: !this.state.editModal });
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

  handleSubmit2= (item) => {
    this.toggle2();

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
      tree: this.state.treeCode,
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



  relationships = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editPerson = (item) => {
    this.setState({ activeItem: item, editModal: !this.state.editModal });
  };


  renderImage = (item) => {
    let gen = item.gender;
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

  renderPeople = (item) => {
    const newItems = this.state.peopleList;
    return newItems.filter(person => person.tree === item).map((item) => (
      <Card style={{width:"225px"}}>
        {this.renderImage(item)}
        <CardBody>
          <CardTitle tag="h5"> {item.firstName}   {item.lastName} </CardTitle> 
        
          <Button className="btn btn-info mr-1 btn-sm" onClick={() => this.relationships(item)}>
            Info
          </Button>
          <Button className="btn btn-secondary mr-1 btn-sm" onClick={ () => this.editPerson(item)}>
            Edit
          </Button>
          <Button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(item)}>
            Delete
          </Button>
        
        </CardBody>
      </Card>
    ));
  }


  // renderItems = (item) => {
  //   const newItems = this.state.peopleList;

  //   return newItems.filter(person => person.tree == item).map((item) => (
  //     <li
  //       key={item.id}
  //       className="list-group-item d-flex justify-content-between align-items-center"
  //     >
  //       <span
  //         className="nav-link"
  //         title={item.bio} >
  //         {item.firstName} {item.lastName}
  //       </span>
  //       <span>
  //         <button className="btn btn-primary mr-1" onClick={() => this.relationships(item)}>
  //           Info
  //         </button>
  //         <button className="btn btn-secondary mr-1" onClick={ () => this.editPerson(item)}>
  //           Edit
  //         </button>
  //         <button className="btn btn-danger" onClick={() => this.handleDelete(item)}>
  //           Delete
  //         </button>
  //       </span>
  //     </li>
  //   ));
  // };

  render() {
    return (
      <div>
        <Container fluid={true}>
        <Row  style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          
          <img className="float-left" width="80px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
          <h2 body className="text-center">Tree: {this.state.treeName}</h2>
          <img  className="float-right" width="80px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
          
         </Row>
         <hr></hr>
         <Button className="btn btn-success mx-auto" onClick={ () => this.addItem()}>Add Person</Button>
        
         <CardColumns className="mt-4">
           {this.renderPeople(this.state.treeCode)}
         </CardColumns>
        </Container>


        {/* <Row style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
          <h1 body className="text-center">Tree: {this.state.treeName}</h1>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
      </Row>
     
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            <button className="btn btn-success mx-auto" onClick={ () => this.addItem()}>
                  Add Person
                </button>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems(this.state.treeCode)}
              </ul>
            </div>
          </div>
        </div> */}
        {this.state.modal ? (
          <PersonViewModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            treeCode={this.state.treeCode}
          />
        ) : null}
         {this.state.addModal ? (
          <AddModal
            activeItem={this.state.activeItem}
            toggle={this.toggle1}
            onSave={this.handleSubmit1}
          />
        ) : null}
        {this.state.editModal ? (
          <EditModal
            activeItem={this.state.activeItem}
            toggle={this.toggle2}
            onSave={this.handleSubmit2}
          />
        ) : null}
     </div>
    );
  }
}

export default PersonView;