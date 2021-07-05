import React, { Component } from "react";
import history from '../history';

import InTreeView from "../pages/InTreeView";
import axios from "axios";
import {  } from "reactstrap";
import * as tools from "../tools";
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';


class TreeView extends Component {

  constructor(props) {
    super(props);
    // {this.setState({treeCode: history.location.state.treeCode})}

    this.state = {
      treeCode: history.location.state.treeCode,
      treeName: "",
      newPeopleList: [],
      peopleList: [],
      modal: false,
      activeItem: {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "gender": "",
        "tree": "",
        "parents": [],
        "siblings": [],
        "spouses": [],
        "children": [],
        "bio": "",
        "birthDate": null,
        "birthPlace": null,
        "image": null
      },
    };
  }

  componentDidMount() {

    this.refreshList();
  }

  refreshList = () => {

    axios
      .get(`/api/treedetail/${this.state.treeCode}/`)
      .then((res) => {
        this.setState((state, props) => ( {newPeopleList: tools.objectReformat(res.data.people)} ) );  
        this.setState({treeName: res.data.treeName});
        console.log("new items here");
        console.log(this.state.newPeopleList);
      })
      .catch((err) => console.log(err));
  };


  render() {
    
    return (
      <div >
        <h1>Family Tree View: {this.state.treeName}</h1>
        <InTreeView newPeopleList={this.state.newPeopleList}></InTreeView>
    
      </div>
    );
  }

}

export default TreeView;