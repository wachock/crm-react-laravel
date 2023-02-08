import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddClient() {
    
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [invoiceName,setInvoiceName] = useState("");
    const [phone, setPhone] = useState("");
    
    const [city,setCity] = useState("");
    const [streetNumber,setStreetNumber] = useState("");
    const [floor,setFloor] = useState("");
    const [Apt,setApt] = useState("");
    const [enterance,setEnterance] = useState("");
    const [zip,setZip] = useState("");
    const [dob,setDob] = useState("");
    const [passcode, setPassCode] = useState("");

    const [color, setColor] = useState("");
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

        var phoneClc = '';
        var phones = document.querySelectorAll('input[name="phone[]"]');
        phones.forEach((p,i)=>{
            phoneClc += p.value+',';
        });
        phoneClc = phoneClc.replace(/,\s*$/, "");
        const data = {
            firstname: firstname,
            lastname: lastname,
            invoicename:invoiceName,
            city:city,
            street_n_no:streetNumber,
            floor:floor,
            apt_no:Apt,
            entrence_code:enterance,
            zipcode:zip,
            dob:dob,
            passcode:passcode,
            color:color,
            email: email,
            phone: phoneClc,
            password: passcode,
            status: status,
        };
       
        axios
            .post(`/api/admin/clients`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Client has been created successfully");
                    setTimeout(() => {
                        navigate("/admin/clients");
                    }, 1000);
                }
            });
    };
   
    const addPhone = (e) =>{
        e.preventDefault();
        var cont = document.querySelectorAll('.phone')[0].firstChild.innerHTML;
        var htm  =  "<div class='form-group'>"+cont+"</div>"
        document.querySelector('.phone').innerHTML +=(htm);
      }

      useEffect(()=>{
       
        });
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Add Client</h1>
                    <div className="card">
                        <div className="card-body">
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
                                            value={invoiceName}
                                            onChange={(e) =>
                                                setInvoiceName(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            placeholder="Invoice Name"
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
                                            Password *
                                        </label>
                                        <input
                                            type="text"
                                            value={passcode}
                                            onChange={(e) =>
                                                setPassCode(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            placeholder="Password"
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
                                            name = {'phone[]'}
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
                                    <button className="mt-25 btn btn-success" onClick={addPhone}> + </button>
                                </div>
                            
                            </div>
                            <h4 className="mt-2 mb-3">Client Full Address</h4>

                            <div className="form-group">
                                <label className="control-label">City</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter City"
                                />
                                {errors.city ? (
                                    <small className="text-danger mb-1">
                                        {errors.city}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Street and number</label>
                                <input
                                    type="text"
                                    value={streetNumber}
                                    onChange={(e) => setStreetNumber(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter street and number"
                                />
                                {errors.streetNumber ? (
                                    <small className="text-danger mb-1">
                                        {errors.streetNumber}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Floor</label>
                                <input
                                    type="text"
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter floor"
                                />
                                {errors.floor ? (
                                    <small className="text-danger mb-1">
                                        {errors.floor}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Apt number</label>
                                <input
                                    type="text"
                                    value={Apt}
                                    onChange={(e) => setApt(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Apt number"
                                />
                                {errors.Apt ? (
                                    <small className="text-danger mb-1">
                                        {errors.Apt}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Enterance code</label>
                                <input
                                    type="text"
                                    value={enterance}
                                    onChange={(e) => setEnterance(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter enterance"
                                />
                                {errors.enterance ? (
                                    <small className="text-danger mb-1">
                                        {errors.enterance}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Zip Code</label>
                                <input
                                    type="text"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter zip code"
                                />
                                {errors.zip ? (
                                    <small className="text-danger mb-1">
                                        {errors.zip}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="form-group">
                                <label className="control-label">Dob</label>
                                <input
                                    type="text"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter dob"
                                />
                                {errors.dob ? (
                                    <small className="text-danger mb-1">
                                        {errors.dob}
                                    </small>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="form-group">
                                <label className="control-label">Color</label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter color code"
                                />
                                {errors.color ? (
                                    <small className="text-danger mb-1">
                                        {errors.color}
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
                                <input type="submit" value="SAVE" onClick={handleSubmit} className="btn btn-pink saveBtn"/>
                            </div>
                            {/* <ul className="nav nav-tabs text-center">
                                <li className="nav-item"><div className="form-group text-center"><input type="submit" value="Schedule Meeting" onClick={handleSubmit} className="btn bg-purple saveBtn"/></div></li>
                                <li className="nav-item"><div className="form-group text-center"><input type="submit" value="SAVE" onClick={handleSubmit} className="btn btn-pink saveBtn"/></div></li> 
                            </ul> */}
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
