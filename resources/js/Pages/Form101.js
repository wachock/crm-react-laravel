import React from 'react'
import logo from "../Assets/image/logo.png";
import check from "../Assets/image/icons/check-mark.png";

export default function Form101() {
  return (
    <div className='container'>
      <div className='form101 maxWidthControl p-4'>
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
          <form>
            <div className='row'>
              <div className='col-sm-6 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>Name</label>
                  <input type='text' className='form-control' placeholder='Name' />
                </div>
              </div>
              <div className='col-sm-6 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>Address</label>
                  <input type='text' className='form-control' placeholder='Address' />
                </div>
              </div>
              <div className='col-sm-6 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>Phone Number</label>
                  <input type='tel' className='form-control' placeholder='Phone Number' />
                </div>
              </div>
              <div className='col-sm-6 col-xs-6'>
                <div className='form-group'>
                  <label className='control-label'>Deduction file ID</label>
                  <input type='text' className='form-control' placeholder='Deduction file ID' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
