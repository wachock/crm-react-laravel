import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { useParams, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';

export default function EditTeam() {

    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const [status, setStatus] = useState([]);
    const [color, setColor] = useState([]);
    const [permission, setPermission] = useState([]);

    const alert = useAlert();
    const param = useParams();
    const navigate = useNavigate();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleUpdate = () => {
        let perm = document.querySelector('input[name="role"]:checked').value;
        const data = {
            name: name,
            email: email,
            phone: phone,
            address, address,
            color: color,
            password: password,
            confirmation: confirmPassword,
            status: status,
            role: perm
        }

        axios
            .put(`/api/admin/team/${param.id}`, data, { headers })
            .then((res) => {
                if (res.data.errors) {
                    for (let e in res.data.errors) {
                        alert.error(res.data.errors[e]);
                    }
                } else {
                    alert.success(res.data.message)
                    setTimeout(() => {
                        navigate("/admin/manage-team");
                    }, 1000)
                }
            });

    };

    const getMember = () => {
        axios
            .get(`/api/admin/team/${param.id}/edit`, { headers })
            .then((res) => {
                const d = res.data.member[0];
                setName(d.name);
                setEmail(d.email);
                setPhone(d.phone);
                setAddress(d.address);
                setStatus(d.status);
                setPermission(d.role);
                if(d.color) {
                    let clr = document.querySelectorAll('input[name="color"]');
                    clr.forEach((e,i)=>{
                       console.log(e.value);
                       e.value == d.color
                       ? e.checked = true
                       :''
                    })
                   }
            })
    };
    useEffect(() => {
        getMember();
    }, []);
    return (
        <div id='container'>
            <Sidebar />
            <div id='content'>
                <h1 className="page-title">Edit Team member</h1>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='dashBox p-4'>
                            <div className='form-group'>
                                <label className='control-label'>Name</label>
                                <input type='text' className='form-control' onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Email</label>
                                <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Phone</label>
                                <input type='tel' className='form-control' onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='Phone' />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Address</label>
                                <input type='text' className='form-control' onChange={(e) => setAddress(e.target.value)} value={address} placeholder='Address' />
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='dashBox p-4'>
                            <div className="form-group">
                                <div className="form-check form-check-inline1">
                                    <label class="form-check-label" for="title">Color</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#9400D3" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="voilet">Voilet</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#4B0082" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="voilet">Indigo</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#0000FF" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="Blue">Blue</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#00FF00" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="Green">Green</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#FFFF00" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="Yellow">Yellow</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#FF7F00" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="Orange">Orange</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input type="radio" name="color" value="#FF0000" onChange={(e) => setColor(e.target.value)} />
                                    <label class="form-check-label" for="Red">Red</label>
                                </div>
                            </div>


                            <div className='form-group'>
                                <label className='control-label'>Password</label>
                                <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Confirm Password</label>
                                <input type='password' className='form-control' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Confirm Password' />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Status</label>
                                <select className='form-control' onChange={(e) => setStatus(e.target.value)}>
                                    <option value='1' selected={status == 1} >Enable</option>
                                    <option value='0' selected={status == 0}>Disable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12'>
                        <div className='dashBox p-4 mt-3'>
                            <h4 className='mb-2'>Preset permissions</h4>
                            <div className='form-group'>
                                {
                                    permission == 'member'
                                        ? <input type='radio' value='member' name='role' checked style={{ height: "unset" }} />
                                        : <input type='radio' value='member' name='role' style={{ height: "unset" }} />
                                } Make Member &nbsp;

                                {
                                    permission == 'admin'
                                        ? <input type='radio' value='admin' name='role' checked style={{ height: "unset" }} />
                                        : <input type='radio' value='admin' name='role' style={{ height: "unset" }} />
                                } Make Administrator
                            </div>
                            <div className='form-group'>
                                <input type="submit" onClick={handleUpdate} class="btn btn-pink saveBtn" value="SAVE" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
