import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
import OfferedPriceFilter from '../../Components/Filter/OfferedPriceFilter';
export default function OfferPrice() {
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Offered Prices</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/admin/add-offer" className="btn btn-pink addButton"><i class="btn-icon fas fa-plus-circle"></i>
                                Add New
                            </Link>
                        </div>
                    </div>
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
                                                    <Link to={`/admin/edit-offer`} className="btn bg-green"><i className="fa fa-edit"></i></Link>
                                                    <Link to={`/admin/view-offer`} className="ml-2 btn btn-warning"><i className="fa fa-eye"></i></Link>
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
