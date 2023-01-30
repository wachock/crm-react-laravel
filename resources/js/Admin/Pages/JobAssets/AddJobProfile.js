import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddJobProfile() {
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
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
            type: type,
            status: status,
        };
        axios
            .post(`/api/admin/job-profiles`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Job Profile has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/job-profiles");
                    }, 1000);
                }
            });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-profile">
                    <h1 className="page-title addProfile">
                        Add Job Profile
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                            Profile Type
                            </label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="form-control"
                                placeholder="Profile Type"
                            />
                            {errors.type ? (
                                <small className="text-danger mb-1">
                                    {errors.type}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Please Select</option>
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                            </select>
                            {errors.status ? (
                                <small className="text-danger mb-1">
                                    {errors.status}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group text-center">
                            <input
                                type="submit"
                                value="SAVE"
                                onClick={handleSubmit}
                                className="btn btn-danger saveBtn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
