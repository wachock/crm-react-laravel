import React from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/image/logo.png";
import User from "../../Assets/image/user.png";

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
                    <Link to="/admin/dashboard"><i className="fa-solid fa-gauge"></i>Dashboard</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/clients"><i class="fa-solid fa-user-tie"></i>Clients</Link>
                </li>   
                <li className="list-group-item">
                    <Link to="/admin/workers"><i class="fa-solid fa-users"></i>Workers</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/jobs-posted"><i class="fa-solid fa-video"></i>Scheduled Meetings</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/jobs-posted"><i class="fa-solid fa-tags"></i>Offered Prices</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/jobs-posted"><i class="fa-solid fa-clipboard-list"></i>Contracts</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/jobs-posted"><i class="fa-solid fa-briefcase"></i>Jobs</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/services"><i class="fa-solid fa-screwdriver-wrench"></i>Services</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/settings"><i className="fa-solid fa-gear"></i>Settings</Link>
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
