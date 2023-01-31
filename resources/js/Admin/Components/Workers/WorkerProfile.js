import React, { useState } from 'react'

export default function WorkerProfile() {

  const [adtitle, setAdTitle] = useState('Alex');
  const [firstname, setFirstName] = useState('Hoppe');
  const [lastname, setLastName] = useState('Adams');
  const [email, setEmail] = useState('alex999@gmail.com');
  const [password, setPassword] = useState('******');
  const [confirmPassword, setConfirmPassword] = useState('******');
  const [phone, setPhone] = useState('9088781234');
  const [address, setAddress] = useState('13, Pirhei Hen');
  const [itemStatus, setItemStatus] = useState('Inactive');
    
    return (
      <form>
          <div className='row'>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Ad Title</label>
                      <input disabled type='text' value={adtitle} onChange={(e) => setAdTitle(e.target.value)} className='form-control' placeholder='Enter First Name' />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>First Name</label>
                      <input disabled type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} className='form-control' placeholder='Enter First Name' />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Last Name</label>
                      <input disabled type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Enter Last Name' />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Email</label>
                      <input disabled type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Password</label>
                      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' disabled />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Confirm Password</label>
                      <input type='password'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-control' disabled />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Phone</label>
                      <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Address</label>
                      <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' disabled />
                  </div>
              </div>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Status</label>
                      <select className="form-control" value={itemStatus} onChange={(e) => setItemStatus(e.target.value)}>
                          <option>Please select</option>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                      </select>
                  </div>
              </div>
          </div>
      </form>
    )
  }
