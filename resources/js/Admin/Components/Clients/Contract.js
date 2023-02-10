import React from 'react'
import { Link } from "react-router-dom";
import Moment from 'moment';

export default function Contract({ contracts }) {

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Contract!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/contract/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Contract has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    });
            }
        });
    };

  return (
    <div className="boxPanel">
        <div className="table-responsive"> 
        { contracts.length > 0 ?
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
                    { contracts && contracts.map((c,i)=>{
                        let services = JSON.parse(c.offer.services);
                        
                        return (
                    <tr>
                        <td>#{c.id}</td>
                        <td>
                            {services && services.map((s,j)=>{
                               
                                return(
                                    (services.length-1 != j) ?
                                    s.name+" | "
                                    : s.name
                                )
                            })}
                        </td>
                        <td>{ c.offer.total }</td>
                        <td>{Moment(c.created_at).format('MMMM DD, Y')}</td>
                        <td>{ c.status }</td>
                        <td>
                            <div className="d-flex">
                                <Link to={`/view-contract/${c.id}`} className="btn bg-yellow"><i className="fa fa-eye"></i></Link>
                                <button className="ml-2 btn bg-red" onClick={() => handleDelete( c.id )}><i className="fa fa-trash"></i></button>                            
                            </div>
                        </td>
                    </tr>    

                        )
                    })}       
                      
                </tbody>
            </table>
            :(
                <div className='form-control text-center'> No contract found</div>
            )
        }
        </div>
    </div>
  )
}
