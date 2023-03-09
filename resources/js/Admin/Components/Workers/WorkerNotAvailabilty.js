import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Moment from 'moment';
import Swal from 'sweetalert2';

export default function WorkerNotAvailabilty() {

    const [date,setDate] = useState("");
    const [AllDates,setAllDates] = useState([]);
    const param = useParams();
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

   
    const handleDate = (e) =>{
       
      e.preventDefault();
      const data ={
        'date':date,
        'user_id':param.id,
        'status':1
      }
      
      axios
      .post(`/api/admin/add-not-available-dates`,data,{  headers  })
      .then((res)=>{
        if(res.data.errors){
            for( let e in res.data.errors){
                window.alert(res.data.errors[e]);
            }
            
        } else {
           document.querySelector('.closeb1').click();
           alert.success(res.data.message);
           getDates();
           setDate("");
        }
      })
      
    }

    const handleDelete = (e,id) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Date",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/api/admin/delete-not-available-dates`,{id:id},{ headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Date has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getDates();
                        }, 1000);
                    });
            }
        });
    };

    const getDates = () =>{
      axios
      .post(`/api/admin/get-not-available-dates`,{id:parseInt(param.id)},{ headers })
      .then((res)=>{
        setAllDates(res.data.dates);
      })
    }
    useEffect(()=>{
        getDates();
    },[])
    
    return (

        <div className="tab-pane fade active show" id="customer-notes" role="tabpanel"
            aria-labelledby="customer-notes-tab">
            <div className="text-right pb-3">
                <button type="button" className="btn btn-pink" data-toggle="modal" data-target="#exampleModalNote">
                    Add Date
                </button>
            </div>
            {AllDates && AllDates.map((n,i)=>{
                return (

            <div key={i} className="card card-widget widget-user-2" style={{ "boxShadow": "none" }}>
                <div className="card-comments cardforResponsive"></div>
                <div className="card-comment p-3" style={{ "backgroundColor": "rgba(0,0,0,.05)", "borderRadius": "5px" }}>
                    <div className="row">
                        
                        <div className="col-sm-10 col-10">
                
                            
                        </div>
                        <div className="col-sm-2 col-2">
                            <div className="float-right noteUser">
                            <button className="ml-2 btn bg-red" onClick={(e)=>handleDelete(e,n.id)}><i className="fa fa-trash"></i></button>
                                &nbsp;
                            </div>
                        </div>
                        <div className="col-sm-12">
                        {
                          (n.date) ? n.date : 'NA'
                        }
                        </div>
                    </div>
                </div>
            </div>
            )
        })}


            <div className="modal fade" id="exampleModalNote" tabIndex="-1" role="dialog" aria-labelledby="exampleModalNote" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalNote">Add Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Note
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            placeholder="Enter Note"
                                        />

                                    </div>
                                </div>
                                    
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb1" data-dismiss="modal">Close</button>
                            <button type="button"  onClick={handleDate} className="btn btn-primary">Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}