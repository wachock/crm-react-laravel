import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function HourWorkForm() {
    const [regular, setRegular] = useState('');
    const [date, setDate] = useState('');
    const [hoursperweek, setHoursperweek] = useState('');
    const [service, setService] = useState('');
    const [duration, setDuration] = useState('');
    const [need, setNeed] = useState('');

    const HandleHourBook = (e) => {
        e.preventDefault();
        const data = {
            "regular": regular,
            "date": date,
            "hoursperweek": hoursperweek
        }
        console.log(data);
    }

  return (
    <div>
      <Form>
      <Form.Group controlId="formselect1" className='mb-3'>
            <Form.Select defaultValue="Regular" name='regular' className='form-control selectstyle' onChange={e => setRegular(e.target.value)} >
                <option value='regular'>Regular</option>
                <option value='one'>One</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId="exampleForm.ControlInput2">
            <Form.Control type="date" name='date' className='inputstyle' onChange={e => setDate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formselect2" className='mb-3'>
            <Form.Select defaultValue="Number of hours per week" name='hoursperweek' className='form-control selectstyle' onChange={e => setHoursperweek(e.target.value)} >
                <option value='Number of hours per week'>Number of hours per week</option>
                <option value='1 week'>1 week</option>
                <option value='2 week'>1 week</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className='messagebtn'>
            <div className='send-a-message'>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#messageModal">
                    Send a Message
                </button>
                <div className="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="messageModalLabel">Send a message to Applicant</h5>
                        </div>
                        <div className="modal-body">
                        <form>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group">
                                        <label className="control-label">Type of Service</label>
                                        <select className='form-control' value={service} onChange={(e) => setService(e.target.value)}>
                                            <option value=''>Please Select</option>
                                            <option value=''>Regular</option>
                                            <option value=''>Weekly</option>
                                            <option value=''>Monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group">
                                        <label className="control-label">Select Duration</label>
                                        <select className='form-control' value={duration} onChange={(e) => setDuration(e.target.value)}>
                                            <option value=''>Please Select</option>
                                            <option value=''>1 hour</option>
                                            <option value=''>2 hour</option>
                                            <option value=''>3 hour</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <div className="form-group">
                                        <label className="control-label">Your need</label>
                                        <textarea className='form-control' onChange={(e) => setNeed(e.target.value)} rows='3' placeholder='Hello Applicant,'></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer text-center">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Form.Group>
        <Form.Group className='messagebtn mt-2'>
            <Button as="input" type="submit" value="Get phone number" className='btn btn-primary' />
        </Form.Group>
        <Form.Group className='booknowbtn mt-2'>
            <Button as="input" type="submit" value="Book Now" variant="info" onClick={HandleHourBook} />
        </Form.Group>
      </Form>
    </div>
  )
}
