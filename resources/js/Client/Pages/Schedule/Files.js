import axios from "axios";
import Sidebar from '../../Layouts/ClientSidebar'
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Moment from 'moment';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export default function Clientfiles() {

    const [note, setNote] = useState("");
    const [file, setFile] = useState([]);
    const [AllFiles, setAllFiles] = useState([]);
    const [loading, setLoading] = useState("Loading...");
   
    const param = useParams();
    const cid = localStorage.getItem('client-id');
    const meetId = param.meetId;
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };
    
    const handleFileChange = (e) =>{
        let type = e.target.files[0].type.split('/')[1];
        let allow = ['jpeg','png','jpg','mp4','webm'];
        if(allow.includes(type)){
            setFile(e.target.files[0]);
        } else {
            setFile([]);
            window.alert("This file is not allowed");
            document.querySelector('input[type="file"]').value = "";
        }
    }


    const handleFile = (e) => {

        e.preventDefault();
        if (file.length == 0) { window.alert('Please add file'); return; }
        const type = document.querySelector('select[name="filetype"]').value;
        const fd = new FormData();
        fd.append('user_id', cid);
        fd.append('note', note);
        fd.append('meeting',meetId);
        fd.append('file', file);
        fd.append('type', type);
        fd.append('role', 'client');

        const videoHeader = {
            Accept: "application/octet-stream, text/plain, */*",
            "Content-Type": "application/octet-stream",
            Authorization: `Bearer ` + localStorage.getItem("client-token"),
        }
        axios
            .post(`/api/client/add-file`, fd, { headers: (type == 'image') ? headers : videoHeader })
            .then((res) => {
                console.log(res)
                if (res.data.error) {
                    for (let e in res.data.error) {
                        window.alert(res.data.error[e]);
                    }

                } else {
                    document.querySelector('.closeb').click();
                    alert.success(res.data.message);
                    getFiles();
                    setNote("");
                    setFile([]);
                    document.querySelector('input[type="file"]').value = "";
                }
            })

    }

    const handleDelete = (e, id) => {
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
                    .post(`/api/client/delete-file/`, { id: id }, { headers })
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

    const getFiles = () => {
        axios
            .post(`/api/client/get-files`, { id:cid,meet_id:meetId }, { headers })
            .then((res) => {
                (res.data.files.length > 0)?
                setAllFiles(res.data.files)
                :setLoading('No file added for this meeting')
            })
    }
   
    useEffect(() => {
        getFiles();
    }, [])
    return (

        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Meeting Files</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                            <Link className="btn btn-pink addButton" data-toggle="modal" data-target="#exampleModal"><i class="btn-icon fas fa-plus-circle"></i>Add File</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {AllFiles.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Upload Date</th>
                                                <th scope="col">Note</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {AllFiles && AllFiles.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{Moment(item.created_at).format('DD/MM/Y')}</td>

                                                        <td>
                                                            {
                                                                item.note
                                                                    ? item.note
                                                                    : "NA"
                                                            }
                                                        </td>

                                                        <td>
                                                        <a
                                                        href={`${item.path}`} 
                                                        className="btn bg-yellow">
                                                            <i className="fa fa-eye"></i>
                                                        </a>
                                                        <button class="ml-2 btn bg-red" onClick={(e)=>handleDelete(e,item.id)}><i class="fa fa-trash"></i></button>
                                                        </td>
                                                        
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                            </div>

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
                                                            placeholder="Enter Note ( optional )"
                                                        ></textarea>

                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">
                                                            Type
                                                        </label>
                                                        <select name="filetype" className="form-control">
                                                            <option value="image">Image</option>
                                                            <option value="video">Video</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">
                                                            File *
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="file"
                                                            onChange={(e) => {
                                                                handleFileChange(e)

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
                                            <button type="button" onClick={handleFile} className="btn btn-primary">Save File</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}