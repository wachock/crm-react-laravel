import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Profileimage from '../../../Assets/image/Frontend/profileimage.png';
import Messageicon from '../../../Assets/image/Frontend/Icons/msg-icon.png';
export default function ProfileInfo() {
  return (
    <div>
      <div className='profileinfo'>
      <Row>
        <Col sm='8' xs='8'>
        <Row>
        <Col sm='3' xs='3'>
            <div className='profileimg detail-pro'>
                <img src={Profileimage} alt='Profile' className='img-fluid' width={88} height={88} />
            </div>
        </Col>
        <Col sm='9 pl-0' xs='9'>
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
        </Col>
        <Col sm='4' xs='4'>
            <div className='share'>
                <Link to='#!'>Share</Link>
            </div>
        </Col>
      </Row>
      <Row>
        <Col sm='4' xs='12'>
           <div className='Grid-Box'>
           <Row>
                <Col sm='3 pr-0'>
                    <div className='icon'>
                        <img src={Messageicon} alt='Icon' className='img-fluid' />
                    </div>
                </Col>
                <Col sm='9'>
                    <h3>100%</h3>
                    <p>Response Rate</p>
                </Col>
            </Row>
           </div>
        </Col>
        <Col sm='4' xs='12'>
           <div className='Grid-Box'>
           <Row>
                <Col sm='3 pr-0'>
                    <div className='icon'>
                        <img src={Messageicon} alt='Icon' className='img-fluid' />
                    </div>
                </Col>
                <Col sm='9'>
                    <h3>Motorized</h3>
                    <p>Have a Car</p>
                </Col>
            </Row>
           </div>
        </Col>
        <Col sm='4' xs='12'>
           <div className='Grid-Box'>
           <Row>
                <Col sm='3 pr-0'>
                    <div className='icon'>
                        <img src={Messageicon} alt='Icon' className='img-fluid' />
                    </div>
                </Col>
                <Col sm='9'>
                    <h3>Night guards</h3>
                    <p>Available Help Night</p>
                </Col>
            </Row>
           </div>
        </Col>
      </Row>
      </div>
    </div>
  )
}
