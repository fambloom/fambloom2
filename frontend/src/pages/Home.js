import React, { Component, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from 'react-router'
import history from '../history';
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


  // handleGotoTreeView = (treeCode) => {
  //   history.push('/treeview', {treeCode: treeCode})
  // }

  handleGotoPersonTreeView = (treeCode, treeName) => {
    history.push('/persontreeview', {treeCode: treeCode, treeName: treeName})
  }

  renderItems = () => {
    const newItems = this.state.trees
    return newItems.map((item) => (

        
        <Card key={item.treeCode} className="mx-4">
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>{item.treeName}</CardTitle>
          {/* <Button onClick={() => this.handleGotoTreeView(item.treeCode)} centered outline color="secondary">Go to TreeView</Button> */}
          <Button onClick={() => this.handleGotoPersonTreeView(item.treeCode, item.treeName)} centered outline color="secondary">Go to Tree</Button>

        </CardBody>
      </Card>
    
      
    ));
  };

  render() {

    return (
      <Container fluid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <Container fluid>
        <Row >
        <Col className="px-0 ml-n5" >
        <img id="flower1" width="100%" src="https://cdn.discordapp.com/attachments/854112992025903142/859673352243511306/left.png" alt="Icon" />
        </Col>
          <Col >
          <Card id="homeLogo" body className="text-center mx-n4">
            <img width="100%" src="https://cdn.discordapp.com/attachments/854112992025903142/859679165317382154/logo.png" alt="Logo" />
            <CardText id="homeSub" className="fonts">discover how your family line blossomed through time</CardText>
          </Card>
          </Col>
          <Col className="px-0 mr-n5">
          <img id="flower2" width="100%" src="https://cdn.discordapp.com/attachments/854112992025903142/859673355452153926/right.png" alt="Icon" />
          </Col>
          </Row>
        </Container>

        <br></br><br></br>
        <hr></hr>

      <Container style={{flex:1, justifyContent: "center", alignItems: "center"}}>

      <Row style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
          <h4 body className="text-center">List of Public Trees</h4>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
      </Row>
     
      <Row className="flex-wrap" style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      {this.renderItems()}
      </Row>
      <br></br>
      </Container>
      <hr></hr>

    
        {/* <Container>
      <Row style={{flex:1, justifyContent: "center", alignItems: "center"}}>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
          <h4 body className="text-center">Want to create your own family tree?</h4>
          <img width="60px" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
      </Row>
      </Container> */}
  <br></br>
      <Container>
      <h4 body className="text-center">Want to create your own family tree?</h4>
<br></br>
      <Row style={{flex:1, justifyContent: "center", alignItems: "center"}}>
<Col sm="10" md={{ size: 4 }}> 
<Card>
  <CardBody body className="text-center" >
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
</Row><br></br>
    
      <br></br>
      <br></br>
      </Container>

      </Container>
    );
  }

}

export default withRouter(Home);