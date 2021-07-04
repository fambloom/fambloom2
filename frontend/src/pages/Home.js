import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, FormGroup, Label, Input
} from 'reactstrap';
import axios from "axios";
import * as settings from '../settings';
import './Pages.css';

// dont forget to import stuff from reactstrap when u use them
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: [],
    };
  }

  componentDidMount() {
    this.renderTrees();
  }

  renderTrees = () => {
    axios
      .get(`${settings.API_SERVER}/api/tree/`)
      .then((res) => this.setState({ trees: res.data }))
      .catch((err) => console.log(err));
  };

  
  renderItems = () => {
    const newItems = this.state.trees
    return newItems.map((item) => (
      <div>
        <Card>
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>{item.treeName}</CardTitle>
          <Button centered outline color="secondary">Go to Tree</Button>
        </CardBody>
      </Card>
      </div>
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
          <Card body className="text-center" id="border">
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
      
      <Row>
        <Col xs="6" md={{ size: 4, offset: 3 }}>
          <img width="25%" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
        </Col>
        <Col xs="6" md={{ size: 4, offset: 4 }}>
          <h3 body className="text-center">List of Public Trees</h3>
        </Col>
        <Col xs="6" md={{ size: 4, offset: 8 }}>
          <img width="25%" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
        </Col>      
      </Row>

      <br></br>


      <br></br>

      <Row>
      <Col sm="4">
      {this.renderItems()}
      </Col>
      </Row>
      <br></br>

      <Row>
      <Col sm="4">
      <Card>
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>TreeName</CardTitle>
          <CardText centered>number of members</CardText>
          <Button centered outline color="secondary">Go to Tree</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card>
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>TreeName</CardTitle>
          <CardText centered>number of members</CardText>
          <Button centered outline color="secondary">Go to Tree</Button>
        </CardBody>
      </Card>
      </Col>
      <Col sm="4">
      <Card>
        <CardBody body className="text-center">
          <CardTitle tag="h5" centered>TreeName</CardTitle>
          <CardText centered>number of members</CardText>
          <Button centered outline color="secondary">Go to Tree</Button>
        </CardBody>
      </Card>
      </Col>
      </Row>

      <br></br>
      <br></br>
      <br></br>
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
        <Input type="treeName" name="treeName" id="treeName" placeholder="Tree Name" />
      </FormGroup>
      <FormGroup>
        <Label for="treepassword" hidden>Tree Password</Label>
        <Input type="treepassword" name="treepassword" id="treepassword" placeholder="Tree Password" />
      </FormGroup>
    <CardText centered></CardText>
    <Button centered outline color="secondary">Submit</Button>
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