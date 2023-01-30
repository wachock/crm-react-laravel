import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditSkill() {
    const [skill, setSkill] = useState("");
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
            skill: skill,
            status: status,
        };
        axios
            .put(`/api/admin/skills/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Skill has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/skills");
                    }, 1000);
                }
            });
    };

    const getSkill = () => {
        axios
            .get(`/api/admin/skills/${params.id}/edit`, { headers })
            .then((response) => {
                setSkill(response.data.skill.skill);               
                setStatus(response.data.skill.status);
            });
    };
    useEffect(() => {
        getSkill();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-Skill">
                    <h1 className="page-title editSkill">
                        Edit Skill
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Skill
                            </label>
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="form-control"
                                placeholder="Skill"
                            />
                            {errors.skill ? (
                                <small className="text-danger mb-1">
                                    {errors.skill}
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
