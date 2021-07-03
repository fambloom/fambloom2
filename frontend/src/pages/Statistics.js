import React, { Component } from "react";
import {  } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from "axios";
import { PieChart } from 'react-minimal-pie-chart';

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
    return (
      <div>
        

        <Container>

        <h3 body className="text-center">Statistics</h3>
        <br></br>
        <Row>
      <Card>
        <CardBody body className="text-center">
        {this.state.women && <PieChart lineWidth={50} label={({ dataEntry }) => dataEntry.title}
          data={[{ title: "women", value: this.state.women,  color: '#E38627' },
            { title: "men", value: this.state.men,  color: '#C13C37'   }]}
        /> }
          <CardTitle tag="h5" centered>Total Statistics</CardTitle>
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