import React, { Component, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, FormGroup, Label, Input
} from 'reactstrap';
import axios from "axios";
import './Pages.css';

// dont forget to import stuff from reactstrap when u use them
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: [],
      activeItem: {
        treeName: '',
      },
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

  refreshPage() {
    window.location.reload(false);
  }

  handleSubmit = (item1) => {
    const item = {
      treeName: item1,
      // pas sword: "",
      // description: "",
      // image: "",
    };

    if (item.treeCode) {
      axios
        .put(`/api/tree/${item.treeCode}/`, item, )
      return;
    }

    axios
      .post(`/api/tree/`, item, )
      .then((res) => {console.log(res.data); this.refreshList(); })
      .catch(err => { console.log(err) });
      

    
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };


  handleGotoTree = (treeCode) => {
    // let history = useHistory();
    // history.push('/treeview', {
    //   code: treeCode
    // })
  }

  renderItems = () => {
    const newItems = this.state.trees
    return newItems.map((item) => (

        
        <Card className="mx-4">
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>{item.treeName}</CardTitle>
          <Button onClick={() => this.handleGotoTree(item.treeCode)} centered outline color="secondary">Go to Tree</Button>
        </CardBody>
      </Card>
    
      
    ));
  };

  render() {

    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <Container>
          <Row>
          <Col sm="10" md={{ size: 6, offset: 3 }}>
          <Card body className="text-center">
            <img width="100%" src="https://cdn.discordapp.com/attachments/854112992025903142/859679165317382154/logo.png" alt="Logo" />
            <CardText className="fonts">discover how your family line blossomed through time</CardText>
          </Card>
          </Col>
          </Row>
        </Container>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

      <Container style={{flex:1, justifyContent: "center", alignItems: "center"}}>

      <Row style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
          <h3 body className="text-center">List of Public Trees</h3>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
      </Row>
     
      <br></br>
      <Row className="flex-wrap" style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      {this.renderItems()}
      </Row>
      <br></br>
      </Container>

      <Container>
        <Row>
<Col sm="10" md={{ size: 6, offset: 3 }}>

  
<h4 body className="text-center">Want to create your own family tree?</h4>
      <br></br>
<Card>
  <CardBody body className="text-center">
    <CardTitle tag="h2" centered>Create</CardTitle>
    <CardTitle tag="h5" centered>a new family tree</CardTitle>
    <FormGroup>
        <Label for="treeName" hidden>Tree Name</Label>
        <Input type="treeName" name="treeName" id="treeName" onChange={this.handleChange} value={this.state.activeItem.treeName} placeholder="Tree Name" />
      </FormGroup>
    <CardText centered></CardText>
    <Button centered outline color="secondary" onClick={() => {this.handleSubmit(this.state.activeItem.treeName); this.refreshPage();}}>Submit</Button>
  </CardBody>
</Card>
</Col>
</Row>
      <br></br>
      <br></br>
      <br></br>
      </Container>

      </div>
    );
  }

}

export default Home;