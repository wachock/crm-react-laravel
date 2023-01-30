import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddTask() {
    const [task, setTask] = useState("");
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
            task: task,
            status: status,
        };
        axios
            .post(`/api/admin/tasks`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Task has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/tasks");
                    }, 1000);
                }
            });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-task">
                    <h1 className="page-title addTask">
                        Add Task
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                            Task
                            </label>
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => setTask(e.target.value)}
                                className="form-control"
                                placeholder="Task"
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
