import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChoosePlanCard from './Chooseplan/ChoosePlanCard';
import ChoosePlanCard2 from './Chooseplan/ChoosePlanCard2';
import ChoosePlanCard3 from './Chooseplan/ChoosePlanCard3';


export default function TabUpgradePlan() {
  return (
    <div className='TabUpgradePlan'>
        <div className='chooseplan'>
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
        </div>
    </div>
  )
}
