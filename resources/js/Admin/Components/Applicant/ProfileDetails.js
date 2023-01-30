import React, { useState } from 'react'
import profile from '../../../Assets/image/applicant-profile.jpeg'

export default function ProfileDetails() {
  const [ adTitle, setAdTitle ] = useState('Professional Care Taker');
  const [ type, setType ] = useState('Life assistant');
  const [firstname, setFirstName] = useState('Alex');
  const [lastname, setLastName] = useState('Adams');
  const [email, setEmail] = useState('alex999@gmail.com'); 
  const [phone, setPhone] = useState('9088781234');
  const [gender, setGender] = useState('Male');
  const [birth, setBirth] = useState('02-06-1994');
  const [address, setAddress] = useState('C-6, Sector 7, Noida');
  const [nationality, setNationality] = useState('French');
  
  return (
    <form className='dashBox mt-3 p-3'>
        <div className='row'>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Profile Type</label>
                    <input type='text' value={type} onChange={(e) => setType(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Ad Title</label>
                    <input type='text' value={adTitle} onChange={(e) => setAdTitle(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>First Name</label>
                    <input disabled type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} className='form-control' placeholder='Enter First Name' />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Last Name</label>
                    <input disabled type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Enter Last Name' />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Email</label>
                    <input disabled type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Phone</label>
                    <input disabled type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' placeholder='Phone' />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Date of Birth</label>
                    <input disabled type='text' value={birth} onChange={(e) => setBirth(e.target.value)} className='form-control' placeholder='Date of Birth' />
                </div>
            </div>
            <div className='col-sm-6'>
                <div className='form-group'>
                    <label className='control-label'>Gender</label>
                    <input disabled type='text' value={gender} onChange={(e) => setGender(e.target.value)} className='form-control' placeholder='Gender' />
                </div>
            </div>
            <div className='col-sm-12'>
                <div className='form-group'>
                    <label className='control-label'>Nationality</label>
                    <input disabled type='text' value={nationality} onChange={(e) => setNationality(e.target.value)} className='form-control' placeholder='Nationality' />
                </div>
            </div>
        </div>
        <div className='form-group'>
            <label className='control-label'>Address</label>
            <input disabled type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' placeholder='Enter your address' />
        </div>
        <div className='form-group'>
            <label className='control-label'>Profile Picture</label>
            <img src={profile} className='img-fluid' alt='Profile' style={{display: "block", maxWidth: "100px"}} />
        </div>
    </form>
  )
}
