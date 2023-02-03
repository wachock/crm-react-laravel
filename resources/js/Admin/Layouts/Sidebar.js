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
                    <NavLink to="/admin/jobs-posted"><i className="fa-solid fa-video"></i>Scheduled Meetings</NavLink>
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
                    <NavLink to="/admin/services"><i className="fa-solid fa-screwdriver-wrench"></i>Services</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/admin/settings"><i className="fa-solid fa-gear"></i>Settings</NavLink>
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
