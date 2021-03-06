import React, { Component } from "react";
import { Container } from "reactstrap";
import { Card, CardBody, CardColumns} from 'reactstrap';
import axios from "axios";
import { PieChart } from 'react-minimal-pie-chart';



// dont forget to import stuff from reactstrap when u use them
export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeStats: [],
    };
  }


  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`/stats/treeStats/`)
      .then((res) => this.setState({ treeStats: res.data.treeStats }))
      .catch((err) => console.log(err));
  };


  renderStats = () => {
    const newItems = this.state.treeStats
    return newItems.map((item) => ( //className="mx-auto"
      <Card  >
      <CardBody body className="text-center">
      { item.women!==0 && item.men !==0 &&
      <PieChart style={{height: "150px"}} lineWidth={50} label={({ dataEntry }) => dataEntry.title}
        data={[{ title: "women", value: item.women,  color: '#e995fc' },
          { title: "men", value: item.men,  color: '#67d0f0'   }]}
      /> }

      {item.women===0 && item.men ===0 && <h3>Empty Tree!</h3>}
      <hr></hr>
      <h5>{item.treeName}</h5>
        <h6>{item.women} are female</h6>
        <h6>{item.men} are male</h6>
      </CardBody>
      </Card>
    ));
  }

  render() {
    return (
      <div>
        

        <Container>

        <h1 body className="text-center">Total Statistics</h1>
        <br></br>
       <CardColumns>
        {this.renderStats()}
        </CardColumns>
      </Container>

      </div>
    );
  }

}