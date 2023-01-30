import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PhoneInput from 'react-phone-number-input';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function YourPulses() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleSubmit = () => {
      navigate("/applicant/email-confirmation")
  }
  
  return (
    <Form>
      <div className='row'>
        <div className='col-sm-12'>
            <Form.Group controlId="formselect1" className='mb-3'>
                <Form.Label>Number of year(s) of experience: </Form.Label>
                <Form.Select defaultValue="life assistant" name='lookingfor' className='form-control selectstyle' onChange={e => setLookingfor(e.target.value)} >
                    <option value='0-1 year'>0-1 year</option>
                    <option value='1-3 years'>1-3 years</option>
                    <option value='3-5 years'>3-5 years</option>
                    <option value='+5 years'>+5 years</option>
                </Form.Select>
            </Form.Group>
            <Form.Label>Tasks you can do</Form.Label>
              <div className='row'>
                <div className='col-sm-6'>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accompaniment during various activities" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="To do the housework" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Laundry" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Meal preparation" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accompaniment on outings" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Shopping/Pharmacy" />
                  </Form.Group>
                </div>
                <div className='col-sm-6'>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Help with the toilet" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Help getting up and going to bed" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Assistance with meals" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Help with taking medication" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Caring for a person with Alzheimer's disease" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Day and night care" />
                  </Form.Group>
                </div>
              </div> 
              <Form.Group className='mb-3' controlId="exampleForm.ControlInput6">
                <Form.Label>Contact Number</Form.Label>
                <PhoneInput
                    placeholder="Enter your contact number"
                    value={value}
                    defaultCountry="FR"
                    // onChange={setContact}
                    name='contact'
                    //onChange={e => setContact(e.target.value)}
                    />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Driver's license </Form.Label>
                <div className="radio">
                    <label className='custom-radio'>
                        <input type="radio" value='Yes' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">Yes</span>
                    </label>
                    <label className='custom-radio'>
                        <input type="radio" value='No' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">No</span>
                    </label>
                </div>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Motorized </Form.Label>
                <div className="radio">
                    <label className='custom-radio'>
                        <input type="radio" value='Yes' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">Yes</span>
                    </label>
                    <label className='custom-radio'>
                        <input type="radio" value='No' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">No</span>
                    </label>
                </div>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>First Aid Diploma (PSC1) </Form.Label>
                <div className="radio">
                    <label className='custom-radio'>
                        <input type="radio" value='Yes' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">Yes</span>
                    </label>
                    <label className='custom-radio'>
                        <input type="radio" value='No' className="btn-check" id="bordered-radio-1" />
                        <span className="forcustom">No</span>
                    </label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                <Form.Label>A little more about you: studies, work, interests, hobbies, sport</Form.Label>
                <Form.Control as="textarea" name='description' className='textareastyle'  />
            </Form.Group>
        </div>
        <div className='col-sm-12 text-center'>
          <Form.Group>
            <Button as="input" type="submit" value="SAVE" className='btn btn-primary' onClick={handleSubmit}/>
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}
