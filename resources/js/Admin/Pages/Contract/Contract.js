import React from 'react'
import { Link } from "react-router-dom";
import OfferedPriceFilter from '../../Components/Filter/OfferedPriceFilter';
import Sidebar from '../../Layouts/Sidebar';
export default function Contract() {
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <h1 className="page-title">Contracts</h1>
                </div>
                <div className="card">
                    <div className="card-body">
                    <OfferedPriceFilter/>
                        <div className="boxPanel">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Client</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Service Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        <tr>
                                            <td>Clemmie Wolf</td>
                                            <td>4 Ashlinn House,College Square</td>
                                            <td>9763608409</td>
                                            <td>Glass furnishing</td>
                                            <td>Inactive</td>
                                            <td>440 NIS</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to={`/admin/view-contract`} className="ml-2 btn btn-warning"><i className="fa fa-eye"></i></Link>
                                                    <button className="ml-2 btn bg-red" onClick={() => handleDelete(item.id)}><i className="fa fa-trash"></i></button>  
                                                </div>
                                            </td>
                                        </tr>     
                                    </tbody>
                                </table> 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

