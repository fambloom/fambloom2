import React, { Component } from "react";
import {  } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from "axios";
import * as settings from '../settings';
import { VictoryPie } from 'victory';

// Example data
// backend will pass in array of two numbers: # of female, # of male.
const data = [40, 60]




// dont forget to import stuff from reactstrap when u use them
export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      women: [],
      men: [],
    };
  }


  componentDidMount() {
    this.refreshList();
    this.refreshList2();
  }

  refreshList = () => {
    axios
      .get(`/stats/countWomen/`)
      .then((res) => this.setState({ women: res.data.women }))
      .catch((err) => console.log(err));
  };

  refreshList2 = () => {
    axios
      .get(`/stats/countMen/`)
      .then((res) => this.setState({ men: res.data.men }))
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.women);
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>

        <Container style={{flex:1, justifyContent: "center", alignItems: "center"}}>

        <Row>
        <Col xs="6" md={{ size: 4, offset: 3 }}>
          <img width="25%" src="https://cdn.discordapp.com/attachments/854112992025903142/859693896300232724/left-icon.png" alt="Icon" />
        </Col>
        <Col xs="6" md={{ size: 4, offset: 4 }}>
        <h3 body className="text-center">Statistics</h3>
        </Col>
        <Col xs="6" md={{ size: 4, offset: 8 }}>
          <img width="25%" src="https://cdn.discordapp.com/attachments/854112992025903142/859693897420636190/right-icon.png" alt="Icon" />
        </Col>      
      </Row>

        <br></br>
        <Row>
        <Col sm="10" md={{ size: 6, offset: 3 }}>
        <Card body className="text-center">
        <VictoryPie
          padAngle={({ datum }) => datum.y}
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          innerRadius={75}
          data={[
            { x: "women", y: this.state.women },
            { x: "men", y: this.state.men  }
          ]}
        />
          <CardTitle tag="h4" centered>Family Tree</CardTitle>
          <CardText centered>{this.state.women} female | {this.state.men} male</CardText>
          </Card>
        </Col>
        </Row>

      <br></br>
      <h2>{this.state.women} Female</h2>
      <h2>{this.state.men} Male</h2>
      </Container>

      </div>
    );
  }

}