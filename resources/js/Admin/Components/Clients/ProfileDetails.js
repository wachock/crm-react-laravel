import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Moment from 'moment';

export default function ProfileDetails({ client }) {


    const firstname = client.firstname;
    const lastname = client.lastname;
    const email = client.email;
    const phone = client.phone;
    const city = client.city;
    const streetNumber = client.street_n_no;
    const floor = client.floor;
    const Apt = client.apt_no;
    const enterance = client.entrence_code;
    const zip = client.zipcode;
    const passcode = client.passcode;
    const joined = Moment(client.created_at).format('DD/MM/Y')+" "+Moment(client.created_at).format('dddd');
    const [meeting] = useState("Scheduled");
    const [priceOffer] = useState("Not Sent");
    const [cardType] = useState("MasterCard");
    const [cardNumber] = useState("3452789012346781");
    const [cardValidity] = useState("10/24");
    const [nameOnCard] = useState("Alex Adams");
    const [signature] = useState("Alex");
    const param = useParams();

    return (
        <>

            <div className='client-view'>
                <h1><span>#{client.id}</span> {firstname} {lastname}</h1>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div className='ClientHistory dashBox p-4 min-414'>
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item" role="presentation"><a id="client-details" className="nav-link active" data-toggle="tab" href="#tab-client-details" aria-selected="true" role="tab">Client info</a></li>
                                <li className="nav-item" role="presentation"><a id="card-details" className="nav-link" data-toggle="tab" href="#tab-card-details" aria-selected="false" role="tab">Card details</a></li>
                            </ul>
                            <div className='tab-content'>
                                <div id="tab-client-details" className="tab-pane active show" role="tab-panel" aria-labelledby="client-details">
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Color</label>
                                                <span style={{ background: (client.color) ? client.color: "#000" , height: "24px", width: "34px", display: "block", borderRadius: "4px" }}>&nbsp;</span>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Email</label>
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Phone</label>
                                                <p>{phone}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Address</label>
                                                <p>{floor}, {Apt}, {streetNumber}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>City</label>
                                                <p>{city} - {zip}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Enterance code</label>
                                                <p>{enterance}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Login details</label>
                                                <p><span>Email:</span> {email}</p>
                                                <p><span>Password:</span> {passcode}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Joined on</label>
                                                <p>{joined}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-card-details" className="tab-pane" role="tab-panel" aria-labelledby="card-details">
                                    <div className='form-group'>
                                        <ul className='list-unstyled'>
                                            <li><strong>Card Type: </strong>{cardType}</li>
                                            <li><strong>Card No: </strong>{cardNumber}</li>
                                            <li><strong>Card Validity: </strong>{cardValidity}</li>
                                            <li><strong>Name on card: </strong>{nameOnCard}</li>
                                            <li><strong>Signature: </strong>{signature}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4'>
                        <div className='dashBox p-4'>
                            <div className='form-group'>
                                <label className='d-block'>Meeting Status</label>
                                <span className='dashStatus' style={{ background: "green" }}>{meeting}</span>
                            </div>
                            <div className='form-group mb-0'>
                                <label className='d-block'>Price Offer</label>
                                <span className='dashStatus' style={{ background: "red" }}>{priceOffer}</span>
                            </div>
                        </div>
                        <div className='buttonBlocks dashBox mt-3 p-4'>
                            <Link to={`/admin/view-schedule/${param.id}`}><i className="fas fa-hand-point-right"></i> Schedule Meeting</Link>
                            <Link to={`/admin/add-offer?c=${param.id}`}><i className="fas fa-hand-point-right"></i> Send Offer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
