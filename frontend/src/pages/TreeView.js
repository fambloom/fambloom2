import React, { Component } from "react";
import InTreeView from "../pages/InTreeView";
import axios from "axios";
import {  } from "reactstrap";
import * as tools from "../tools";
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';


class TreeView extends Component {
   WIDTH = 150;
   HEIGHT = 150;

  constructor(props) {
    super(props);
    
    this.state = {
      code: null,
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
      .get(`/api/treedetail/A/`)
      .then((res) => {
        this.setState((state, props) => ( {newPeopleList: tools.objectReformat(res.data.people)} ) );   
        console.log("new items here");
        console.log(this.state.newPeopleList);
      })
      .catch((err) => console.log(err));
  };


  render() {
    return (
      <div >
        <h1>Family Tree View</h1>
        <InTreeView newPeopleList={this.state.newPeopleList}></InTreeView>
    
      </div>
    );
  }

}

export default TreeView;