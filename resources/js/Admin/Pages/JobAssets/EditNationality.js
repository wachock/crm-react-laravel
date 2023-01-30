import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditNationality() {
    const [nationality, setNationality] = useState("");
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
            nationality: nationality,
            status: status,
        };
        axios
            .put(`/api/admin/nationalities/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Nationality has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/nationality");
                    }, 1000);
                }
            });
    };

    const getNationality = () => {
        axios
            .get(`/api/admin/nationalities/${params.id}/edit`, { headers })
            .then((response) => {
                setNationality(response.data.nationality.nationality);               
                setStatus(response.data.nationality.status);
            });
    };
    useEffect(() => {
        getNationality();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-Nationality">
                    <h1 className="page-title addNationality">
                        Edit Nationality
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
