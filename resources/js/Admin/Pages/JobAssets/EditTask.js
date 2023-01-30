import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditTask() {
    const [task, setTask] = useState("");
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
            task: task,
            status: status,
        };
        axios
            .put(`/api/admin/tasks/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Task has been updated successfully");
                    setTimeout(() => {
                        navigate("/admin/tasks");
                    }, 1000);
                }
            });
    };

    const getTask = () => {
        axios
            .get(`/api/admin/tasks/${params.id}/edit`, { headers })
            .then((response) => {
                setTask(response.data.task.task);               
                setStatus(response.data.task.status);
            });
    };
    useEffect(() => {
        getTask();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-Task">
                    <h1 className="page-title editTask">
                        Edit Task
                    </h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                            Task
                            </label>
                            <input
                                type="text"
                                value={task}
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
