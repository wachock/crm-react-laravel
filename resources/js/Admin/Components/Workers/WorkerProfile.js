import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function WorkerProfile() {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [renewal_date, setRenewalDate] = useState('');
    const [gender, setGender] = useState('male');
    const [payment_hour, setPaymentHour] = useState(0);
    const [worker_id, setWorkerId] = useState(Math.random().toString().concat("0".repeat(3)).substr(2, 5));
    const [password, setPassword] = useState('00000');
    const [address, setAddress] = useState('');
    const [skill, setSkill] = useState([]);
    const [avl_skill, setAvlSkill] = useState([]);
    const [itemStatus, setItemStatus] = useState('');
    const [pass, setPass] = useState(null);
    const [passVal, setPassVal] = useState(null);
    const viewPass = () => {
        if (!passVal) { window.alert('Please enter your password'); return; }
        axios
            .post(`/api/admin/viewpass`, { id: localStorage.getItem('admin-id'), pass: passVal }, { headers })
            .then((res) => {
                if (res.data.response == false) {
                    window.alert('Wrong password!');
                } else {
                    setPass(password);
                    document.querySelector('.closeb1').click();
                }
            })
    }

    const params = useParams();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getWorker = () => {
        axios
            .get(`/api/admin/workers/${params.id}/edit`, { headers })
            .then((response) => {
                setFirstName(response.data.worker.firstname);
                setLastName(response.data.worker.lastname);
                setPhone(response.data.worker.phone);
                setRenewalDate(response.data.worker.renewal_visa);
                setGender(response.data.worker.gender);
                setPaymentHour(response.data.worker.payment_per_hour);
                setWorkerId(response.data.worker.worker_id);
                setPassword(response.data.worker.passcode);
                setSkill(response.data.worker.skill);
                setAddress(response.data.worker.address);
                setItemStatus(response.data.worker.status);
                setEmail(response.data.worker.email);
            });
    };
    useEffect(() => {
        getWorker();
    }, []);
    return (
        <>
            <div className='worker-profile'>
                <h2>#{worker_id} {firstname + ' ' + lastname}</h2>
                <div className='dashBox p-4 mb-3'>
                    <form>
                        <div className='row'>
                            {/* <div className='col-sm-4'>
                            <div className='form-group'>
                                <label className='control-label'>Email</label>
                                <input disabled type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Enter Email' />
                            </div>
                        </div> */}
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Phone</label>
                                    <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Renewal of Visa</label>
                                    <input type='text' value={renewal_date} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Gender</label>
                                    <input type='text' value={gender} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Payment Per Hour</label>
                                    <input type='text' value={payment_hour} onChange={(e) => setPhone(e.target.value)} className='form-control' disabled />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Worker Id</label>
                                    <input disabled type='text' value={worker_id} onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Enter Last Name' />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Worker email</label>
                                    <input disabled type='text' value={email} onChange={(e) => setLastName(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Password</label>

                                    {
                                        pass == null ?

                                            <span style={{ cursor: 'pointer', border: 'none' }} className='form-control' data-toggle="modal" data-target="#exampleModalPass">******** &#128274;</span>
                                            :
                                            <span style={{ border: 'none' }} className='form-control'>{pass}</span>
                                    }

                                </div>
                            </div>

                            <div className='col-sm-8'>
                                <div className='form-group'>
                                    <label className='control-label'>Address</label>
                                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' disabled />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label className='control-label'>Status</label>
                                    <p>{itemStatus ? 'Active' : 'Inactive'}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal fade" id="exampleModalPass" tabindex="-1" role="dialog" aria-labelledby="exampleModalPass" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="control-label">
                                                Enter your password
                                            </label>
                                            <input
                                                type="password"
                                                onChange={(e) =>
                                                    setPassVal(e.target.value)
                                                }
                                                className="form-control"
                                                required
                                                placeholder="Enter your password"
                                            />

                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary closeb1" data-dismiss="modal">Close</button>
                                <button type="button" onClick={viewPass} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
