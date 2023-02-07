import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OfferedPrice() {
    const [offers,setOffers]          = useState([]);
    const [loading,setLoading]        = useState("Loading..");
    const param = useParams();

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
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Total Price</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>       
                    <tr>
                        <td>#001</td>
                        <td>Lorem Ipsum Doler</td>
                        <td>440 NIS</td>
                        <td>October 5, 2022 </td>
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
           ):(
             <div className='form-control text-center'>{loading}</div>
           )
        }
        </div>
    </div>
  )
}
