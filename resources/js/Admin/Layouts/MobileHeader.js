import React from 'react'
import logo from "../../Assets/image/logo.png";
import bars from "../../Assets/image/icons/bars.svg";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";


export default function MobileHeader() {
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
    <div className='mobileNav hidden-xl'>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <a className="navbar-brand" href="/admin/dashboard"><img src={logo} className='img-fluid' /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="icon-bar">
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">       
                        <image xlinkHref={bars} height="30" width="30"/>
                    </svg>
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className='nav-item'>
                        <a href="/admin/dashboard"><i className="fa-solid fa-gauge"></i>Dashboard</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/clients"><i className="fa-solid fa-user-tie"></i>Clients</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/workers"><i className="fa-solid fa-users"></i>Workers</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/schedule"><i className="fa-solid fa-video"></i>Scheduled Meetings</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/offered-price"><i className="fa-solid fa-tags"></i>Offered Prices</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/contracts"><i className="fa-solid fa-clipboard-list"></i>Contracts</a>
                    </li>
                    <li className='nav-item'>
                        <a href="/admin/jobs"><i className="fa-solid fa-briefcase"></i>Jobs</a>
                    </li>
                    <li className="nav-item">
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
                                            <a href="/admin/manage-team"><i className="fa fa-angle-right"></i> Manage team</a>
                                        </li>
                                        <li className='list-group-item'>
                                            <a href="/admin/services"><i className="fa fa-angle-right"></i> Services</a>
                                        </li>
                                        <li className='list-group-item'>
                                            <a href="/admin/manage-time"><i className="fa fa-angle-right"></i> Manage Time</a>
                                        </li>
                                        <li className='list-group-item'>
                                            <a href="/admin/settings"><i className="fa fa-angle-right"></i> My Account</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li> 
                </ul>
                <div className='sideLogout'>
                    <div className='logoutBtn'>
                        <button className='btn btn-danger' onClick = { HandleLogout } >Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    </div> 
  )
}
