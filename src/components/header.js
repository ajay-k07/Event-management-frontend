import React, { useState } from 'react';
import { isAuthenticated } from '../Auth/auth';
import { withRouter } from 'react-router-dom';
import { BsPeopleCircle } from 'react-icons/bs';
import { RiLogoutBoxFill } from "react-icons/ri";
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
  DropdownItem
} from 'reactstrap';
import { toast } from 'react-toastify';
import api from '../services/api';



const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const onClickLogoutHandler = async () => {
    const RefreshToken = localStorage.getItem("refreshToken")
    await api.post("/logout", RefreshToken)
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    toast.dark("Logged out successfully")
    props.history.push("/login")
  }

  return (
    <Navbar color='dark' dark expand="md" sticky="top" >
      <NavbarBrand href="/">EVENT MANAGEMENT</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">HOME</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/events">EVENTS</NavLink>
          </NavItem>
          {isAuthenticated() && isAuthenticated().isAdmin && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <BsPeopleCircle />  ADMIN
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/admin/dashboard">
                  DASHBOARD
                </DropdownItem>
                <DropdownItem href="/admin/events">
                  MANAGE EVENTS
                </DropdownItem>
                <DropdownItem href="/admin/registrations">
                  MANAGE REGISTRATIONS
                </DropdownItem>
                <DropdownItem href="/admin/attendances">
                  MANAGE ATTENDANCES
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <span className="nav-link " onClick={onClickLogoutHandler}><RiLogoutBoxFill />   LOGOUT</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {isAuthenticated() && !isAuthenticated().isAdmin && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <BsPeopleCircle />  USER
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/user/profile">
                  DASHBOARD
                </DropdownItem>
                <DropdownItem href="/user/update-password">
                  CHANGE PASSWORD
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <span className="nav-link " onClick={onClickLogoutHandler}><RiLogoutBoxFill />   LOGOUT</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {!isAuthenticated() && (
            <>
              <NavItem>
                <NavLink href="/signup">SIGNUP</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">LOGIN</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default withRouter(Header);
