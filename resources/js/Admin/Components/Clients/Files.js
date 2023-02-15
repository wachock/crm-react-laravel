import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Moment from 'moment';
import Swal from 'sweetalert2';

export default function files() {

    const [note,setNote] = useState("");
    const [file,setFile] = useState([]);
    const [AllFiles,setAllFiles] = useState([]);
    const param = useParams();
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

   
    const handleNote = (e) =>{

      e.preventDefault();
      if(!file){ alert.error('Please add file'); return;}
      
      const fd = new FormData();
      fd.append('client_id',param.id);
      fd.append('note',note);
      fd.append('file',file);
      axios
      .post(`/api/admin/add-file`,fd,{ headers })
      .then((res)=>{
        if(res.data.error){
            alert.error(res.data.error);
        } else {
           document.querySelector('.closeb').click();
           alert.success(res.data.message);
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
            confirmButtonText: "Yes, Delete File",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/api/admin/delete-file/`,{id:id},{ headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "File has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getFiles();
                        }, 1000);
                    });
            }
        });
    };

    const getFiles = () =>{
      axios
      .post(`/api/admin/get-files`,{id:parseInt(param.id)},{ headers })
      .then((res)=>{
        setAllFiles(res.data.files);
      })
    }
    useEffect(()=>{
        getFiles();
    },[])
    return (

        <div className="tab-pane fade active show" id="customer-notes" role="tabpanel"
            aria-labelledby="customer-notes-tab">
            <div className="text-right pb-3">
                <button type="button" className="btn btn-pink" data-toggle="modal" data-target="#exampleModal">
                    Add File
                </button>
            </div>
            {AllFiles && AllFiles.map((f,i)=>{
                return (

            <div className="card card-widget widget-user-2" style={{ "box-shadow": "none" }}>
                <div className="card-comments cardforResponsive"></div>
                <div className="card-comment p-3" style={{ "background-color": "rgba(0,0,0,.05)", "border-radius": "5px" }}>
                    <div className="row">
                        <div className="col-sm-7 col-6">
                            <span className="noteDate" style={{ "font-weight": "600" }}>
                                 {Moment(f.created_at).format('DD-MM-Y h:sa')} <br />
                                <span className="badge badge-warning text-dark">
                                    <a href={f.path} download>{f.file}</a>
                                </span>
                            </span>
                        </div>
                        <div className="col-sm-5 col-6">
                            <div className="float-right noteUser">
                            <button class="ml-2 btn bg-red" onClick={(e)=>handleDelete(e,f.id)}><i class="fa fa-trash"></i></button>
                                &nbsp;
                            </div>
                        </div>
                        <div className="col-sm-12">
                        {
                          (f.note) ? f.note : 'NA'
                        }
                        </div>
                    </div>
                </div>
            </div>
            )
        })}


            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add File</h5>
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
                                        <textarea
                                            type="text"
                                            value={note}
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            placeholder="Enter Note"
                                        ></textarea>

                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            File
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(e) =>
                                                {
                                                setFile(e.target.files[0]);
                                                
                                                }
                                            }
                                            className="form-control"
                                            required
                                        />

                                    </div>
                                </div>
                                
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb" data-dismiss="modal">Close</button>
                            <button type="button"  onClick={handleNote} className="btn btn-primary">Save File</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}