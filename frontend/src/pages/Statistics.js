import React, { Component } from "react";
import {  } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from "axios";
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

        <Container>

        <h3 body className="text-center">Statistics</h3>
        <br></br>
        <Row>
      <Card>
        <CardBody body className="text-center">
        <VictoryPie
          padAngle={({ datum }) => datum.y}
          colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
          innerRadius={75}
          data={[
            { x: "women", y: this.state.women },
            { x: "men", y: this.state.men  }
          ]}
        />
          <CardTitle tag="h5" centered>TreeName</CardTitle>
          <CardText centered>female | male</CardText>
        </CardBody>
        </Card>
        </Row>

      <br></br>
      <h2>{this.state.women} are female</h2>
      <h2>{this.state.men} are male</h2>
      </Container>

      </div>
    );
  }

}