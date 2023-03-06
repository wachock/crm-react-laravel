import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";
import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
    Autocomplete,
} from "@react-google-maps/api";
import Geocode from "react-geocode";

export default function AddClient() {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [invoiceName, setInvoiceName] = useState("");
    const [phone, setPhone] = useState("");
    const [floor, setFloor] = useState("");
    const [Apt, setApt] = useState("");
    const [enterance, setEnterance] = useState("");
    const [zip, setZip] = useState("");
    const [dob, setDob] = useState("");
    const [passcode, setPassCode] = useState("");
    const [lng, setLng] = useState("");
    const [color, setColor] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const [city,setCity] = useState("");
    const alert = useAlert();
    const navigate = useNavigate();

    const [libraries] = useState(["places", "geometry"]);
    const [latitude, setLatitude] = useState(-33.865143);
    const [longitude, setLongitude] = useState(151.2099);
    const [address, setAddress] = useState("");
    const [place, setPlace] = useState();
    Geocode.setApiKey("AIzaSyDVR2fXPoEVoCNLIqagX5GQzna3feez4lI");
    const containerStyle = {
        width: "100%",
        height: "300px",
    };
    const center = {
        lat: latitude,
        lng: longitude,
    };


    const handlePlaceChanged = () => {
        if (place) {
            
            setCity(place.getPlace().vicinity);
            setAddress(place.getPlace().formatted_address);
            setLatitude(place.getPlace().geometry.location.lat());
            setLongitude(place.getPlace().geometry.location.lng());
        }
    };

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var phoneClc = '';
        var phones = document.querySelectorAll('input[name="phone[]"]');
        phones.forEach((p, i) => {
            phoneClc += p.value + ',';
        });
        phoneClc = phoneClc.replace(/,\s*$/, "");
        const data = {
            firstname: firstname,
            lastname: lastname,
            invoicename: invoiceName,
            floor: floor,
            apt_no: Apt,
            entrence_code: enterance,
            city:city,
            zipcode: zip,
            dob: dob,
            passcode: passcode,
            lng: (lng != 0) ? lng : 'heb',
            color: (!color) ? '#fff': color,
            geo_address: address,
            latitude: latitude,
            longitude: longitude,
            email: email,
            phone: phoneClc,
            password: passcode,
            status: (!status) ?  1 : status,
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

    const addPhone = (e) => {
        e.preventDefault();
        var cont = document.querySelectorAll('.phone')[0].firstChild.innerHTML;
        var htm = "<div class='form-group'>" + cont + "</div>"
        document.querySelector('.phone').innerHTML += (htm);
    }

    useEffect(() => {

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
                                                name={'phone[]'}
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
                                <div className="form-group">
                                    <label className="control-label">Enter a location</label>
                                    <LoadScript
                                        googleMapsApiKey="AIzaSyDVR2fXPoEVoCNLIqagX5GQzna3feez4lI"
                                        libraries={libraries}
                                    >
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={center}
                                            zoom={15}
                                        >
                                            <Marker
                                                draggable={true}
                                                onDragEnd={(e) => onMarkerDragEnd(e)}
                                                position={{
                                                    lat: latitude,
                                                    lng: longitude,
                                                }}
                                            />
                                            {address ? (
                                                <InfoWindow
                                                    onClose={(e) => onInfoWindowClose(e)}
                                                    position={{
                                                        lat: latitude + 0.0018,
                                                        lng: longitude,
                                                    }}
                                                >
                                                    <div>
                                                        <span style={{ padding: 0, margin: 0 }}>
                                                            {address}
                                                        </span>
                                                    </div>
                                                </InfoWindow>
                                            ) : (
                                                <></>
                                            )}
                                            <Marker />
                                        </GoogleMap>
                                        <Autocomplete
                                            onLoad={(e) => setPlace(e)}
                                            onPlaceChanged={handlePlaceChanged}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search Your Address"
                                                className="form-control mt-1"
                                            />
                                        </Autocomplete>
                                    </LoadScript>
                                </div>


                                <h4 className="mt-2 mb-3">Client Full Address</h4>
                                
                                <div className="form-group">
                                    <label className="control-label">Full Address
                                    <small className="text-pink mb-1">
                                        &nbsp; (auto complete from google address)
                                     </small>
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        className="form-control"
                                        placeholder="Full Address"
                                    />
                                   
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
                                    <label className="control-label">Apt number and Apt name</label>
                                    <input
                                        type="text"
                                        value={Apt}
                                        onChange={(e) => setApt(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Apt number and name"
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
                                    <label className="control-label">Date of Birth</label>
                                    <input
                                        type="date"
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
                                    <label className="control-label">Language</label>

                                    <select
                                        className="form-control"
                                        value={lng}
                                        onChange={(e) => setLng(e.target.value)}
                                    >
                                        <option value={0}>Please select language</option>
                                        <option value="heb">Hebrew</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline1 pl-0" style={{paddingLeft: "0"}}>
                                        <label class="form-check-label" for="title">Color</label>
                                    </div>
                                    <div className="swatch white">
                                        <input type="radio" name="swatch_demo" id="swatch_2" value="0" color="#fff;" onChange={(e) => setColor('#fff')} />
                                        <label for="swatch_2"><i className="fa fa-check"></i></label>
                                        <span>white</span>
                                    </div>
                                    <div className="swatch green">
                                        <input type="radio" name="swatch_demo" id="swatch_2" value="2" color="#28a745" onChange={(e) => setColor('#28a745')} />
                                        <label for="swatch_2"><i className="fa fa-check"></i></label>
                                        <span>Green</span>
                                    </div>
                                    <div className="swatch blue">
                                        <input type="radio" name="swatch_demo" id="swatch_3" value="3" color="#007bff" onChange={(e) => setColor('#007bff')} />
                                        <label for="swatch_3"><i className="fa fa-check"></i></label>
                                        <span>Blue</span>
                                    </div>
                                    <div className="swatch purple">
                                        <input type="radio" name="swatch_demo" id="swatch_1" value="1" color="#6f42c1" onChange={(e) => setColor('#6f42c1')} />
                                        <label for="swatch_1"><i className="fa fa-check"></i></label>
                                        <span>Voilet</span>
                                    </div>
                                    <div className="swatch red">
                                        <input type="radio" name="swatch_demo" id="swatch_5" value="5" color="#dc3545" onChange={(e) => setColor('#dc3545')} />
                                        <label for="swatch_5"><i className="fa fa-check"></i></label>
                                        <span>Red</span>
                                    </div>
                                    <div className="swatch orange">
                                        <input type="radio" name="swatch_demo" id="swatch_4" value="4" color="#fd7e14" onChange={(e) => setColor('#fd7e14')} />
                                        <label for="swatch_4"><i className="fa fa-check"></i></label>
                                        <span>Orange</span>
                                    </div>
                                    <div className="swatch yellow">
                                        <input type="radio" name="swatch_demo" id="swatch_6" value="6" color="#ffc107" onChange={(e) => setColor('#ffc107')} />
                                        <label for="swatch_6"><i className="fa fa-check"></i></label>
                                        <span>Yellow</span>
                                    </div>


                                    {errors.color ? (
                                        <small className="text-danger mb-1">
                                            {errors.color}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </div>



                                <div className="form-group mt-35">
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
                                    <input type="submit" value="SAVE" onClick={handleSubmit} className="btn btn-pink saveBtn" />
                                </div>
                               
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
