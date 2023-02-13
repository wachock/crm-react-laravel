import React, { useState } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

export default function AddServiceSchedule(){

   const [schedule,setschedule] = useState([]);
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
          name: schedule,
          status: status,
      };
     
      axios
          .post(`/api/admin/service-schedule`, data, { headers })
          .then((response) => {
              if (response.data.errors) {
                  setErrors(response.data.errors);
              } else {
                  alert.success("Schedule has been created successfully");
                  setTimeout(() => {
                      navigate("/admin/service-schedule");
                  }, 1000);
              }
          });
  };

   return (
      <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Add schedule</h1>
                    <form>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="control-label">
                                        schedule *
                                    </label>
                                    <input
                                        type="text"
                                        value={schedule}
                                        onChange={(e) =>
                                            setschedule(e.target.value)
                                        }
                                        className="form-control"
                                        required
                                        placeholder="Enter schedule"
                                    />
                                    {errors.schedule ? (
                                        <small className="text-danger mb-1">
                                            {errors.schedule}
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
                                className="btn btn-pink saveBtn"
                            />
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

   );
}