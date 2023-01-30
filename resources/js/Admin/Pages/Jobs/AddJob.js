import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';


export default function AddJob() {
    const [title, setTitle] = useState('');
    const [applicant, setApplicant] = useState('');
    const [employer, setEmployer] = useState('');
    const [rate, setRate] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const applicantData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
        item => ({ label: item, value: item })
    );
    const [workSlot, setWorkSlot] = useState([
        {day: "Monday", time: "8 AM - 10 AM"},
        {day: "Tuesday", time: "3 PM - 4 PM"},
        {day: "Wednesday", time: "6 PM - 7 PM"}
        
    ])
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, applicant, employer, rate, location);
    }
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="edit-customer">
                <h1 className="page-title editJob">Add Job</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Job Title *</label>
                        <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} className='form-control' placeholder="Job Title"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Applicant Name *</label>
                        <SelectPicker data={applicantData} size="lg" required/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Employer Name *</label>
                        <input type="text" value={employer} onChange={(e) => setEmployer(e.target.value)} className="form-control" placeholder="Employer Name"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Rate per hour *</label>
                        <input type="text" value={rate} onChange={(e) => setRate(e.target.value)} className="form-control" placeholder="Rate per hour"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Time Slots</label>
                        <div className='items-time dashBox'>
                            <div className='row'>
                                {workSlot && workSlot.map((item, index) => (
                                    <div className='col-sm-2' key={index}>
                                        <div className='defineTime'>
                                            <h4>{item.day}</h4>
                                            <ul className='list-inline'>
                                                <li>
                                                    <a disabled href='#!' className='btn btn-danger'>{item.time}</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Area/Location *</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="Complete Address"/>
                    </div> 
                    <div className="form-group">
                        <label className="control-label">Status</label>
                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Please Select</option>
                            <option value="1">Enable</option>
                            <option value="0">Disable</option>
                        </select>
                    </div>
                    <div className="form-group text-center">
                        <input type='submit' value='SAVE' className="btn btn-danger saveBtn"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
