import React, { Component } from "react";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, NavItem,
} from "reactstrap";
import axios from "axios";
import AddPersonViewModal from './AddModal';

export default class PersonViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: this.props.activeItem,
      personDetail: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`/api/persondetail/${this.state.activeItem.id}`)
      .then((res) => this.setState({ personDetail: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
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

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/persondetail/${item.id}/`, item, )
        .then((res) => this.refreshList());
      return;
    }

    axios
      .post(`/api/persondetail/${item.id}`, item, )
      .then((res) => {console.log(res.data); this.refreshList(); })
      .catch(err => { console.log(err) });
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/persondetail/${item.id}/`)
      .then((res) => this.refreshList());
  };

  // returns array of parent/spouse/child IDs
//    familyMemberReformat(inputObject) {
// 	let result = inputObject.map(({ id }) => id);
//     return result;
// }

// familyMemberReformatTest(inputObject) {
// 	// let result = inputObject.map(({ id }) => id);
//   return ( )
// }

  printRelatives = (personDetail) => {

    const nullMessage = ["No one here yet."];
    let parents = null;
    if (personDetail.parents && personDetail.parents.length > 0) {
      parents = personDetail.parents.map( (p) => { 
        return (<div><li> {p.firstName} {p.lastName}</li>      
        <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
        Edit 
      </button>
      <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.activeItem)}>
        Delete
      </button>
      </div>
      )})
    } else {
        parents = nullMessage.map( (nullMessage) => { 
            return (<div><p>{nullMessage}</p>         
        <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
            Add 
        </button>
        </div>
        )})
     }
    let spouses = null;
    if (personDetail.spouses && personDetail.spouses.length > 0) {
      spouses = personDetail.spouses.map( (p) => { 
        return (<div><li> {p.firstName} {p.lastName}</li>
            <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
            Edit 
          </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.activeItem)}>
            Delete
          </button>
          </div>
          )})
    } else {
        spouses = nullMessage.map((nullMessage) => { 
            return (<div><p>{nullMessage}</p>         
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
            Add 
          </button>
        </div>
         )})
    }

    let children = null;
    if (personDetail.children && personDetail.children.length > 0) {
      children = personDetail.children.map( (p) => { 
        return (<div><li> {p.firstName} {p.lastName}</li>
            <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
            Edit 
          </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.activeItem)}>
            Delete
          </button>
          </div>
        )
      })
    } else {
        children = nullMessage.map( (nullMessage) => { 
        return (<div><p>{nullMessage}</p>         
            <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
                Add 
            </button>
            </div>
            )})
     }
    
    let siblings = null;
    if (personDetail.siblings && personDetail.siblings.length > 0) {
      siblings = personDetail.siblings.map( (p) => { 
        return (<div><li> {p.firstName} {p.lastName}</li>
            <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
              Edit 
            </button>
            <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.activeItem)}>
              Delete
            </button>
            </div>
         )
      })
    } else {
        siblings = nullMessage.map( (nullMessage) => { 
        return (<div><p>{nullMessage}</p>         
            <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
                Add 
            </button>
            </div>
            )})
     }
    return (
      <div>
      <Label for="parents">Parents:</Label>
        {parents}
       <hr/>


       <Label for="children">Children:</Label>
       {children}
       <hr/>
       <Label for="spouses">Spouses:</Label>
       {spouses}
       <hr/>
       <Label for="siblings">Siblings:</Label> 
       {siblings}
       </div>
    )
  }

  // takes array of parent/spouse/child IDs and iterates through tree
    // findPerson(inputObject, personArray) {
    //     let persons = [];
    //     const keys = Object.keys(inputObject);
    //     for (let i = 0; i < keys; i+=1) {
    //             if(personArray[0] || personArray[1] == inputObject[i].id) {
    //                 persons.push(inputObject[i].firstName);
    //             } 
    //         }
    //     return persons.map((person) => <li>{person}</li>)
    //     }

  render() {
    const { toggle, onSave } = this.props;

    return ( <div>
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{this.props.activeItem.firstName} {this.props.activeItem.lastName}</ModalHeader>
        <ModalBody>
              <Label for="bio">Bio:</Label>
              {this.props.activeItem.bio} {' '}
              <span>
                <button className="btn btn-secondary mr-2" onClick={() => this.editItem(this.props.activeItem)}>
                Edit 
                </button>
                <button className="btn btn-danger" onClick={() => this.handleDelete(this.props.activeItem)}>
                Delete
                </button>
              </span>
              <hr/>
              {this.printRelatives(this.state.personDetail)}

              {/* <Label for="parents">Parents:</Label>
             {this.familyMemberReformatTest(this.state.personDetail)}
             
              <hr/>

              <Label for="children">Children:</Label>
              {this.familyMemberReformatTest(this.state.personDetail)}

              <hr/>
              <Label for="spouses">Spouses:</Label>
              {this.familyMemberReformatTest(this.state.personDetail)}

              <hr/>
              <Label for="firstName">Siblings:</Label>
              {this.familyMemberReformatTest(this.state.personDetail)} */}
            
        </ModalBody>
        <ModalFooter>
        {this.state.modal ? (
          <AddPersonViewModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
          <Button color="success">
            Exit
          </Button>
        </ModalFooter>
      </Modal> </div>
    );
  }
}