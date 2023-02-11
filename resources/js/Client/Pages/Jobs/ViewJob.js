import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../Layouts/Sidebar'


export default function ViewJob() {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [applicant, setApplicant] = useState('');
    const [employer, setEmployer] = useState('');
    const [rate, setRate] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [workSlot, setWorkSlot] = useState([]);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const applicantData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
        item => ({ label: item, value: item })
    );
   
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, applicant, employer, rate, location);
    }
    
    const getJob = () => {
        axios.get(`/api/admin/jobs/${params.id}`, { headers }).then((response) => {
            console.log(response.data.job);
            setTitle(response.data.job.title);
            setJobDescription(response.data.job.description);  
            setLocation(response.data.job.address);  
            setStatus(response.data.job.status);
            setRate(response.data.job.rate);
            setWorkSlot(response.data.job.slots);
            setEmployer(response.data.job.employer.firstname +' '+ response.data.job.employer.lastname)
            setApplicant(response.data.job.applicant.firstname +' '+ response.data.job.applicant.lastname)     
        });
    };
    useEffect(() => {
        getJob();
    }, []);

  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="edit-customer">
                <h1 className="page-title editJob">View Job</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Job Title</label>
                        <input disabled type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' placeholder="Job Title"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Job Description</label>
                        <textarea disabled className='form-control' rows="3" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Applicant Name</label>
                        <input disabled type="text" value={applicant} onChange={(e) => setApplicant(e.target.value)} className="form-control" placeholder="Applicant Name"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Employer Name</label>
                        <input disabled type="text" value={employer} onChange={(e) => setEmployer(e.target.value)} className="form-control" placeholder="Employer Name"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Rate per hour</label>
                        <input disabled type="text" value={rate} onChange={(e) => setRate(e.target.value)} className="form-control" placeholder="Rate per hour"/>
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
                                                    <a disabled href='#!' className='btn btn-danger'>{item.slot}</a>
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
                        <input disabled type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" placeholder="Complete Address"/>
                    </div> 
                    <div className="form-group">
                        <label className="control-label">Status</label>
                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="posted">Posted</option>
                            <option value="booked">Booked</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="form-group text-center">
                        <Link to='/admin/jobs-posted' className="btn btn-dark saveBtn">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
