import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
export default function Contract() {
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Contracts</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="mr-0 form-control" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    {/* <OfferedPriceFilter/> */}
                        <div className="boxPanel">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Client</th>
                                            <th scope="col">Email</th>
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
                                            <td><Link to='#!'>Clemmie Wolf</Link></td>
                                            <td>test123@gmail.com</td>
                                            <td><Link to='#!'>4 Ashlinn House,College Square</Link></td>
                                            <td>9763608409</td>
                                            <td>Glass furnishing</td>
                                            <td>Signed</td>
                                            <td>440 NIS</td>
                                            <td>
                                                <div className="action-dropdown dropdown">
                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/admin/view-contract`} className="dropdown-item">View</Link>
                                                        <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                        >Delete</button>
                                                    </div>
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

