import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProfileDetails() {
  
  const [firstname] = useState('Alex');
  const [lastname] = useState('Adams');
  const [email] = useState('alex999@gmail.com'); 
  const [phone] = useState('9088781234');
  const [city] = useState("Netanya");
  const [streetNumber] = useState("Saket");
  const [floor] = useState("Fourth floor");
  const [Apt] = useState("Galaxy Apartment");
  const [enterance] = useState("5");
  const [zip] = useState("1231400");
  const [passcode] = useState("1380600");
  const [joined] = useState("25/12/2022");
  const [meeting] = useState("Scheduled");
  const [priceOffer] = useState("Not Sent");
  const [cardType] = useState("MasterCard");
  const [cardNumber] = useState("3452789012346781");
  const [cardValidity] = useState("10/24");
  const [nameOnCard] = useState("Alex Adams");
  const [signature] = useState("Alex");
  
  return (
    <>
    
    <div className='client-view'>
        <h1><span>#20</span> {firstname} {lastname}</h1>
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
                                        <span style={{background: "#ff0000", height: "24px", width: "34px", display: "block", borderRadius: "4px"}}>&nbsp;</span>
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
                        <span className='dashStatus' style={{background: "green"}}>{meeting}</span>
                    </div>
                    <div className='form-group mb-0'>
                        <label className='d-block'>Price Offer</label>
                        <span className='dashStatus' style={{background: "red"}}>{priceOffer}</span>
                    </div>
                </div>
                <div className='buttonBlocks dashBox mt-3 p-4'>
                    <Link to='/admin/view-schedule'><i className="fas fa-hand-point-right"></i> Schedule Meeting</Link>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Send Offer</Link>
                    <Link to='/create-contract'><i className="fas fa-hand-point-right"></i> Create Contract</Link> 
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
