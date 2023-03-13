import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams,useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditWorker() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [renewal_date, setRenewalDate] = useState('');
  const [gender, setGender] = useState('male');
  const [payment_hour, setPaymentHour] = useState(0);
  const [worker_id, setWorkerId] = useState(Math.random().toString().concat("0".repeat(3)).substr(2,5));
  const [password, setPassword] = useState('');
  const [lng,setLng]     = useState("");
  const [address, setAddress] = useState('');
  const [skill,setSkill] = useState([]);
  const [itemStatus, setItemStatus] = useState('');
  const [country, setCountry] = useState('Israel');

  const [countries,setCountries] = useState([]);
  const [avl_skill,setAvlSkill] = useState([]);

  const [errors, setErrors] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  const handleSkills = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if(checked){
          setSkill([...skill,value]);
        }else{
           setSkill(skill.filter( (e) => ( e !== value ) ));
        }
  }
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone,
        "email":email,
        "address": address,
        "renewal_visa": renewal_date,
        "gender": gender,
        "payment_hour": payment_hour,
        "lng":(lng != 0) ? lng :'heb',
        "worker_id": worker_id,
        "password": password,
        "skill": skill,
        "status": itemStatus,
        "country":country,
    }

        axios
            .put(`/api/admin/workers/${params.id}`, data ,{ headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Worker has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/workers");
                    }, 1000);
                }
            });
    };


    const getWorker = () => {
        axios
            .get(`/api/admin/workers/${params.id}/edit`, { headers })
            .then((response) => {
                setFirstName(response.data.worker.firstname);
                setLastName(response.data.worker.lastname);
                setEmail(response.data.worker.email);
                setPhone(response.data.worker.phone);
                setRenewalDate(response.data.worker.renewal_visa);
                setGender(response.data.worker.gender);
                setPaymentHour(response.data.worker.payment_per_hour);
                setWorkerId(response.data.worker.worker_id);
                setPassword(response.data.worker.passcode);
                setSkill(response.data.worker.skill);
                setAddress(response.data.worker.address);
                setItemStatus(response.data.worker.status);
                setLng(response.data.worker.lng);
                setCountry(response.data.worker.country);
            });
    };
     const getAvailableSkill = () => {
        axios
            .get(`/api/admin/services/create`, { headers })
            .then((response) => {
                setAvlSkill(response.data.services);
            });
    };
    const getCountries = () => {
        axios
            .get(`/api/admin/countries`, { headers })
            .then((response) => {
                setCountries(response.data.countries);
            });
    };
    useEffect(() => {
        getWorker();
        getCountries();
        getAvailableSkill();
        
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title editEmployer">Edit Worker</h1>
                    <div className="dashBox p-4">
                        <form>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>First Name *</label>
                                        <input type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} className='form-control' required placeholder='Enter First Name' />
                                        {errors.firstname ? (
                                            <small className="text-danger mb-1">
                                                {errors.firstname}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Last Name</label>
                                        <input type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} className='form-control' placeholder='Enter Last Name' />
                                    </div>
                                </div>
                                 <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Email</label>
                                        <input type='tyoe' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                                        {errors.email ? (
                                            <small className="text-danger mb-1">
                                                {errors.email}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Phone</label>
                                        <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' placeholder='Phone' />
                                        {errors.phone ? (
                                            <small className="text-danger mb-1">
                                                {errors.phone}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Gender</label>
                                    </div>
                                    <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} />Male
                                    </label>
                                    </div>
                                    <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input type="radio" className="form-check-input" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} />Female
                                    </label>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Payment Per Hour (NIS)</label>
                                        <input type='text' value={payment_hour} onChange={(e) => setPaymentHour(e.target.value)} className='form-control' placeholder='Payment Per Hour' />
                                    </div>
                                    
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Worker Id</label>
                                        <input type='text' value={worker_id} onChange={(e) => setWorkerId(e.target.value)} className='form-control' placeholder='Payment Per Hour' />
                                    {errors.worker_id ? (
                                            <small className="text-danger mb-1">
                                                {errors.worker_id}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Password *</label>
                                        <input type='text'  onChange={(e) => setPassword(e.target.value)} className='form-control' required placeholder='Password' />
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group">
                                    <label className="control-label">Language</label>
                                    
                                    <select
                                        className="form-control"
                                        value={lng}
                                        onChange={(e) => setLng(e.target.value)}
                                    >
                                        <option value={0}>Please select language</option>
                                        <option value="heb" selected={lng == "heb"}>Hebrew</option>
                                        <option value="en" selected={lng == "en"}>English</option>
                                    </select>
                                    </div>
                                </div>
                                 <div className='col-sm-6'>
                                        <div className="form-group">
                                        <label className="control-label">Country</label>
                                        
                                        <select
                                            className="form-control"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                        {countries && countries.map((item,index)=>(

                                            <option value={item.name} selected={(country==item.name)?true:false}>{item.name}</option>
                                        ))}
                                        </select>
                                    </div>
                               </div>
                               {country != 'Israel' &&
                                 <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Renewal of visa </label>
                                        <input type='date' selected={renewal_date} value={renewal_date} onChange={(e) => setRenewalDate(e.target.value)} className='form-control' placeholder='Email' />
                                    </div>
                                    
                                </div>
                                }
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Address</label>
                                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' placeholder='Enter your address' />
                                {errors.address ? (
                                            <small className="text-danger mb-1">
                                                {errors.address}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                            </div>
                            <div className='col-sm-12'>
                                    <div className='form-group'>
                                        <label className='control-label'>Skills</label>
                                    </div>
                                {avl_skill && avl_skill.map((item,index)=>(
                                    <div className="form-check" key={index}>
                                <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="skills" value={item.id} onChange={handleSkills} checked={skill.includes((item.id).toString())} />{item.name}
                                </label>
                                </div>

                                    ))}
                            </div>
                            <div className='form-group mt-4'>
                                <label className='control-label'>Status</label>
                                <select className='form-control' value={itemStatus} onChange={(e) => setItemStatus(e.target.value)}>
                                    <option>Please select</option>
                                    <option value="1">Enable</option>
                                    <option value="0">Disable</option>
                                </select>
                                {errors.status ? (
                                            <small className="text-danger mb-1">
                                                {errors.status}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                            </div>
                            <div className="form-group text-center">
                                <input type='submit' value='Update'  onClick={handleUpdate} className="btn btn-danger saveBtn"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
