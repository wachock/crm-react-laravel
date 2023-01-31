import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'


export default function AddWorker() {
  const [adTitle, setAdTitle] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [itemStatus, setItemStatus] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone,
        "address": address,
        "itemStatus": itemStatus
    }
  }
  return (
    <div id='container'>
       <Sidebar/>
        <div id="content">
            <div className='edit-customer'>
                <h1 className="page-title addEmployer">Add Worker</h1>
                <form>
                    <div className='form-group'>
                        <label className='control-label'>Ad Title</label>
                        <input type='text' value={adTitle} onChange={(e) => setAdTitle(e.target.value)} className='form-control' placeholder='Ad Title' />
                    </div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>First Name *</label>
                                <input type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} className='form-control' required placeholder='Enter First Name' />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Last Name *</label>
                                <input type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} className='form-control' required placeholder='Enter Last Name' />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Email *</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' required placeholder='Email' />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Phone</label>
                                <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' placeholder='Phone' />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Password *</label>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' required placeholder='Password' />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Confirm Password *</label>
                                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-control' required placeholder='Confirm Password' />
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>Address</label>
                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' placeholder='Enter your address' />
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>Status</label>
                        <select className='form-control' value={itemStatus} onChange={(e) => setItemStatus(e.target.value)}>
                            <option>Please select</option>
                            <option value="1">Enable</option>
                            <option value="0">Disable</option>
                        </select>
                    </div>
                    <div className="form-group text-center">
                        <input type='submit' value='SAVE'  onClick={handleSubmit} className="btn btn-danger saveBtn"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}