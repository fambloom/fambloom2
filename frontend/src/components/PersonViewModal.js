import React, { Component } from "react";
import { Container, Row, Col,
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from "reactstrap";
import axios from "axios";
import AddPersonViewModal from './AddModal';
import BioModal from "./Modal";
import '../App.css';

export default class PersonViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      bioModal: false,
      activeItem: this.props.activeItem,
      newItem: {},
      personDetail: [],
      relationship: "",
      treeCode: this.props.treeCode,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    
    axios
      .get(`/api/persondetail/${this.state.activeItem.id}/`)
      .then((res) => this.setState({ personDetail: res.data }))
      .catch((err) => console.log(err));
  };

  
  refreshList1 = () => {
    axios
      .get(`/api/person/`)
      .then((res) => this.setState({ peopleList: res.data }))
      .catch((err) => console.log(err));
  };


  // refreshList2 = () => {
  //   axios
  //     .get(`/api/persondetail/${this.state.newActiveItem.id}/`)
  //     .then((res) => this.setState({ personDetail: res.data }))
  //     .catch((err) => console.log(err));
  // };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  
  toggle1 = () => {
    this.setState({ bioModal: !this.state.bioModal });
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, bioModal: !this.state.bioModal });
  };

  refreshPage() {
    window.location.reload(false);
  }

  handleStep2 = (item) => {
    if (this.state.relationship === "parents") {
      let newParents =  [...item.parents];
      newParents.push(this.state.newItem.id);
  
      axios.patch(`/api/person/${item.id}/`, {  "parents": newParents  })
      .then((res) => {this.refreshList(); })
      .catch(err => { console.log(err) });
    }

    if (this.state.relationship === "children") {
      let newChildren =  [...item.children];
      newChildren.push(this.state.newItem.id);
 
      axios.patch(`/api/person/${item.id}/`, {  "children": newChildren  })
      .then((res) => { this.refreshList(); })
      .catch(err => { console.log(err) });
    }
    return;
  }

  handleSubmit = (item, newItem) => {
    this.toggle();
   
    if (this.state.relationship === "parents" || this.state.relationship === "children") {
      axios.post(`/api/person/`, newItem, )
      .then((res) => { 
        this.setState({ newItem: res.data });
        this.handleStep2(item);
      }).catch(err => { console.log(err) });
      return;
    }

    if (newItem.id) { 
      return;
    } else {
      axios
      .post(`/api/person/`, newItem, )
      .then((res) => { this.refreshList(); })
      .catch(err => { console.log(err) });
      return;
    }

  };

    
  handleSubmit1 = (item) => {
    this.toggle1();

    if (item.id) {
      axios
        .put(`/api/person/${item.id}/`, item, )
        .then((res) => this.refreshList1());
      return;
    }

    axios
      .post(`/api/person/`, item, )
      .then((res) => { this.refreshList1(); })
      .catch(err => { console.log(err) });

    this.refreshPage();
  };


  handleAddParents = (item) => {
    let personAID = item.id;
  
    const newItem = {
     firstName: "",
     lastName: "",
     gender: "",
     bio: "",
     birthPlace: "",
     parents: [],
     children: [personAID],
     spouses: [],
     siblings: [],
     tree: this.state.treeCode,
   };

   this.setState({ relationship: "parents", activeItem: item, newItem: newItem, modal: !this.state.modal });

  };

 handleAddChildren = (item) => {
  let personAID = item.id;
 
  const newItem = {
   firstName: "",
   lastName: "",
   gender: "",
   bio: "",
   birthPlace: "",
   parents: [personAID],
   children: [],
   spouses: [],
   siblings: [],
   tree: this.state.treeCode,
 };
 this.setState({ relationship: "children", activeItem: item, newItem: newItem, modal: !this.state.modal });

};
 
 handleAddSiblings= (item) => {
  let personAID = item.id;

  const newItem = {
   firstName: "",
   lastName: "",
   gender: "",
   bio: "",
   birthPlace: "",
   parents: [],
   children: [],
   spouses: [],
   siblings: [personAID],
   tree: this.state.treeCode,
 };

 this.setState({ activeItem: item, newItem: newItem, modal: !this.state.modal });
};

handleAddSpouses= (item) => {
  let personAID = item.id;
  
  const newItem = {
   firstName: "",
   lastName: "",
   gender: "",
   bio: "",
   birthPlace: "",
   parents: [],
   children: [],
   spouses: [personAID],
   siblings: [],
   tree: this.state.treeCode,
 };
 this.setState({ activeItem: item, newItem: newItem, modal: !this.state.modal });
};


  handleDelete = (item) => {
    axios
      .delete(`/api/person/${item.id}/`)
      .then((res) => this.refreshList());
  };


  printRelatives = (personDetail) => {

    const nullMessage = [""];
    let parents = null;
    if (personDetail.parents && personDetail.parents.length > 0) {
      parents = personDetail.parents.map( (p) => { 
        return (<Row ><li className="col-auto mr-auto"> {p.firstName} {p.lastName} </li>   
      <button className=" float-right btn btn-danger  btn-sm ml-2 my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleDelete(p)}>
        Delete
      </button>
      </Row>
      )})
    } else {
        parents = nullMessage.map( (nullMessage) => { 
            return (<Row><p>{nullMessage}</p> </Row>)})
     }
    let spouses = null;
    if (personDetail.spouses && personDetail.spouses.length > 0) {
      spouses = personDetail.spouses.map( (p) => { 
        return (<Row><li className="col-auto mr-auto"> {p.firstName} {p.lastName}</li>
       
          <button className="btn btn-danger ml-2 btn-sm  my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleDelete(p)}>
            Delete
          </button>
          </Row>
          )})
    } else {
        spouses = nullMessage.map((nullMessage) => { 
            return (<Row><p>{nullMessage}</p>         
        </Row>
         )})
    }

    let children = null;
    if (personDetail.children && personDetail.children.length > 0) {
      children = personDetail.children.map( (p) => { 
        return (<Row><li className="col-auto mr-auto"> {p.firstName} {p.lastName}</li>
       
          <button className="btn btn-danger ml-2 btn-sm  my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleDelete(p)}>
            Delete
          </button>
        
          </Row>
        )
      })
    } else {
        children = nullMessage.map((nullMessage) => { 
        return (<Row><p>{nullMessage}</p>         
        
            </Row>
            )})
     }
    
     let siblings = null;
     if (personDetail.siblings && personDetail.siblings.length > 0) {
      siblings = personDetail.siblings.map( (p) => { 
         return (<Row><li className="col-auto mr-auto"> {p.firstName} {p.lastName}</li>
          
           <button className="btn btn-danger ml-2 btn-sm  my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleDelete(p)}>
             Delete
           </button>
 
           </Row>
           )})
     } else {
         siblings = nullMessage.map((nullMessage) => { 
             return (<Row><p>{nullMessage}</p>         
          
         </Row>
          )})
     }

    return (
      <Container fluid> 
      <Row>
       <Label className="col-auto mr-auto" for="spouses">Spouses:</Label>
       <button className=" btn btn-success ml-2 btn-sm  my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleAddSpouses(this.props.activeItem)}>
            Add 
          </button> </Row>
       {spouses}
       
       <hr/>
       <Row>
       <Label className="col-auto mr-auto" for="siblings">Siblings:</Label> 
       <button className="btn btn-success ml-2 btn-sm  my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleAddSiblings(this.props.activeItem)}>
             Add 
           </button> </Row>
       {siblings}
       
       <hr/>
       <Row>
       <Label  className="col-auto mr-auto" for="parents">Parents:</Label>
       <button className="btn btn-success ml-2 btn-sm my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleAddParents(this.props.activeItem)}>
            Add 
        </button></Row>
        {parents}
        
       <hr/>
       <Row>
       <Label  className="col-auto mr-auto" for="children">Children:</Label>
       <button className="btn btn-success ml-2 btn-sm my-1 py-0" style={{fontSize: "0.8em"}} onClick={() => this.handleAddChildren(this.props.activeItem)}>
                Add 
            </button></Row>
       {children}
       
     
       </Container>
    )
  }

  renderImage = (item) => {
    let gen = item.gender;
    if (gen==="female") {
      return (
        <div>
        <img alt="female" width="100%" src="https://media.discordapp.net/attachments/854112992025903142/861662921847341056/female-icon.png" />
        </div>
      );
    } else {
      return (
        <div>
          <img alt="male" width="100%" src="https://media.discordapp.net/attachments/854112992025903142/861662923961139230/male-icon.png" />
        </div>
      );
    }
  }

  render() {
    const { toggle, toggle1 } = this.props;

    return ( <div>
      <Modal onExit={this.refreshPage} isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> <h3>
          {this.props.activeItem.firstName} {this.props.activeItem.lastName}
          </h3></ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col className="col-sm-4">
                {this.renderImage(this.props.activeItem)}
              </Col>
              <Col className="col-sm-8 biography justify-content-start">
                
                <Row>
              <Label for="birthPlace">Birth Place:</Label>
              <span className="ml-1">{this.props.activeItem.birthPlace}</span>
              </Row>
              <Row>
              <Label for="Biography:">Biography:</Label>
              <span className="ml-1">{this.props.activeItem.bio}</span>
              </Row >
        
              </Col>
            </Row>
          </Container>
              <hr/>
              {this.printRelatives(this.state.personDetail)}
        </ModalBody>
        <ModalFooter>
        {this.state.modal ? (
          <AddPersonViewModal
            activeItem={this.state.activeItem}
            newItem={this.state.newItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
            treeCode={this.state.treeCode}
          />
        ) : null}
        {this.state.bioModal ? (
          <BioModal
            activeItem={this.state.activeItem}
            toggle={this.toggle1}
            onSave={this.handleSubmit1}
          />
        ) : null}
          <Button color="info" onClick={toggle}>

            Exit
          </Button>
        </ModalFooter>
      </Modal> </div>
    );
  }
}
