import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function ClientSidebar() {
    const navigate  = useNavigate();
    function handleLogout(e){
        e.preventDefault();
        fetch("/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem("worker-token"),
            },
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                localStorage.removeItem("worker-token");
                localStorage.removeItem("worker-name");
                localStorage.removeItem("worker-id");
                navigate("/worker/login");
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
                <a className="nav-link btn" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    </div>
  )
}