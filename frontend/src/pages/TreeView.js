import React, { Component } from "react";
import history from '../history';

import InTreeView from "../pages/InTreeView";
import axios from "axios";
import * as tools from "../tools";


class TreeView extends Component {

  constructor(props) {
    super(props);
    // {this.setState({treeCode: history.location.state.treeCode})}

    this.state = {
      treeCode: "A", //history.location.state.treeCode,
      treeName: "",
      newPeopleList: [],
      peopleList: [],

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