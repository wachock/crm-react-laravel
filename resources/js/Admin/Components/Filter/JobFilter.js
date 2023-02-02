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
        <div className="row colFive">
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Client Name</label>
                <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Please Select</option>
                    <option value="posted">Clemmie Wolf</option>
                    <option value="booked">Savanah Blick</option>
                    <option value="completed">Darryl Turcotte</option>
                </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Worker Name</label>
                <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Please Select</option>
                    <option value="posted">Clemmie Wolf</option>
                    <option value="booked">Savanah Blick</option>
                    <option value="completed">Darryl Turcotte</option>
                </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Service Name</label>
                <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Please Select</option>
                    <option value="posted">Clemmie Wolf</option>
                    <option value="booked">Savanah Blick</option>
                    <option value="completed">Darryl Turcotte</option>
                </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                <label className="control-label">Status</label>
                <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Please Select</option>
                    <option value="posted">Not Started</option>
                    <option value="completed">Completed</option>
                </select>
                </div>
            </div>
            <div className="col-sm-3">
                <label className="control-label">&nbsp;</label>
                <div className="d-flex">
                <button className="btn bg-purple filterBtn" onClick={handleFilter}>
                    <i className="fas fa-search"></i>
                </button>
                <button className="btn btn-danger ml-1 filterBtn" onClick={handleReset}>
                    <i className="fas fa-undo"></i>
                </button>
                </div>
            </div>
        </div>
    </>
  )
}
