import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Container, FormGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaMapMarkerAlt } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function LookingForHelpForm() {
    const [value, setValue] = useState();
    const [lookingfor, setLookingfor] = useState('');
    const [announcement, setAnnouncement] = useState('');
    const [posttitle, setPosttitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [timeslot, setTimeSlot] = useState([]);
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const HandleSpecify = (e) => {
        e.preventDefault();
        const data = {
            "lookingfor": lookingfor,
            "announcement": announcement,
            "posttitle": posttitle,
            "description": description,
            "address": address,
            "contact": contact,
            "timeslot": timeslot,
            "date": date
        }
        
        console.log(data);
        navigate('/employer/all-applicants');
    }

    const handleTimeSlot = (e) => {
        var updatedList = [...timeslot];
        if (e.target.checked) {
            updatedList = [...timeslot, e.target.value];
        } else {
            updatedList.splice(timeslot.indexOf(e.target.value), 1);
        }
        console.log(updatedList)
        setTimeSlot(updatedList);
    }


  return (

    <div className='lfh-page'>
      <Container>
        <Row>
            <Col sm='12' xs='12'>
                <div className='formbg specify loginform'>
                    <h3>Specify your need and find quickly!</h3>
                    <Form>
                    <Form.Group controlId="formselect1" className='mb-3'>
                    <Form.Label>I'm looking for a</Form.Label>
                    <Form.Select defaultValue="life assistant" name='lookingfor' className='form-control selectstyle' onChange={e => setLookingfor(e.target.value)} >
                        <option value='life assistant'>life assistant</option>
                        <option value='paid companion'>paid companion</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formselect2" className='mb-3'>
                    <Form.Label>My announcement</Form.Label>
                    <Form.Select defaultValue="life assistant" name='announcement' className='form-control selectstyle' onChange={e => setAnnouncement(e.target.value)} >
                        <option value='I am looking candidate for my self'>I am looking candidate for my self</option>
                        <option value='I am looking candidate for someone else'>I am looking candidate for someone else</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Post title</Form.Label>
                        <Form.Control type="text" name='posttitle' className='inputstyle' placeholder="Enter Your post title" onChange={e => setPosttitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name='description' className='textareastyle' placeholder='Enter your post description (30 characters minimum)' rows={5} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Address / Location</Form.Label>
                        <InputGroup className="mb-3 mapinput">
                        <Form.Control
                          placeholder="110091, 123 Laxmi nager"
                          aria-label="110091, 123 Laxmi nager"
                          aria-describedby="basic-addon2"
                          className='inputstyle'
                          name='address'
                          onChange={e => setAddress(e.target.value)}
                        />
                        <InputGroup.Text id="basic-addon2"><FaMapMarkerAlt/></InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="exampleForm.ControlInput6">
                    <Form.Label>Contact Number</Form.Label>
                    <PhoneInput
                        placeholder="Enter your contact number"
                        value={value}
                        defaultCountry="FR"
                        onChange={setContact}
                        name='contact'
                        //onChange={e => setContact(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId="exampleForm.ControlInput7">
                    <Form.Label>Needs time slots</Form.Label>

                    <Table responsive className='timeslots'>
                        <thead>
                            <tr>
                            <th>SUNDAY</th>
                            <th>MONDAY</th>
                            <th>TUESDAY</th>
                            <th>WEDNESDAY</th>
                            <th>THURSDAY</th>
                            <th>FRIDAY</th>
                            <th>SATURDAY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 6AM -8AM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="6 AM - 8 AM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                            {/* 8 AM - 12 PM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 AM - 12 PM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 AM - 12 PM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                            {/* 12 PM - 2 PM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="12 PM - 2 PM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">12 PM - 2 PM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                            {/* 2 PM - 4 PM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="2 PM - 4 PM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">2 PM - 4 PM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                            {/* 4 PM - 8 PM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="4 PM - 8 PM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">4 PM - 8 PM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                            {/* 8 PM - 12 AM Slot*/}
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Sunday" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Monday" data-day="Monday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Tuesday" data-day="Tuesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Wednesday" data-day="Wednesday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Thursday" data-day="Thursday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Friday" data-day="Friday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox" value="8 PM - 12 AM Day Saturday" data-day="Saturday" className="btn-check" id="bordered-radio-1" name="timeslot" onChange={(e) => handleTimeSlot(e)}/>
                                    <span className="forcustom">8 PM - 12 AM</span>
                                </label>
                            </div>
                            </td>
                            </tr>                                                       
                            
                        </tbody>
                        </Table>

                    </Form.Group>

                    <Form.Group className='mb-3' controlId="exampleForm.ControlInput8">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" name='date' className='inputstyle col-sm-3' onChange={e => setDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Button as="input" type="submit" value="SAVE" className='btn btn-primary' onClick={HandleSpecify} />
                    </Form.Group>
                    </Form>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}
