import React,{ useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
import axios from 'axios';
import OfferedPriceFilter from '../../Components/Filter/OfferedPriceFilter';

export default function OfferPrice() {

    const [offers,setOffers] = useState();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getOffers = () =>{
        axios
          .get('/api/admin/offers',{headers})
          .then((res)=>{
            setOffers(res.data.offers.data);
          });
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Offer!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/offers/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Offer has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getOffers();
                        }, 1000);
                    });
            }
        });
    };

    useEffect(()=>{
        getOffers();
    },[]);
    
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
                                        { offers && offers.map((ofr,i)=>{

                                            var city =  ofr.client.city
                                            ? ofr.client.city + ", "
                                            :"";
                                            var sn = ofr.client.street_n_no
                                            ? ofr.client.street_n_no+ ", "
                                            :"";
                                            var zc = ofr.client.zipcode
                                            ? ofr.client.zipcode
                                            :"";

                                           return ( 
                                           <tr>
                                            <td>
                                                {
                                                  ofr.client 
                                                  ? ofr.client.firstname
                                                  + " "+ofr.client.lastname
                                                  :"NA"
                                                }
                                            </td>
                                            <td>
                                                {
                                                    city+sn+zc
                                                }
                                            
                                            </td>
                                            <td>{ ofr.client.phone }</td>
                                            <td>
                                                
                                                {
                                                  ofr.service
                                                  ? ofr.service.name
                                                  :"NA"
                                                }
                                            </td>
                                            <td>{ofr.status}</td>
                                            <td>{ofr.total} NIS</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link to={`/admin/edit-offer/${ofr.id}`} className="btn bg-green"><i className="fa fa-edit"></i></Link>
                                                    <Link to={`/admin/view-offer/${ofr.id}`} className="ml-2 btn btn-warning"><i className="fa fa-eye"></i></Link>
                                                    <button className="ml-2 btn bg-red" onClick={() => handleDelete(ofr.id)}><i className="fa fa-trash"></i></button>  
                                                </div>
                                            </td>
                                        </tr>     
                                        )
                                        })}
                                       
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
