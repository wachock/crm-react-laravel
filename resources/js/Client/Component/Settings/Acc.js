import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Moment from 'moment';

export default function Acc() {

    const [firstname, setFirstName]  = useState("");
    const [lastname, setLastName]    = useState("");
    const [invoicename,setInvoicename] = useState("");
    const [email, setEmail]          = useState("");
    const [phone,setPhone]           = useState("");
    const [city, setCity]            = useState("");
    const [street,setStreet]         = useState("");
    const [apt,setApt]               = useState("");
    const [floor,setFloor]           = useState("");
    const [entrence,setEntrence]     = useState("");
    const [dob,setDob]               = useState("");
    const [lng,setLng]               = useState("");
    const [zipcode,setZipcode]       = useState("");
    const [file, setFile]            = useState("");
    const [color,setColor]           = useState("");
    const [avatar, setAvatar]        = useState("");
    const [errors, setErrors]        = useState([]);

    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setAvatar(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("invoicename", invoicename);
        formData.append("city", city);
        formData.append("street_n_no", street);
        formData.append("floor",floor);
        formData.append("entrence_code",entrence);
        formData.append("apt_no",apt);
        formData.append("dob",dob);
        formData.append("lng",(lng == 0)? 'heb' : lng);
        formData.append("zipcode", zipcode);
        formData.append("email", email);
        formData.append("color",color);
        formData.append("avatar", avatar);
        formData.append("phone",phone);
        axios
            .post(`/api/client/my-account`, formData, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success(
                        "Account details has been updated successfully"
                    );
                }
            });
    };

    const getSetting = () => {
        axios.get("/api/client/my-account", { headers }).then((response) => {
            setFirstName(response.data.account.firstname);
            setLastName(response.data.account.lastname);
            setInvoicename(response.data.account.invoicename);
            setDob(response.data.account.dob);
            setCity(response.data.account.city);
            setStreet(response.data.account.street_n_no);
            setEntrence(response.data.account.entrence_code);
            setApt(response.data.account.apt_no);
            setFloor(response.data.account.floor);
            setLng(response.data.account.lng);
            setZipcode(response.data.account.zipcode);
            setColor(response.data.account.color);
            setEmail(response.data.account.email);
            setPhone(response.data.account.phone);
            setFile(response.data.account.avatar);
           
        });
    };
    useEffect(() => {
        getSetting();
    }, []);
    
    return (
        <div className="card">
            <div className="card-body">
        <form>
            <div className="form-group">
                <label className="control-label">Your FirstName</label>
                <input
                    type="text"
                    className="form-control"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your FirstName"
                />
                {errors.firstname ? (
                    <small className="text-danger mb-1">{errors.firstname}</small>
                ) : (
                    ""
                )}
            </div>
            
            <div className="form-group">
                <label className="control-label">Your LastName</label>
                <input
                    type="text"
                    className="form-control"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your LastName"
                />
                {errors.lastname ? (
                    <small className="text-danger mb-1">{errors.lastname}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your InvoiceName</label>
                <input
                    type="text"
                    className="form-control"
                    value={invoicename}
                    onChange={(e) => setInvoicename(e.target.value)}
                    placeholder="Your InvoiceName"
                />
                {errors.invoicename ? (
                    <small className="text-danger mb-1">{errors.invoicename}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Email</label>
                <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {errors.email ? (
                    <small className="text-danger mb-1">{errors.email}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    value={Moment(dob).format('Y-MM-DD')}
                    className="form-control"
                    onChange={(e) => setDob(e.target.value)}
                />
                 {errors.dob ? (
                    <small className="text-danger mb-1">{errors.dob}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your City</label>
                <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your City"
                />
                 {errors.city ? (
                    <small className="text-danger mb-1">{errors.city}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your Street and Number</label>
                <input
                    type="text"
                    className="form-control"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Your street and number"
                />
                 {errors.street_n_no ? (
                    <small className="text-danger mb-1">{errors.street_n_no}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your Entrence Code</label>
                <input
                    type="number"
                    className="form-control"
                    value={entrence}
                    onChange={(e) => setEntrence(e.target.value)}
                    placeholder="Your Entrence Code"
                />
                 {errors.entrence_code ? (
                    <small className="text-danger mb-1">{errors.entrence_code}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your Apt number</label>
                <input
                    type="number"
                    className="form-control"
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    placeholder="Your Appartment number"
                />
                 {errors.apt_no ? (
                    <small className="text-danger mb-1">{errors.apt_no}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your floor</label>
                <input
                    type="number"
                    className="form-control"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="Your floor"
                />
                 {errors.floor ? (
                    <small className="text-danger mb-1">{errors.floor}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Your Zipcode</label>
                <input
                    type="text"
                    className="form-control"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="Your zipcode"
                />
                 {errors.zipcode ? (
                    <small className="text-danger mb-1">{errors.zipcode}</small>
                ) : (
                    ""
                )}
            </div>
            
            <div className="form-group">
                <label className="control-label">Phone</label>
                <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your Phone"
                />
                 {errors.phone ? (
                    <small className="text-danger mb-1">{errors.phone}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label">Language</label>
                <select className="form-control" onChange={(e)=>e.target.value}>
                  <option value={0}>-- select language --</option>
                  <option value="heb" selected={ lng == 'heb'}>Hebrew</option>
                  <option value="en" selected={ lng == 'en'}>English</option>
                </select>
            </div>
            <div className="form-group">
                <label className="control-label">Color</label>
                <input
                    type="color"
                    className="form-control"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="control-label" style={{ display: "block" }}>
                    Upload Profile Image
                </label>
                <input
                    type="file"
                    onChange={handleChange}
                    style={{
                        display: "block",
                        height: "unset",
                        border: "none",
                    }}
                />
                <img
                    src={file}
                    className="img-fluid mt-2"
                    style={{ maxWidth: "200px" }}
                />
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
    );
}
