import React, { useState } from 'react';
import { Router, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">FamBloom</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink exact href="/person_list">Person List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact href="/treenode">FamilyNode</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact href="/statistics">Statistics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact href="/treeview">TreeView</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact href="/personview">PersonView</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>   
    </div>
  );
}

export default NavigationBar;