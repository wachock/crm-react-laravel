import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profileimage from '../../Assets/image/Frontend/profileimage.png';
import { Link } from 'react-router-dom';

export default function EmployeeCard() {
  return (
    <div>

        <Card className='cardbox'>
        <Link to='/employer/choose-plan'>
            <Card.Body>
                <Row>
                    <Col sm='4' xs='4'>
                        <div className='profileimg'>
                            <img src={Profileimage} alt='Profile' className='img-fluid' />
                        </div>
                    </Col>
                    <Col sm='8 pl-0' xs='8'>
                        <div className='profilename'>
                            <h4>Allie Grater, 28 years old</h4>
                            <p>8 rue Gouin de, 59280 1 km</p>
                            <div className='rating'>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <p>4.0 (3 reviews)</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Card.Text>
                Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and publishing industries for previewing layouts visual mockups.
                </Card.Text>
                <Row>
                <Col sm='7' xs='7'>
                    <Button variant="light">View Profile</Button>
                </Col>
                <Col sm='5' xs='5'>
                    <p className='price'>€10.00 /h</p>
                </Col>
                </Row>
            </Card.Body>
            </Link>
            </Card>

    </div>
  )
}
