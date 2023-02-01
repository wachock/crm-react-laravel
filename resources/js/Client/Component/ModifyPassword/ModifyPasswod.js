import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaLock } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
export default function ModifyPasswod() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <div className='MyAccount'>
        <div className='row'>
            <div className='col-sm-2 text-right custom-lock'>
                <FaLock/>
            </div>
            <div className='col-sm-8'>
                <div className='Accountinfo'>
                    <h2>Password</h2>
                    <p>Click on 'Modify' to reset your password. We regularly check accounts to make sure they are as secure as possible. We will notify you if you need to strengthen the security of your account.</p>
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
          <Modal.Title>Modify your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='row'> 
                    <div className='col-sm-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Enter New password</Form.Label>
                            <Form.Control type="password" name='posttitle' className='inputstyle' placeholder="Enter New password" onChange={e => setPosttitle(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className='col-sm-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name='posttitle' className='inputstyle' placeholder="Confirm Password" onChange={e => setPosttitle(e.target.value)} />
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* // End Edit Account Modal */}
      </>
  )
}
