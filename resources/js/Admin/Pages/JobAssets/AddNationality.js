import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddNationality() {
    const [nationality, setNationality] = useState("");
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
            nationality: nationality,
            status: status,
        };
        axios
            .post(`/api/admin/nationalities`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Nationality has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/nationality");
                    }, 1000);
                }
            });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-Nationality">
                    <h1 className="page-title addNationality">
                        Add Nationality
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Nationality name
                            </label>
                            <input
                                type="text"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                                className="form-control"
                                placeholder="Nationality name"
                            />
                            {errors.nationality ? (
                                <small className="text-danger mb-1">
                                    {errors.nationality}
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
