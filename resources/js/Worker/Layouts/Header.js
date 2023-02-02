import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Frontlogo from '../../Assets/image/Frontend/Frontlogo.png';


export default function Header(args) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='navbar-bg-light' >
      <Container>
        <Navbar.Brand href="/"><img src={Frontlogo} className='img-fluid' alt='Logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-between'>
          <Nav className="m-auto">
            <Nav.Link href="#!">ABOUT US</Nav.Link>
            <Nav.Link href="#!">HOW IT WORK </Nav.Link>
            <Nav.Link href="#!">HELP </Nav.Link>
          </Nav>
          <Nav className='loginsignupbtn'>
            <Nav.Link href="login" className='btn btn-primary mr-4'>Log In</Nav.Link>
            <Nav.Link href="#!" className='btn btn-secondary'>Register</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
