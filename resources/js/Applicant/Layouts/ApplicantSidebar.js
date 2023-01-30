import React from 'react'

export default function ApplicantSidebar() {
    function handleLogout(){
        e.preventDefault();
    }
  return (
    <div className='applicant-sidebar'>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#dashboard" role="tab" aria-controls="dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="profile">My Profile</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#ads" role="tab" aria-controls="ads">My Ads</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#account" role="tab" aria-controls="account">My Account</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#booking" role="tab" aria-controls="booking">My Booking</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </div>
  )
}
