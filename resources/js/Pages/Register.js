import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Container, FormGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Recaptcha from '../Assets/image/Frontend/recaptcha.png';
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import { Checkbox } from 'rsuite';

export default function Register() {
    const [postcode, setPostcode] = useState('');
    const [fname, setFirstname] = useState('');
    const [lname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const HandleRegister = (e) => {
        e.preventDefault();
        const data = {
            "postcode": postcode,
            "fname": fname,
            "lname": lname,
            "email": email,
            "password": password
        }
        console.log(data);
        navigate('/employer/looking-for-help');
    }
    const HandleApplicantRegister = (e) => {
        e.preventDefault();
        const data = {
            "postcode": postcode,
            "fname": fname,
            "lname": lname,
            "email": email,
            "password": password
        }
        console.log(data);
        navigate('/applicant/setup-profile');
    }
  return (
    <div>
        <Header />
      <div className='login register'>

        <Container>
        <h1><b>What Are</b> You Looking For?</h1>
            <Row>
                <Col sm='12' xs='12'>
                <div className='tabform'>
                    <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="help"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="job" title="I am looking for a job">
                    <div className='loginform'>

                        <h2>I am looking for a job</h2>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Where?</Form.Label>
                                <Form.Control type="text" name='postcode' className='inputstyle' placeholder="Address or postal code" onChange={e => setPostcode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name='fname' className='inputstyle' placeholder="First Name" onChange={e => setFirstname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name='lname' className='inputstyle' placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Enter Your Email</Form.Label>
                                <Form.Control type="email" name='email' className='inputstyle' placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput5">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' className='inputstyle' placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <FormGroup className="mb-3">
                            <Form.Check
                                inline
                                label="I agree to website"
                                name="group1"
                                type="checkbox"
                                className='mr-1'

                            />
                            <Link to='/' className='trems'>T&C</Link>
                            </FormGroup>
                            <Form.Group>
                                <img src={Recaptcha} className='img-fluid mb-4' />
                            </Form.Group>
                            <Form.Group>
                            <Button as="input" type="submit" value="REGISTER" className='btn btn-primary' onClick={HandleApplicantRegister} />
                            </Form.Group>
                            <div className='donthaveaccount text-center'>
                                <p>Already have an account? <Link to='login' >Log in</Link></p>
                            </div>
                            </Form>
                        </div>
                    </Tab>
                    <Tab eventKey="help" title="I am looking for a help">
                    <div className='loginform'>

                        <h2>I am looking for a help</h2>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Where?</Form.Label>
                                <Form.Control type="text" name='postcode' className='inputstyle' placeholder="Address or postal code" onChange={e => setPostcode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name='fname' className='inputstyle' placeholder="First Name" onChange={e => setFirstname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name='lname' className='inputstyle' placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                <Form.Label>Enter Your Email</Form.Label>
                                <Form.Control type="email" name='email' className='inputstyle' placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="exampleForm.ControlInput5">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' className='inputstyle' placeholder="Password" onChange={e => setPassword(e.target.value)} />

                            </Form.Group>
                            <FormGroup className="mb-3">
                            <Form.Check
                                inline
                                label="I agree to website"
                                name="group1"
                                type="checkbox"
                                className='mr-1'

                            />
                            <Link to='/terms-and-conditions' className='trems'>T&C</Link>
                            </FormGroup>
                            <Form.Group>
                                <img src={Recaptcha} className='img-fluid mb-4' />
                            </Form.Group>
                            <Form.Group>
                            <Button as="input" type="submit" value="REGISTER" className='btn btn-primary' onClick={HandleRegister} />
                            </Form.Group>
                            <div className='donthaveaccount text-center'>
                                <p>Already have an account? <Link to='/login' >Log in</Link></p>
                            </div>
                            </Form>
                        </div>
                    </Tab>
                    </Tabs>
                </div>

                </Col>
            </Row>
        </Container>
        </div>
        <Footer/>
    </div>
  )
}
