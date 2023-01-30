import React from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployeeCard from './Components/EmployeeCard'
import Form from 'react-bootstrap/Form';

export default function ApplicantList() {
  return (
        <div className='employeelist'>
        <Container>
            <Row>
                <Col sm="3" xs='12'>
                <Form.Select aria-label="Default select example" name='sortby' className='form-control selectstyle' onChange={e => setSortby(e.target.value)}>
                    <option>Sort by</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                </Col>


            </Row>
            <Row className='mt-4'>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
                <Col sm="4" xs="12">
                    <EmployeeCard />
                </Col>
            </Row>
        </Container>

        </div>
  )
}
