import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AchievableTask from './Components/ApplicantDetails/AchievableTask'
import Availability from './Components/ApplicantDetails/Availability'
import Description from './Components/ApplicantDetails/Description'
import Experience from './Components/ApplicantDetails/Experience'
import HourWorkForm from './Components/ApplicantDetails/HourWorkForm'
import Map from './Components/ApplicantDetails/Map'
import ProfileInfo from './Components/ApplicantDetails/ProfileInfo'
import ProposedServices from './Components/ApplicantDetails/ProposedServices'
import Reviews from './Components/ApplicantDetails/Reviews'
import SpokenLanguages from './Components/ApplicantDetails/SpokenLanguages'

export default function ApplicantDetails() {
  return (
    <div>
        <div className='employeedetail'>
        <Container>
            <Row>
                <Col sm='9' xs='12'>
                <div className='leftsidebar'>
                    <ProfileInfo />
                    <Description/>
                    <ProposedServices/>
                    <AchievableTask/>
                    <SpokenLanguages/>
                    <Availability/>
                    <Reviews/>
                </div>
                </Col>
                <Col sm='3' xs='12'>
                <div className='rightsidebar'>
                    <div className='rightcard'>
                        <h5>€ 12.00/ hour</h5>
                        <HourWorkForm/>
                    </div>
                    <div className='rightcard'>
                        <Experience/>
                    </div>
                    <div className='rightcard'>
                        <Map/>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
        </div>
    </div>
  )
}
