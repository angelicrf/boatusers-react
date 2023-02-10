import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React from 'react'

export default function BUNavBar() {
  return (
    <Navbar bg='primary' expand='lg'>
      <Container>
        <Navbar.Brand href='http://localhost:3000'>Bout Users</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='http://localhost:3000'>Home</Nav.Link>
            <Nav.Link href='http://localhost:3000/About'>About</Nav.Link>
            <NavDropdown title='Menu' id='basic-nav-dropdown'>
              <NavDropdown.Item href='http://localhost:3000/Automation'>
                Automation
              </NavDropdown.Item>
              <NavDropdown.Item href='http://localhost:3000/Items'>
                Items
              </NavDropdown.Item>
              <NavDropdown.Item href='http://localhost:3000/Map'>
                Map
              </NavDropdown.Item>
              <NavDropdown.Item href='http://localhost:3000/Weather'>
                Weather
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='User Account' id='basic-nav-dropdown'>
              <NavDropdown.Item href='http://localhost:3000/MyAccount'>
                User Info
              </NavDropdown.Item>
              <NavDropdown.Item href='http://localhost:3000/MyAccount/FavoritePlaces'>
                User Favorites
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
