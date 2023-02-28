import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Moment from 'moment';
import Swal from 'sweetalert2';

export default function Documents() {

    const [file, setFile] = useState('');
    const [pdf, setPdf] = useState('');
    const params = useParams();
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

  
  const handlePdfUpload = (e) => {
    setPdf(e.target.files[0]);
  };

 const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', pdf);
    axios.post(`/api/admin/upload/${params.id}`, formData, { headers })
      .then((response) => {
          document.querySelector('.closedoc').click();
          alert.success('Form Upload Successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };  
   const headers1 = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getWorker = () => {
        axios
            .get(`/api/admin/workers/${params.id}/edit`, { headers1 })
            .then((response) => {
                setFile(response.data.worker.form_101);
            });
    };
    useEffect(() => {
        getWorker();
    }, []);
    return (

        <div className="tab-pane fade active show" id="customer-notes" role="tabpanel"
            aria-labelledby="customer-notes-tab">
            <div className="row pb-3">
                <div className="col-sm-10">
                <a href={ (`/api/showPdf/${params.id}`)} target="_blank" className="btn btn-pink">
                    View Worker 101 Form
                </a>
                 </div>
                <div className="col-sm-2">
                <button type="button" className="btn btn-pink" data-toggle="modal" data-target="#exampleModal">
                    Add File
                </button>
                 </div>
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
                                            File
                                        </label>
                                         <input type="file" onChange={handlePdfUpload} />

                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closedoc" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleFormSubmit} className="btn btn-primary">Save File</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}