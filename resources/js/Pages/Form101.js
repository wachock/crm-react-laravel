import React, { useState } from 'react'
import logo from "../Assets/image/logo.png";
import check from "../Assets/image/icons/check-mark.png";

export default function Form101() {
  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };
  console.log(selected);
  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className='container'>
      <div className='form101 p-4'>
        <img src={logo} className='img-fluid broom-logo' alt='Broom Services' />
        <h1 className='text-center'>Form 101</h1>
        <p className='text-center max600'>Employee card - and a request for tax relief and coordination by the employer according to the Income Tax Regulations (deduction from salary and wages), 1993</p>
        <p className='text-center max600'>This form will be filled out by each employee upon starting his job, as well as at the beginning of each tax year (unless the manager has approved otherwise). The form is a reference for the employer to provide tax relief and to make tax adjustments in the calculation of the employee's salary. If there is a change in the details - this must be declared within a week.</p>
        <hr/>
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>Fill out the form and at the bottom of the page you can Download a PDF file with the details you filled out. The file you will receive is a normal and standard Form 101.</p>
          </div>
        </div>
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>Send the form by email to you and the employer.</p>
          </div>
        </div>
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>Save a draft of the form and continue later.</p>
          </div>
        </div>
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>The form is a free service operated by the Broom Service and not operated by the Tax Authority and is not approved by it.</p>
          </div>
        </div> 
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>Note! If your employer uses a different system for forms 101 - you must fill out the form there. It is recommended to check with the employer.</p>
          </div>
        </div> 
        <div className='agg-list'>
          <div className='icons'><img src={check} /></div>
          <div className='agg-text'>
              <p>Your privacy is important to us. We do not use your information and do not transfer it to third parties.</p>
          </div>
        </div> 
        <div className='box-heading'>
          <h2>Tax year</h2>
          <p><strong>2023</strong> (The form can only be filled out for the current tax year. Except in the month of December, when the form can also be filled out for the next tax year and in the month of January, when the form can be filled out also for the previous tax year, for the benefit of employees who did not have time to fill out the form in time.)</p>
        </div>  
        <div className='box-heading'>
          <h2>A. Employer details</h2>
          <div className='row'>
            <div className='col-sm-3 col-xs-6'>
              <div className='form-group'>
                <label className='control-label'>Name*</label>
                <input type='text' className='form-control' placeholder='Name' required />
              </div>
            </div>
            <div className='col-sm-3 col-xs-6'>
              <div className='form-group'>
                <label className='control-label'>Address</label>
                <input type='text' className='form-control' placeholder='Address' />
              </div>
            </div>
            <div className='col-sm-3 col-xs-6'>
              <div className='form-group'>
                <label className='control-label'>Phone Number*</label>
                <input type='tel' className='form-control' placeholder='Phone Number' required />
              </div>
            </div>
            <div className='col-sm-3 col-xs-6'>
              <div className='form-group'>
                <label className='control-label'>Deduction file ID</label>
                <input type='text' className='form-control' placeholder='Deduction file ID' />
              </div>
            </div>
          </div>
        </div>
        <div className='box-heading'>
          <h2>B. Employee details</h2>
          <div className='row'>
            <div className='col-sm-4 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>First name*</label>
                  <input type='text' className='form-control' placeholder='First name' required />
                </div>
            </div>
            <div className='col-sm-4 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>Last name*</label>
                  <input type='text' className='form-control' placeholder='Last name' required />
                </div>
            </div>
            <div className='col-sm-4 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label d-block'>Identification by*</label>

                  <input className='mr-1' type="radio" name="identification" value="byId" id="byId" checked={selected === "byId"} onChange={changeHandler}/>
                  <label className='mr-2' htmlFor="byId">ID</label>
                    
                  <input className='mr-1' type="radio" value="passport" id="passport" checked={selected === "passport"} name="identification" onChange={changeHandler}/>
                  <label className='mr-2' ohtmlFor="passport">Passport (for a foreign citizen)</label>
                  
                </div>
            </div>
            <div className='col-sm-12'>
              <div aria-hidden={selected !== "byId" ? true : false}>
                <div className='row'>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">ID Number*</label>
                      <input type='text' className="form-control" placeholder="" required />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Photocopy of ID card and appendix</label>
                      <input type="file" onChange={handleChange} style={{display: "block"}} />
                      <img src={file} className="img-fluid" style={{maxWidth: "100px"}} />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Date of Birth*</label>
                      <input type='date' className="form-control" placeholder="" required />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Date of immigration</label>
                      <input type='date' className="form-control" placeholder="" />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Address</label>
                      <input type='text' className="form-control" placeholder="Address" />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Mobile number*</label>
                      <input type='tel' className="form-control" placeholder="Mobile number" required />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Phone number</label>
                      <input type='tel' className="form-control" placeholder="Phone number" />
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label">Email*</label>
                      <input type='email' className="form-control" placeholder="Email" required/>
                    </div>
                  </div>
                  <div className='col-sm-4 col-xs-6'>
                    <div className='form-group'>
                      <label className="control-label d-block">Sex*</label>
                      <input className='mr-1' type="radio" name="sex" value="Male" id="Male" checked />
                      <label className='mr-2' htmlFor="Male">Male</label>
                        
                      <input className='mr-1' type="radio" value="Female" id="Female" name="sex" />
                      <label className='mr-2' ohtmlFor="Female">Female</label>
                    </div>
                  </div>
                  {/* <div className='col-sm-12'>
                    <div className='row'>
                      <div className=''></div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className='col-sm-12'>
              <div aria-hidden={selected !== "passport" ? true : false}>
                This is Passport
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
