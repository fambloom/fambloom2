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
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="container-fluid" navbar>
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
              <NavLink exact href="/persontreeview">Person View</NavLink>
            </NavItem>
            <NavItem className="ml-auto">
              <NavLink exact href="/">Home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>   
    </div>
  );
}

export default NavigationBar;