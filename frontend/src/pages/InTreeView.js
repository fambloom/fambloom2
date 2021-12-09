import React, { Component } from "react";
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from "../components/FamilyNode";
// import PinchZoomPan from '../PinchZoomPan/PinchZoomPan';

const WIDTH = 200;
const HEIGHT = 200;

export default class TreeView extends Component {

   WIDTH = 200;
   HEIGHT = 200;

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
    console.log(this.props.newPeopleList)
    if (this.props.newPeopleList.length === 0){
      return (<h3>empty tree</h3>)
    } else {
      return (
        
        <ReactFamilyTree className="famTree"
        nodes={this.props.newPeopleList}
        rootId={this.props.newPeopleList[0].id}
        width={WIDTH}
        height={HEIGHT}
        // className={styles.tree}
        renderNode={(node) => ( 
          <FamilyNode  className="famTreeNode"
            key={node.id} node={node} isRoot={node.id === this.props.newPeopleList[0].id}
            style={{ 
              transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,}} 
              /> 
          )} /> 
    
      )
    }

  }


  render() {
    return (
    
         <div className="famTreeContainer">
            {this.rendermyTree()}
          </div>
     
    );
  }

}