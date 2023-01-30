import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditJobProfile() {
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const alert = useAlert();
    const params = useParams();
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
            .put(`/api/admin/job-profiles/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Job Profile has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/job-profiles");
                    }, 1000);
                }
            });
    };

    const getProfile = () => {
        axios
            .get(`/api/admin/job-profiles/${params.id}/edit`, { headers })
            .then((response) => {
                setType(response.data.profile.type);               
                setStatus(response.data.profile.status);
            });
    };
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-Skill">
                    <h1 className="page-title editSkill">
                        Edit Job Profile
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Job Profile
                            </label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="form-control"
                                placeholder="Type"
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
                                value="UPDATE"
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
