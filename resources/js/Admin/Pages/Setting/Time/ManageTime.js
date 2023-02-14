import React, { useState } from 'react'
import Sidebar from '../../../Layouts/Sidebar'
import { Link } from 'react-router-dom'

export default function ManageTime() {
    const [time, setTime] = useState([
        {id: 1, time: "09:30 AM to 10:30 AM", status: "Enabled"},
        {id: 2, time: "10:30 AM to 11:00 AM", status: "Enabled"},
        {id: 3, time: "07:00 PM to 08:00 PM", status: "Enabled"},
      ])
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="titleBox customer-title">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Manage Time</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/admin/add-time" className="btn btn-pink addButton"><i class="btn-icon fas fa-plus-circle"></i>
                                Add Time
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="boxPanel">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" className='text-center'>ID</th>
                                    <th scope="col" className='text-center'>Time</th>
                                    <th scope="col" className='text-center'>Status</th>
                                    <th scope="col" className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {time &&
                                    time.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>{item.id}</td>
                                            <td className='text-center'>{item.time}</td>
                                            <td className='text-center'>{item.status}</td>   
                                            <td className='text-center'>
                                                <div className="action-dropdown dropdown">
                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/admin/edit-time/${item.id}`} className="dropdown-item">Edit</Link>
                                                        <button className="dropdown-item">Delete</button>
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
    </div>
  )
}
