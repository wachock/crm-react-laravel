import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'

export default function AddTeam() {
  const [ name, setName ] = useState([]);
  const [ email, setEmail ] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ address, setAddress ] = useState([]);
  const [ color, setColor ] = useState([]);
  const [ password, setPassword ] = useState([]);
  const [ confirmPassword, setConfirmPassword ] = useState([]);
  const [ status, setStatus ] = useState([]);
  return (
    <div id='container'>
        <Sidebar/>
        <div id='content'>
            <h1 className="page-title">Add Team member</h1>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='dashBox p-4'>
                        <div className='form-group'>
                            <label className='control-label'>Name</label>
                            <input type='text' className='form-control' onChange={(e) => setName(e.target.value)} placeholder='Name' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Email</label>
                            <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Phone</label>
                            <input type='tel' className='form-control' onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Address</label>
                            <input type='text' className='form-control' onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='dashBox p-4'> 
                        <div className='form-group'>
                            <label className='control-label'>Color</label>
                            <input type='color' className='form-control' onChange={(e) => setColor(e.target.value)} placeholder='Color' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Password</label>
                            <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Confirm Password</label>
                            <input type='password' className='form-control' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                        </div>
                        <div className='form-group'>
                            <label className='control-label'>Status</label>
                            <select className='form-control' onChange={(e) => setStatus(e.target.value)}>
                                <option value=''>Please Select</option>
                                <option value='1'>Enable</option>
                                <option value='0'>Disable</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12'>
                    <div className='dashBox p-4 mt-3'>
                        <h4 className='mb-2'>Preset permissions</h4>
                        <div className='form-group'>
                            <input type='radio' id='worker' name='role' checked style={{height: "unset"}} /> Make Worker
                            <input type='radio' id='administrator' name='role' style={{height: "unset", marginLeft: "10px"}} /> Make Administrator
                        </div>
                        <div className='form-group'>
                            <input type="submit" class="btn btn-pink saveBtn" value="SAVE" />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}
