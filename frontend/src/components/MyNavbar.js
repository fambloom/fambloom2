import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  navbar>
          <NavItem >
              <NavLink exact href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact href="/treelist">Tree List</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink exact href="/person_list">Person List</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink exact href="/treenode">FamilyNode</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink exact href="/statistics">Statistics</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink exact href="/persontreeview">Person View</NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>   
    </div>
  );
}

export default NavigationBar;