import axios from 'axios';
import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

export default function AddTeam() {

  const [ name, setName ] = useState([]);
  const [ email, setEmail ] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ address, setAddress ] = useState([]);
  const [ password, setPassword ] = useState([]);
  const [ confirmPassword, setConfirmPassword ] = useState([]);
  const [ status, setStatus ] = useState([]);
  
  const alert = useAlert();
  const navigate = useNavigate();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };
  
  const handleSubmit =() =>{
     let perm = document.querySelector('input[name="role"]:checked').value; 
     let clr  = document.querySelector('input[name="color"]').value
        const data = {
           name:name,
           email:email,
           phone:phone,
           address,address,
           color:clr,
           password:password,
           confirmation:confirmPassword,
           status:status,
           permission:perm
        }
        
        axios
        .post(`/api/admin/team`,data,{headers})
        .then((res)=>{
            if(res.data.errors){
                for(let e in res.data.errors){
                    alert.error(res.data.errors[e]);
                } 
            } else {
                alert.success(res.data.message)
                setTimeout(()=>{
                   navigate("/admin/manage-team");
                },1000)
            }
        });
        
  };
  
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
                            <input type='color' name='color' className='form-control' placeholder='Color' />
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
                            <input type='radio'  name='role' value='member' style={{height: "unset"}}  checked /> Make Member
                            <input type='radio'  name='role' value='administrator'  style={{height: "unset", marginLeft: "10px"}} /> Make Administrator
                        </div>
                        <div className='form-group'>
                            <input type="submit" onClick={handleSubmit} class="btn btn-pink saveBtn" value="SAVE" />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}
