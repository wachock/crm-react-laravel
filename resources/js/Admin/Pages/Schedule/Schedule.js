import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'

export default function Schedule() {
  const [item, setitem] = useState([
    {id: 1, attender: "Sohrab Khan", scheduled: "24/01/2023, 13:15 PM", status: "Pending"},
    {id: 2, attender: "Nurul Hasan", scheduled: "06/02/2023, 10:30 AM", status: "Completed"},
    {id: 3, attender: "Prashant", scheduled: "15/02/2023, 04:00 PM", status: "Confirmed"},
  ]) 
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className="page-title">Schedule meetings</h1>
            <div className='dashBox p-4'>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Meeting Attender</th>
                      <th scope="col">Scheduled</th>
                      <th scope="col">Booking Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item && item.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.attender}</td>
                        <td>{item.scheduled}</td>
                        <td>{item.status}</td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/admin/view-schedule/${item.id}`} className="ml-2 btn btn-warning">
                                <i className="fa fa-eye"></i>
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
