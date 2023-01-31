import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function EditWorker() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const params = useParams();
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            status: status,
        };
        axios
            .put(`/api/admin/employers/${params.id}`, data ,{ headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Employer has been updated successfully");
                }
            });
    };

    const getEmployer = () => {
        axios
            .get(`/api/admin/employers/${params.id}/edit`, { headers })
            .then((response) => {
                setFirstName(response.data.employer.firstname);
                setLastName(response.data.employer.lastname);
                setEmail(response.data.employer.email);
                setPhone(response.data.employer.phone);
                setAddress(response.data.employer.address);
                setStatus(response.data.employer.status);
            });
    };
    useEffect(() => {
        getEmployer();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title editEmployer">Edit Employer</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                First Name *
                            </label>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="form-control"
                                required
                                placeholder="Enter First Name"
                            />
                            {errors.firstname ? (
                                <small className="text-danger mb-1">
                                    {errors.firstname}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Last Name *</label>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                className="form-control"
                                required
                                placeholder="Enter Last Name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Email *</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                                placeholder="Email"
                            />
                            {errors.email ? (
                                <small className="text-danger mb-1">
                                    {errors.email}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                placeholder="Phone"
                            />
                            {errors.phone ? (
                                <small className="text-danger mb-1">
                                    {errors.phone}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                placeholder="Enter your address"
                            />
                            {errors.address ? (
                                <small className="text-danger mb-1">
                                    {errors.address}
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
                        <div className="form-group text-center">
                            <button                                
                                onClick={handleUpdate}
                                className="btn btn-danger saveBtn"
                            >
                                UPDATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
