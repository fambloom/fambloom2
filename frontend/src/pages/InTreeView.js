import React, { Component } from "react";
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from "../components/FamilyNode";
import * as settings from '../settings';
import {  } from "reactstrap";
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label,
} from "reactstrap";
import styles from '../App.css';
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';

const WIDTH = 100;
const HEIGHT = 100;

export default class TreeView extends Component {
   WIDTH = 100;
   HEIGHT = 100;

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

  handleClick (e) {
    // console.log("HIWOADWAIHDWAOHD");
    e.preventDefault();
    const item = {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      birthPlace: "",
    };

    this.setState({ activeItem: item, modal: !this.state.modal });
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
          <FamilyNode //onClick={this.handleClick}
            key={node.id} node={node}
            style={{ width: WIDTH, height: HEIGHT,
              transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,}} /> </div>
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