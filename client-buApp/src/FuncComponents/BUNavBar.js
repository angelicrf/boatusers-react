import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { Component } from 'react';

export default function BUNavBar() {

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Bout Users</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="./About">About</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="./Automation">Automation</NavDropdown.Item>
              <NavDropdown.Item href="./Items">Items</NavDropdown.Item>
              <NavDropdown.Item href="./Map">Map</NavDropdown.Item>
              <NavDropdown.Item href="./Weather">Weather</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="User Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="./MyAccount">User Info</NavDropdown.Item>
              <NavDropdown.Item href="./MyAccount/FavoritePlaces">User Favorites</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

