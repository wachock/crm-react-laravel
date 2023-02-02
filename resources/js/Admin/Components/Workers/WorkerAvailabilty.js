import React from 'react'
import { Link } from "react-router-dom";
export default function CurrentJob() {
  return (
    <div className="boxPanel">
        <div className="table-responsive"> 
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client Name</th>
                        <th>Service Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>       
                    <tr>
                        <td>#001</td>
                        <td>Rahul</td>
                        <td>Garden grass cutting</td>
                        <td>October 5, 2022 </td>
                        <td>10:00AM</td>
                        <td>12:00PM</td>
                        <td>Not Started</td>
                        <td>440 NIS</td>
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
