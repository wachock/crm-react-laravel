import React from 'react'
import User from '../../Assets/image/user.png';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-link';

export default function AdminHeader() {
  const alert = useAlert();
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
    };
  return (
    <div className='AdminHeader'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>Welcome Administrator</h1>
          </div>
          <div className="col-sm-6">
            <div className="float-right">
              <div className="dropdown show">
                <Link className="dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={User} className='img-fluid' alt='Ajay' />
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link className="dropdown-item" to="/admin/settings">My Account</Link>
                  <Link className="dropdown-item" onClick={HandleLogout}>Logout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
