import React, { useState,useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ManageTeam() {

  const [item, setitem] = useState([])
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  const getMembers = () =>{
     axios
     .get('/api/admin/team',{headers})
     .then((res)=>{
        setitem(res.data.team.data);
     });
  };

  useEffect(()=>{
    getMembers();
  },[]);
  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete Team member!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`/api/admin/team/${id}`, { headers })
                .then((response) => {
                    Swal.fire(
                        "Deleted!",
                        "Team member has been deleted.",
                        "success"
                    );
                    setTimeout(() => {
                        getMembers();
                    }, 1000);
                });
        }
    });
};
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
                                    <td>
                                    {
                                    (item.status == 1) 
                                    ? 'Active'
                                    :'Inactive'
                                    }</td>
                                    <td>
                                        <div className="action-dropdown dropdown">
                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <i className="fa fa-ellipsis-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link to={`/admin/edit-team/${item.id}`} className="dropdown-item">Edit</Link>
                                                <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                >Delete</button>
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
