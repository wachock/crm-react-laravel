import React from 'react'
import Profileimage from '../../../Assets/image/Frontend/profileimage.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
export default function MyAccount() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <div className='MyAccount'>
        <div className='row'>
            <div className='col-sm-2'>
                <div className='profileimg text-right'>
                    <img src={Profileimage} alt='Profile' className='img-fluid' width={60} height={60} />
                </div>
            </div>
            <div className='col-sm-8'>
                <div className='Accountinfo'>
                    <h2>Allie Grater</h2>
                    <ul className='VerifyContact'>
                        <li className='d-flex'><FaMapMarkerAlt/><p>8 rue Gouin de, 59280</p></li>
                        <li className='d-flex'><FaEnvelope/><p>alliegrater@gmail.com</p><span>Verified</span></li>
                        <li className='d-flex'><FaPhoneAlt/><p>+33 999 258 231</p><span>Verified</span></li>
                    </ul>
                </div>
            </div>
            <div className='col-sm-2 text-right'>
                <a className='mofify' onClick={handleShow}>Modify</a>
            </div>
        </div>
    </div>
    {/* // Edit Account Modal */}
    <Modal size="lg" show={show} onHide={handleClose} className="EditAcoount">
        <Modal.Header closeButton>
          <Modal.Title>Edit your account details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div class="custom-file text-center">
                            <input type="file" class="custom-file-input" id="customFile"/>
                            <label class="custom-file-label" for="customFile"></label>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name='posttitle' className='inputstyle' placeholder="Enter first name" onChange={e => setPosttitle(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='col-sm-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Nom de famille</Form.Label>
                            <Form.Control type="text" name='posttitle' className='inputstyle' placeholder="Entrez nom de famille" onChange={e => setPosttitle(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='col-sm-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name='posttitle' className='inputstyle' placeholder="Entrez votre email" onChange={e => setPosttitle(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='col-sm-12'>
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
                    </div>
                    <div className='col-sm-6'>
                        <Form.Group controlId="formselect1" className='mb-3'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select defaultValue="Auxiliaire de vie" name='lookingfor' className='form-control selectstyle' onChange={e => setLookingfor(e.target.value)} >
                            <option value='Auxiliaire de vie'>Homme</option>
                            <option value='Dame de compagnie'>Femme</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='col-sm-6'>
                        <Form.Group className='mb-3' controlId="exampleForm.ControlInput8">
                            <Form.Label>Date de naissance</Form.Label>
                            <Form.Control type="date" name='date' className='inputstyle' onChange={e => setDate(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='col-sm-12'>
                        <Form.Group className='mb-3' controlId="exampleForm.ControlInput6">
                            <Form.Label>Numéro de téléphone</Form.Label>
                            <PhoneInput
                                placeholder="Entrez votre numéro de téléphone"
                                // value={value}
                                defaultCountry="FR"
                                // onChange={setContact}
                                name='contact'
                                //onChange={e => setContact(e.target.value)}
                                />
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // End Edit Account Modal */}
      </>
  )
}
