import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footerlogo from '../Assets/image/Frontend/Footerlogo.png';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <Container>
            <Row>
            <Col className='text-center'>
                <Link to='/'><img src={Footerlogo} className='img-fluid' alt='Logo' /></Link>
            </Col>
            </Row>
            <Row>
            <Col className='text-center'>
                <div className='list-inline footermenu'>
                    <Link to='/about-us'>Travailler chez Yeliko</Link>
                    <Link to='/how-it-work'>Maintien et aide à domicile</Link>
                    <Link to='/help'>Aide administrative</Link>
                    <Link to='/contact-us'>Blog</Link>
                    <Link to='/privacy-policy'>Mentions légales</Link>
                    <Link to='/terms-and-conditions'>Protection des données</Link>
                </div>
            </Col>
            </Row>
            <Row>
            <Col sm='12' xs='12'>
                <div className='socialmedia'>
                    <Link to='/'><FaFacebookF/></Link>
                    <Link to='/'><FaInstagram/></Link>
                    <Link to='/'><FaTwitter/></Link>
                    <Link to='/'><FaLinkedinIn/></Link>
                </div>
            </Col>
            </Row>
            <Row>
            <Col sm='12' xs='12'>
                <div className='text-center bottomfooter'>
                    <p>&copy; Copyright 2023 <Link to='/'>Yeliko</Link> Tous droits réservés</p>
                </div>
            </Col>
            </Row>
        </Container>
      </div>
    </div>
  )
}
