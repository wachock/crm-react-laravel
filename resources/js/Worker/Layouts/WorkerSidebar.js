import React from 'react'

export default function WorkerSidebar() {
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
                <a className="nav-link" data-toggle="tab" href="#candidate" role="tab" aria-controls="candidate">Candidates</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#account" role="tab" aria-controls="account">My Account</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="./looking-for-help">Post a Ad</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#plan" role="tab" aria-controls="plan">Upgrade my plan</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </div>
  )
}