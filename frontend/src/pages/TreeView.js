import React, { Component } from "react";
import InTreeView from "../pages/InTreeView";

import axios from "axios";
import {  } from "reactstrap";
import * as tools from "../tools";
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';


export default class TreeView extends Component {
   WIDTH = 150;
   HEIGHT = 150;

  constructor(props) {
    super(props);
    this.state = {
      newPeopleList: [],
      peopleList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`/api/treedetail/A`)
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