import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

export default function OfferedPrice() {
    const [offers,setOffers]          = useState([]);
    const [loading,setLoading]        = useState("Loading..");
    const param = useParams();
    const navigate = useNavigate();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getOffers= () =>{
    axios
    .post(`/api/admin/client-offers`,{id:param.id},{ headers })
    .then((res)=>{
       
        if(res.data.offers.length >0){
           setOffers(res.data.offers);
        } else {
            setLoading('No offer found');
        }
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
    <div className="boxPanel">
        <div className="table-responsive"> 
        { offers.length > 0 ?(
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Action</th>
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
                        <td>{ofr.status}</td>
                        <td>{ofr.subtotal} NIS + VAT</td>
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
           ):(
             <div className='form-control text-center'>{loading}</div>
           )
        }
        </div>
    </div>
  )
}
