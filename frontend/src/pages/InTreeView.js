import React, { Component } from "react";
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from "../components/FamilyNode";
import {  } from "reactstrap";
import styles from '../App.css';
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';

const WIDTH = 150;
const HEIGHT = 150;

export default class TreeView extends Component {
   WIDTH = 150;
   HEIGHT = 150;

  constructor(props) {
    super(props);
    this.state = {
      newPeopleList2: [],
      peopleList2: [],
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

  
  rendermyTree = () => {
    if (this.props.newPeopleList.length == 0){
      return (<h3>empty tree</h3>)
    } else {
      return (
        <ReactFamilyTree
        nodes={this.props.newPeopleList}
        rootId={'1'}
        width={WIDTH}
        height={HEIGHT}
        className={styles.tree}
        renderNode={(node) => ( <div>
          <FamilyNode
            key={node.id} node={node}
            style={{ width: WIDTH, height: HEIGHT}} /> </div>
          )} /> 
      )
    }

  }


  render() {
    return (
      <div className={styles.root}>
         <div className={styles.wrapper}>
            {this.rendermyTree()}
          </div>
      </div>
    );
  }

}