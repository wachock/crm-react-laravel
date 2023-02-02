import React, { useState } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function AddService(){

   const [service,setService] = useState([]);
   const [status,setStatus]   = useState(0);
   const [errors,setErrors]   = useState([]);
   const alert = useAlert();
   const navigate = useNavigate();
   
   const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
          name: service,
          status: status,
      };
     
      axios
          .post(`/api/admin/services`, data, { headers })
          .then((response) => {
              if (response.data.errors) {
                  setErrors(response.data.errors);
              } else {
                  alert.success("Service has been created successfully");
                  setTimeout(() => {
                      navigate("/admin/services");
                  }, 1000);
              }
          });
  };

   return (
      <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Add Service</h1>
                    <form>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="control-label">
                                        Service *
                                    </label>
                                    <input
                                        type="text"
                                        value={service}
                                        onChange={(e) =>
                                            setService(e.target.value)
                                        }
                                        className="form-control"
                                        required
                                        placeholder="Enter Service"
                                    />
                                    {errors.service ? (
                                        <small className="text-danger mb-1">
                                            {errors.service}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                           
                        <div className="col-sm-12">
                        <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Please select</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                            {errors.status ? (
                                <small className="text-danger mb-1">
                                    {errors.status}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        </div>

                        <div className="form-group text-center col-sm-12">
                            <input
                                type="submit"
                                value="SAVE"
                                onClick={handleSubmit}
                                className="btn btn-danger saveBtn"
                            />
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

   );
}