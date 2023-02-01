import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaMapMarkerAlt } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';
import PhoneInput from 'react-phone-number-input';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function AboutYou() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = useState();
  
  return (
    <>
    <div className='row'>
      <div className='col-sm-3'>
        <div class="custom-file text-center">
          <input type="file" class="custom-file-input" id="customFile"/>
          <label class="custom-file-label" for="customFile"></label>
        </div>
        <div className='file-instrution'>
          <h4>Upload profile picture</h4>
          <h3>The photo is essential for employers!</h3>
          <h5>(Max 2 MB - JPG , GIF or PNG)</h5>
        </div>
      </div>
      <div className='col-sm-9'>
        <Form>
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
          <div className='row'>
            <div className='col-sm-6'>
              <Form.Group controlId="formselect1" className='mb-3'>
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue="life assistant" name='lookingfor' className='form-control selectstyle' onChange={e => setLookingfor(e.target.value)} >
                  <option value='life assistant'>Male</option>
                  <option value='paid companion'>Female</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className='col-sm-6'>
              <Form.Group className='mb-3' controlId="exampleForm.ControlInput8">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name='date' className='inputstyle' onChange={e => setDate(e.target.value)} />
              </Form.Group>
            </div>
          </div>
          <Form.Group className='mb-3' controlId="exampleForm.ControlInput6">
            <Form.Label>Contact Number</Form.Label>
            <InputGroup>
              <PhoneInput
                  placeholder="Enter your contact number"
                  value={value}
                  defaultCountry="FR"
                  // onChange={setContact}
                  name='contact'
                  //onChange={e => setContact(e.target.value)}
                  />
                  <a className='btn btn-primary' onClick={handleShow}>Send OTP</a>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <div className='col-sm-12 text-center'>
          <Form.Group>
            <Button as="input" type="submit" value="Next" className='btn btn-primary' />
          </Form.Group>
        </div>
    </div>
    {/* // OTP Modal */}
    <Modal show={show} onHide={handleClose} className="EditAcoount">
        <Modal.Header closeButton>
          <Modal.Title>Enter your OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='row'> 
                    <div className='col-sm-12'>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control type="text" name='posttitle' className='inputstyle' placeholder="Enter your OTP" onChange={e => setPosttitle(e.target.value)} />
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // End OTP Modal */}
    </>
  )
}
