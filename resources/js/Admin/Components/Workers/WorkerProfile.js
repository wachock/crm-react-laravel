import React, { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";

export default function WorkerProfile() {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [renewal_date, setRenewalDate] = useState('');
  const [gender, setGender] = useState('male');
  const [payment_hour, setPaymentHour] = useState(0);
  const [worker_id, setWorkerId] = useState(Math.random().toString().concat("0".repeat(3)).substr(2,5));
  const [password, setPassword] = useState('00000');
  const [address, setAddress] = useState('');
  const [skill,setSkill] = useState([]);
  const [avl_skill,setAvlSkill] = useState([]);
  const [itemStatus, setItemStatus] = useState('');

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
            });
    };
    useEffect(() => {
        getWorker();
    }, []);
    
    return (
      <form>
          <div className='row'>
              <div className='col-sm-4'>
                  <div className='form-group'>
                      <label className='control-label'>Full Name</label>
                      <input disabled type='text' value={firstname+ ' ' +lastname} onChange={(e) => setFirstName(e.target.value)} className='form-control' placeholder='Enter First Name' />
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
                      <label className='control-label'>Password</label>
                      <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' disabled />
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
                      <select disabled className="form-control" value={itemStatus} onChange={(e) => setItemStatus(e.target.value)}>
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
