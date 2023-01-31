import React from 'react'
import { Link } from "react-router-dom";
export default function ScheduledMeeting() {
  return (
    <div className="boxPanel">
        <div className="table-responsive"> 
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meeting Attender</th>
                        <th>Service Name</th>
                        <th>Scheduled</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>       
                    <tr>
                        <td>#001</td>
                        <td>Alice Jacobs</td>
                        <td>Lorem Ipsum Doler</td>
                        <td>24/01/2023, Tue 10:00AM </td>
                        <td>Sent</td>
                        <td>
                            <div className="d-flex">
                                <Link to={`#`} className="btn bg-purple"><i className="fa fa-edit"></i></Link>
                                <button className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></button>
                                <button className="ml-2 btn bg-red" onClick={() => handleDelete( item.id )}><i className="fa fa-trash"></i></button>                            
                            </div>
                        </td>
                    </tr>      
                </tbody>
            </table>
        </div>
    </div>
  )
}
