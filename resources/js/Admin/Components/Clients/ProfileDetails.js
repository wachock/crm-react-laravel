import React, { useState } from 'react'

export default function ProfileDetails() {
  
  const [firstname, setFirstName] = useState('Alex');
  const [lastname, setLastName] = useState('Adams');
  const [invoiceName, setInvoiceName] = useState('Adams');
  const [email, setEmail] = useState('alex999@gmail.com'); 
  const [phone, setPhone] = useState('9088781234');

  const [city,setCity] = useState("Netanya");
  const [streetNumber,setStreetNumber] = useState("13, Pirhei Hen");
  const [floor,setFloor] = useState("Fourth");
  const [Apt,setApt] = useState("Heaven");
  const [enterance,setEnterance] = useState("5");
  const [zip,setZip] = useState("1231400");
  const [dob,setDob] = useState("19/03/1985");
  const [passcode, setPassCode] = useState("1380600");
  const [color, setColor] = useState("#000000");
  const [status, setStatus] = useState("Inactive");
  
  return (
    <form>
        <div className='row'>
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
                    <label className='control-label'>Invoice Name</label>
                    <input disabled type='text' value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} className='form-control' placeholder='Enter Invoice name' />
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
                    <label className='control-label'>Passcode</label>
                    <input type='text' value={passcode} onChange={(e) => setPassCode(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Phone</label>
                    <input type='tel' name = {'phone[]'} value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>City</label>
                    <input type='text' value={city} onChange={(e) => setCity(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Street and numbe</label>
                    <input type='text' value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Floor</label>
                    <input type='text' value={floor} onChange={(e) => setFloor(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Apt number</label>
                    <input type='text' value={Apt} onChange={(e) => setApt(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Enterance code</label>
                    <input type='text' value={enterance} onChange={(e) => setEnterance(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Zip Code</label>
                    <input type='text' value={zip} onChange={(e) => setZip(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Dob</label>
                    <input type='text' value={dob} onChange={(e) => setDob(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Color</label>
                    <input type='text' value={color} onChange={(e) => setColor(e.target.value)} className='form-control' disabled />
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='form-group'>
                    <label className='control-label'>Status</label>
                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
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
