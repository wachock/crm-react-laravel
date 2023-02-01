import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function ClientSidebar() {
    const navigate  = useNavigate();
    function handleLogout(e){
        e.preventDefault();
        fetch("/api/client/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem("user-token"),
            },
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                localStorage.removeItem("user-token");
                localStorage.removeItem("user-name");
                localStorage.removeItem("user-id");
                navigate("/client/login");
                alert.success("Logged Out Successfully");
            }
        });
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
                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </div>
  )
}
