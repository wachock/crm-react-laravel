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
  const [meeting] = useState("Scheduled");
  const [priceOffer] = useState("Sent");
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
                <div className='dashBox p-4'>
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
                                <label>Meeting Status</label>
                                <p>{meeting}</p>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label>Price Offer</label>
                                <p>{priceOffer}</p>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label>Login details</label>
                                <p><span>Email:</span> {email}</p>
                                <p><span>Password:</span> {passcode}</p>
                            </div>
                        </div>
                        <div className='col-sm-12'>
                            <div className='form-group'>
                                <label>Card details</label>
                                <ul className='list-inline'>
                                    <li className='list-inline-item'><strong>Card Type: </strong>{cardType},</li>
                                    <li className='list-inline-item'><strong>Card No: </strong>{cardNumber},</li>
                                    <li className='list-inline-item'><strong>Card Validity: </strong>{cardValidity},</li>
                                    <li className='list-inline-item'><strong>Name on card: </strong>{nameOnCard},</li>
                                    <li className='list-inline-item'><strong>Signature: </strong>{signature}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-sm-4'>
                <div className='buttonBlocks dashBox p-4'>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Schedule Meeting</Link>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Create Contract</Link>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Add Job</Link>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Send Offer</Link>
                    <Link to='#!'><i className="fas fa-hand-point-right"></i> Send Email</Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
