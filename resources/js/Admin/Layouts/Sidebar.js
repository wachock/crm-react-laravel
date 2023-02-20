import React from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/image/logo.png";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {

    const alert = useAlert();
    const name = localStorage.getItem("admin-name");
    const navigate = useNavigate();

    const HandleLogout = (e) => {
        fetch("/api/admin/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem("admin-token"),
            },
        }).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem("admin-token");
                localStorage.removeItem("admin-name");
                localStorage.removeItem("admin-id");
                navigate("/admin/login");
                alert.success("Logged Out Successfully");
            }
        });
        localStorage.removeItem("admin-token");
        localStorage.removeItem("admin-name");
        localStorage.removeItem("admin-id");
        navigate("/admin/login");
        alert.success("Logged Out Successfully");
    };

    return (
        <div id="column-left">
            <div className="sideLogo">
                <Link to="/admin/dashboard">
                    <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    <NavLink to="/admin/dashboard"><i className="fa-solid fa-gauge"></i>Dashboard</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/clients"><i className="fa-solid fa-user-tie"></i>Clients</NavLink>
                </li>   
                <li className="list-group-item">
                    <NavLink to="/admin/workers"><i className="fa-solid fa-users"></i>Workers</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/schedule"><i className="fa-solid fa-video"></i>Scheduled Meetings</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/offered-price"><i className="fa-solid fa-tags"></i>Offered Prices</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/contracts"><i className="fa-solid fa-clipboard-list"></i>Contracts</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/jobs"><i className="fa-solid fa-briefcase"></i>Jobs</NavLink>
                </li>
                
                <li className="list-group-item">
                    <div id="fence" className='fence commonDropdown'>
                        <div id="fencehead1">
                            <a href="#" className="text-left btn btn-header-link" data-toggle="collapse" data-target="#fence1" aria-expanded="true" aria-controls="fence1">
                                <i className="fa-solid fa-gear"></i> Settings <i className="fa-solid fa-angle-down"></i>
                            </a>
                        </div>
                        <div id="fence1" className="collapse" aria-labelledby="fencehead1" data-parent="#fence">
                            <div className="card-body">
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        <Link to="/admin/manage-team"><i className="fa fa-angle-right"></i> Manage team</Link>
                                    </li>
                                    <li className='list-group-item'>
                                        <Link to="/admin/services"><i className="fa fa-angle-right"></i> Services</Link>
                                    </li>
                                    <li className='list-group-item'>
                                        <Link to="/admin/manage-time"><i className="fa fa-angle-right"></i> Manage Time</Link>
                                    </li>
                                    <li className='list-group-item'>
                                        <Link to="/admin/settings"><i className="fa fa-angle-right"></i> My Account</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="sideLogout">
                <div className="logoutBtn">
                    <button className="btn btn-white" onClick={HandleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
