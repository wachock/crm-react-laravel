import React, { useState } from 'react'

export default function JobFilter({getTotalJobs}) {

    const [title, setTitle] = useState('');
    const [applicant, setApplicant] = useState('');  
    const [status, setStatus] = useState('');

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const handleFilter = () => {
        axios.get("/api/admin/jobs?title="+title+"&applicant="+applicant+"&status="+status, { headers }).then((response) => {           
                getTotalJobs(response);
        });
    }

    const handleReset = () => {
        setTitle('')
        setApplicant('')
        setStatus('')
        axios.get("/api/admin/jobs", { headers }).then((response) => {
            getTotalJobs(response);
        });
    }
  return (
    <>
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Job Title</label>
                <input className="form-control" name="title" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Applicant</label>
                <input className="form-control" name="applicant" placeholder="Applicant" value={applicant} onChange={(e) => setApplicant(e.target.value)}/>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Status</label>
                <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Please Select</option>
                    <option value="posted">Posted</option>
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="d-flex mt-4">
                <button className="btn btn-danger filterBtn" onClick={handleFilter}>
                    <i className="fas fa-search"></i>
                </button>
                <button className="btn btn-dark ml-1 filterBtn" onClick={handleReset}>
                    <i className="fas fa-undo"></i>
                </button>
                </div>
            </div>
        </div>
    </>
  )
}
