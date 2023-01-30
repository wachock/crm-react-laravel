import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddLanguage() {
    const [language, setLanguage] = useState("");
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
            language: language,
            status: status,
        };
        axios
            .post(`/api/admin/languages`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Language has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/language");
                    }, 1000);
                }
            });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-language">
                    <h1 className="page-title addLanguage">
                        Add Language
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Language
                            </label>
                            <input
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="form-control"
                                placeholder="Language"
                            />
                            {errors.language ? (
                                <small className="text-danger mb-1">
                                    {errors.language}
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
