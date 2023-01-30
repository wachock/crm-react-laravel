import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Frontlogo from '../Assets/image/Frontend/Frontlogo.png';


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
            <Link to="/about-us" className='nav-link'>Qui sommes-nous ?</Link>
            <Link to="/how-it-work" className='nav-link'>Le fonctionnement </Link>
            <Link to="/help" className='nav-link'>Contact</Link>
          </Nav>
          <Nav className='loginsignupbtn'>
            <Link to="/login" className='nav-link btn btn-primary mr-4'>Connexion</Link>
            <Link to="/register" className='nav-link btn btn-secondary'>S'enregistrer</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
