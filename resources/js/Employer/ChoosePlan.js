import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import ChoosePlanCard from './Components/Chooseplan/ChoosePlanCard'
import ChoosePlanCard2 from './Components/Chooseplan/ChoosePlanCard2';
import ChoosePlanCard3 from './Components/Chooseplan/ChoosePlanCard3';

export default function ChoosePlan() {
  return (
    <div>
        <div className='chooseplan'>
            <Container>
                <h1>Choose the plan that works for you</h1>
                <Row>
                    <Col sm='12' xs='12'>
                        <ChoosePlanCard/>
                    </Col>
                    <Col sm='12' xs='12'>
                        <ChoosePlanCard2/>
                    </Col>
                    <Col sm='12' xs='12'>
                        <ChoosePlanCard3/>
                    </Col>

                </Row>
            </Container>
        </div>
    </div>
  )
}
