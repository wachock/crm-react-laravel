import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddApplicant() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [passcode, setPassCode] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    let   [invoiceName,setInvoiceName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
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
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: confirmPassword,
            address: address,
            status: status,
        };

        axios
            .post(`/api/admin/applicants`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Review has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/reviews");
                    }, 1000);
                }
            });
    };

    const addPhone = (e) =>{
      e.preventDefault();
      var cont = document.querySelectorAll('.phone')[0].innerHTML;
      document.querySelector('.phone').innerHTML += cont;
    }
    const remPhone = (e) =>{
        e.preventDefault();
        console.log('remove');
      }
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Add Client</h1>
                    <form>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={firstname}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
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
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="form-control"
                                        required
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        Invoice Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) =>
                                            setInvoiceName(e.target.value)
                                        }
                                        className="form-control"
                                        required
                                        placeholder="Enter Last Name"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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
                            </div>
                         
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="control-label">
                                        Passcode *
                                    </label>
                                    <input
                                        type="text"
                                        value={passcode}
                                        onChange={(e) =>
                                            setPassCode(e.target.value)
                                        }
                                        className="form-control"
                                        required
                                        placeholder="Passcode"
                                    />
                                    {errors.passcode ? (
                                        <small className="text-danger mb-1">
                                            {errors.passcode}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                           
                            <div className="col-sm-5 phone">
                                <div className="form-group">
                                    <label className="control-label">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
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
                                
                            </div>

                           <div className="col-sm-1">
                           <button className="btn btn-success" onClick={addPhone}> + </button>
                           </div>

                          
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
