import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditService() {

    const [service, setService] = useState([]);
    const [status, setStatus] = useState(0);
    const [errors, setErrors] = useState([]);
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: service,
            status: status,
        };

        axios
            .put(`/api/admin/services/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Service has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/services");
                    }, 1000);
                }
            });
    };

    const getService = () => {

        axios
            .get(`/api/admin/services/${params.id}/edit`, { headers })
            .then((res) => {
                setService(res.data.service);
            });

    }

    useEffect(() => {
        getService();
    }, []);


    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Edit Service</h1>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="control-label">
                                                Service *
                                            </label>
                                            <input
                                                type="text"
                                                value={service.name}
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
                                            onClick={handleUpdate}
                                            className="btn btn-pink saveBtn"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}