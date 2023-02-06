import React, { useState,useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ManageTeam() {

  const [item, setitem] = useState([
    {id: 1, name: "Sohrab Khan", phone: 8090895865, email: "test123@gmail.com", status: "Enabled"},
    {id: 2, name: "Nurul Hasan", phone: 234123413, email: "test123@gmail.com", status: "Disabled"},
    {id: 3, name: "Prashant", phone: 91382644312, email: "test123@gmail.com", status: "Enabled"},
  ])
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  const getMembers = () =>{
     axios
     .get('/api/admin/team',{headers})
     .then((res)=>{
        console.log(res);
     });
  };

  useEffect(()=>{
    getMembers();
  },[]);
  return (
    <div id='container'>
        <Sidebar/>
        <div id='content'>
            <div className="titleBox customer-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-title">Manage Team</h1>
                    </div>
                    <div className="col-sm-6">
                        <Link to="/admin/add-team" className="btn btn-pink addButton"><i class="btn-icon fas fa-plus-circle"></i>
                            Add New
                        </Link>
                    </div>
                </div>
            </div>
            <div className='dashBox p-4'>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item && item.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.status}</td>
                                    <td>
                                      <div className="d-flex">
                                        <Link to={`/admin/edit-team/${item.id}`} className="ml-2 btn btn-success">
                                            <i className="fa fa-pencil"></i>
                                        </Link>
                                        <div className="text-center">
                                            <button className="ml-2 btn btn-danger">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                      </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
