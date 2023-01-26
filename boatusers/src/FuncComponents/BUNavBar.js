import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="./Automation">Automation</NavDropdown.Item>
              <NavDropdown.Item href="./Items">Items</NavDropdown.Item>
              <NavDropdown.Item href="./Map">Map</NavDropdown.Item>
              <NavDropdown.Item href="./Weather">Weather</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

