import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function ProfileDetails({ client, offerStatus , scheduleStatus , latestContract }) {
    
    const navigate = useNavigate();
    const firstname = client.firstname;
    const lastname = client.lastname;
    const email = client.email;
    const phone = (client.phone) ? client.phone.toString().split(",").join(' | '): '';
    const city = client.city;
    const streetNumber = client.street_n_no;
    const floor = client.floor;
    const Apt = client.apt_no;
    const enterance = client.entrence_code;
    const lang = (client.lng =='heb') ? 'Hebrew' : 'English';
    
    let geo_address = (client.geo_address) ? client.geo_address : "NA";
    let cords   = (client.latitude && client.longitude) ? client.latitude +","+ client.longitude :"";

    const zip = client.zipcode;
    const passcode = client.passcode;
    const joined = Moment(client.created_at).format('DD/MM/Y')+" "+Moment(client.created_at).format('dddd');
    
    const  cardType    = (latestContract) ? latestContract.card_type : '';
    const nameOnCard   = (latestContract) ? latestContract.name_on_card : '';
    const cvv          = (latestContract) ? latestContract.cvv: '';
    const signature    = (latestContract) ? <a href={latestContract.card_sign} target="_blank">view</a>  : '';
    const param = useParams();
    
    let scolor = '', ocolor = '';
     if(scheduleStatus == 'pending' || scheduleStatus == 'Not Sent') {scolor = '#7e7e56'} 
     if(scheduleStatus == 'confirmed') {scolor = 'green'} 
     if(scheduleStatus == 'completed') {scolor = 'lightblue'} 
     if(scheduleStatus == 'declined') {scolor = 'red'} 

     if(offerStatus == 'sent' || offerStatus == 'Not Sent') {ocolor = '#7e7e56'} 
     if(offerStatus == 'accepted') {ocolor = 'green'} 
     if(offerStatus == 'declined') {ocolor = 'red'}  

     const handleTab = (e)=>{
        e.preventDefault();
        let id = (e.target.getAttribute('id'));
        if(id == "ms")
        document.querySelector('#schedule-meeting').click();
        if(id == "os")
        document.querySelector('#offered-price').click();
        if(id == "cs")
        document.querySelector('#contract').click();

     }
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
                                                <label>Language</label>
                                                <p>{lang}</p>
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
                                        <div className='col-sm-4'>
                                            <div className='form-group'>
                                                <label>Google address</label>
                                                <p><a href={`https://maps.google.com?q=${ cords}`} target='_blank'>
                                                    {geo_address}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-card-details" className="tab-pane" role="tab-panel" aria-labelledby="card-details">
                                    <div className='form-group'>
                                        <ul className='list-unstyled'>
                                            <li><strong>Card Type: </strong>{cardType}</li>
                                            <li><strong>Name on card: </strong>{nameOnCard}</li>
                                            <li><strong>Cvv: </strong>{cvv}</li>
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
                                <span onClick={(e)=>handleTab(e)} id="ms"  className='dashStatus' style={{ background: scolor,cursor:"pointer" }}>{scheduleStatus}</span>
                            </div>

                            <div className='form-group'>
                                <label className='d-block'>Price Offer</label>
                                <span  onClick={(e)=>handleTab(e)} id="os" className='dashStatus' style={{ background: ocolor,cursor:"pointer" }}>{offerStatus}</span>
                            </div>

                            <div className='form-group mb-0'>
                                <label className='d-block'>Contract</label>
                                <span  onClick={(e)=>handleTab(e)} id="cs" className='dashStatus' style={{ background: (latestContract && latestContract.status == 'Signed') ? 'green' : '#7e7e56',"cursor":"pointer" }}>{(latestContract) ? latestContract.status : 'Not Sent'}</span>
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
