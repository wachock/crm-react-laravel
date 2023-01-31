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
            <div className="sideAdmin">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <img src={User} className="img-fluid" alt="Logo" />
                    </li>
                    <li className="list-inline-item">
                        <h5>{name}</h5>
                        <span>Administrator</span>
                    </li>
                    <li className="list-inline-item">
                        <div className="dropdown show">
                            <Link
                                className="dropdown-toggle"
                                href="#!"
                                role="button"
                                id="dropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-angle-down"></i>
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <Link className="dropdown-item" to="/admin/settings">
                                    My Account
                                </Link>
                                <Link className="dropdown-item" onClick={HandleLogout}>
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <ul
                className="list-group"
                style={{ borderTop: "1px solid #E6E8EB" }}
            >
                <li className="list-group-item">
                    <Link to="/admin/dashboard">
                        <i className="fa-solid fa-gauge"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/jobs-posted">
                        <i className="fa-solid fa-cloud"></i>
                        Jobs
                    </Link>
                </li>
               
                <li className="list-group-item">
                    <Link to="/admin/clients">
                        <i className="fa-solid fa-user"></i>
                       Client
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/employers">
                        <i className="fa-solid fa-user"></i>
                        Worker
                    </Link>
                </li>
                <li className='list-group-item'>
                    <div id="fence" className='commonDropdown'>
                        <div className="card-header" id="fencehead2">
                            <Link href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#fence2"
                            aria-expanded="true" aria-controls="job">
                            <i className="fa-solid fa-briefcase"></i> Services <i className="fa-solid fa-angle-down"></i>
                            </Link>
                        </div>
                        <div id="fence2" className="collapse" aria-labelledby="fencehead2" data-parent="#fence">
                            <div className="card-body">
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <Link to="/admin/services"><i className="fa fa-angle-right"></i> Services</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/services-timings"><i className="fa fa-angle-right"></i> Schedules</Link>
                                </li>                          
                            </ul>
                            </div>
                        </div>
                    </div>
                </li>

                <li className='list-group-item'>
                    <div id="fence" className='commonDropdown'>
                        <div className="card-header" id="fencehead2">
                            <Link href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#fence2"
                            aria-expanded="true" aria-controls="job">
                            <i className="fa-solid fa-briefcase"></i> Catalog <i className="fa-solid fa-angle-down"></i>
                            </Link>
                        </div>
                        <div id="fence2" className="collapse" aria-labelledby="fencehead2" data-parent="#fence">
                            <div className="card-body">
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <Link to="/admin/reviews"><i className="fa fa-angle-right"></i> Reviews</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/skills"><i className="fa fa-angle-right"></i> Skills</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/language"><i className="fa fa-angle-right"></i> Language</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/nationality"><i className="fa fa-angle-right"></i> Nationality</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/information-pages"><i className="fa fa-angle-right"></i> Information pages</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/job-profiles"><i className="fa fa-angle-right"></i> Job Profiles</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/tasks"><i className="fa fa-angle-right"></i> Tasks</Link>
                                </li>                              
                            </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li className='list-group-item'>
                    <div id="fence" className='commonDropdown'>
                        <div className="card-header" id="fencehead1">
                            <Link href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#fence1"
                            aria-expanded="true" aria-controls="fence1">
                            <i className="fa-solid fa-dollar-sign"></i> Financial <i className="fa-solid fa-angle-down"></i>
                            </Link>
                        </div>
                        <div id="fence1" className="collapse" aria-labelledby="fencehead1" data-parent="#fence">
                            <div className="card-body">
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    <Link to="/admin/plans"><i className="fa fa-angle-right"></i> Plans</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/subscription"><i className="fa fa-angle-right"></i> Subscription</Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link to="/admin/transaction-history"><i className="fa fa-angle-right"></i> Transaction History</Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/settings">
                        <i className="fa-solid fa-gear"></i> Settings
                    </Link>
                </li>
            </ul>
            <div className="sideLogout">
                <div className="logoutBtn">
                    <button className="btn btn-danger" onClick={HandleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
