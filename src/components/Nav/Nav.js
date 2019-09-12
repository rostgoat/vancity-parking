import React, { Component } from "react";
import { Navbar, Brand } from "react-bootstrap";
import "./Nav.css";

class Nav extends Component {
  render() {
    return (
      <Navbar bg="dark" className="navbar">
        <Navbar.Brand>
          {/* <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" /> */}
          Parking App
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Nav;
