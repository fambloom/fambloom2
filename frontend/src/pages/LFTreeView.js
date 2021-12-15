import React, { Component } from "react";
import history from '../history';

import LFInTreeView from "../pages/LFInTreeView";
import axios from "axios";
import * as tools from "../tools";


class LFTreeView extends Component {

  constructor(props) {
    super(props);
    // {this.setState({treeCode: history.location.state.treeCode})}

    this.state = {
      treeCode: "A", //history.location.state.treeCode,
      treeName: "",
      newPeopleList: [],
      peopleList: [],
      loaded: false,
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
        this.setState({loaded: true});
        console.log("new items here");
        console.log(this.state.newPeopleList);
      })
      .catch((err) => console.log(err));
  };


  render() {
    
    return (
      <div >
        <h1>Family Tree: {this.state.treeName}</h1>
        {this.state.loaded && <LFInTreeView dataRootId={this.state.newPeopleList[0].id} 
        newPeopleList={this.state.newPeopleList}></LFInTreeView> }
        
    
      </div>
    );
  }

}

export default LFTreeView;