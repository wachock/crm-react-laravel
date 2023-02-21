import React from "react";
import { useAlert } from "react-alert";
import { useNavigate,Link } from "react-router-dom";
import logo from "../../Assets/image/logo.png";
import { NavLink } from 'react-router-dom';

export default function WorkerSidebar() {

    const alert = useAlert();
    const name = localStorage.getItem("admin-name");
    const navigate = useNavigate();

    const HandleLogout = (e) => {
        fetch("/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem("worker-token"),
            },
        }).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem("worker-token");
                localStorage.removeItem("worker-name");
                localStorage.removeItem("worker-id");
                navigate("/worker/login");
                alert.success("Logged Out Successfully");
            }
        });
        localStorage.removeItem("worker-token");
        localStorage.removeItem("worker-name");
        localStorage.removeItem("worker-id");
        navigate("/worker/login");
        alert.success("Logged Out Successfully");
    };

    return (
        <div id="column-left">
            <div className="sideLogo">
                <Link to="/worker/dashboard">
                    <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    <NavLink to="/worker/dashboard"><i className="fa-solid fa-gauge"></i>Dashboard</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/worker/jobs"><i className="fa-solid fa-briefcase"></i>Jobs</NavLink>
                </li>
                 <li className="list-group-item">
                    <NavLink to="/worker/schedule"><i className="fa-solid fa-clipboard-list"></i>Schedule</NavLink>
                </li>
                <li className="list-group-item">
                    <div id="fence" className='commonDropdown fence'>
                        <div id="fencehead1">
                            <a href="#" className="text-left btn btn-header-link" data-toggle="collapse" data-target="#fence1" aria-expanded="true" aria-controls="fence1">
                                <i className="fa-solid fa-gear"></i> Settings <i className="fa-solid fa-angle-down"></i>
                            </a>
                        </div>
                        <div id="fence1" className="collapse" aria-labelledby="fencehead1" data-parent="#fence">
                            <div className="card-body">
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        <Link to="/worker/my-account"><i className="fa fa-angle-right"></i> My Account</Link>
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
