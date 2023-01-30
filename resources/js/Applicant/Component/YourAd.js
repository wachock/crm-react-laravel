import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaMapMarkerAlt } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';
import PhoneInput from 'react-phone-number-input';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function YourAd() {
  const [value, setValue] = useState();
  
  
  return (
    <Form>
      <div className='row'>
        <div className='col-sm-12'>
            <Form.Group controlId="formselect1" className='mb-3'>
                <Form.Label>I am</Form.Label>
                <Form.Select defaultValue="life assistant" name='lookingfor' className='form-control selectstyle' onChange={e => setLookingfor(e.target.value)} >
                    <option value='life assistant'>life assistant</option>
                    <option value='paid companion'>paid companion</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Ad title</Form.Label>
                <Form.Control type="text" name='posttitle' className='inputstyle' placeholder="Enter Your ad title" onChange={e => setPosttitle(e.target.value)} />
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
                // onChange={e => setAddress(e.target.value)}
              />
                <InputGroup.Text id="basic-addon2"><FaMapMarkerAlt/></InputGroup.Text>
              </InputGroup>
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
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-1" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-2" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-3" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-4" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-5" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-6" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-7" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            <td>
                            <div className="radio">
                                <label>
                                    <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                                    <span className="forcustom">6 AM - 8 AM</span>
                                </label>
                            </div>
                            </td>
                            </tr>

                        </tbody>
                        </Table>
                    </Form.Group>
                    <Form.Label>Net hourly wage requested for this   services</Form.Label>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text id="basic-addon1">€ /hour</InputGroup.Text>
                        <Form.Control
                        type="text"
                        className='inputstyle'
                        placeholder="Enter your hourly wage"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                      
        </div>
        <div className='col-sm-12 text-center'>
          <Form.Group>
            <Button as="input" type="submit" value="Next" className='btn btn-primary' />
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}
