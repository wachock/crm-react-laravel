import React,{ useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Link} from "react-router-link";
import User from '../../Assets/image/user.png';
import { useAlert } from "react-alert";
import MobileHeader from "./MobileHeader";

export default function AdminHeader() {
  const alert = useAlert();
   const navigate = useNavigate();
    const [file,setFile] = useState("");4
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };
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

    const getSetting = () => {
      axios.get("/api/admin/my-account", { headers }).then((response) => {
          (response.data.account.avatar) ? 
          setFile(response.data.account.avatar)
          :setFile(User);

      });
  };
  useEffect(() => {
      getSetting();
  }, []);
  return (
    <>
    <div className='AdminHeader hidden-xs'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>Welcome Administrator</h1>
          </div>
          <div className="col-sm-6">
            <div className="float-right d-flex">
              <div className="dropdown notification-bell">
                <span className="counter">3</span>
                <button type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <div className="agg-list">
                      <div className="icons"><i className="fas fa-check-circle"></i></div>
                      <div className="agg-text">
                        <h6><a href='#'>John Doe</a> has cancelled the job for <a href='#'>Office Cleaning</a>, <a href='#'>Cleaning after renovation</a>, <a href='#'>Window cleaning</a> service</h6>
                        <p>15 Mar 2023, 02:25 PM</p>
                      </div>
                    </div>
                  </li>

                  <li className="dropdown-item">
                    <div className="agg-list">
                      <div className="icons"><i className="fas fa-check-circle"></i></div>
                      <div className="agg-text">
                        <h6>Meeting scheduled with <a href='#'>Michael</a> on 24-03-2023 at 11:30 AM for <a href="#">Thorough cleaning</a> service</h6>
                        <p>16 Mar 2023, 04:15 PM</p>
                      </div>
                    </div>
                  </li>

                  <li className="dropdown-item">
                    <div className="agg-list">
                      <div className="icons"><i className="fas fa-check-circle"></i></div>
                      <div className="agg-text">
                        <h6><a href="#">Chris Bale</a> has approved the contract for <a href="#">Window Cleaning</a>, <a href="#">Thorough cleaning</a> service</h6>
                        <p>15 Mar 2023, 12:45 PM</p>
                      </div>
                    </div>
                  </li> 

                  <li className="dropdown-item">
                    <div className="agg-list">
                      <div className="icons"><i className="fas fa-check-circle"></i></div>
                      <div className="agg-text">
                        <h6><a href="#">Diane V</a>  wants to reschedule the job for <a href="#">Window cleaning</a> service</h6>
                        <p>15 Mar 2023, 12:45 PM</p>
                      </div>
                    </div>
                  </li> 

                  <li className="dropdown-item">
                    <div className="agg-list">
                      <div className="icons"><i className="fas fa-check-circle"></i></div>
                      <div className="agg-text">
                        <h6><a href="#">Kristine</a> has rejected the price offer for <a href="#">Cleaning after renovation</a> service</h6>
                        <p>15 Mar 2023, 12:45 PM</p>
                      </div>
                    </div>
                  </li> 

                  {/* View all notification button */}

                  <li className="dropdown-item">
                    <div className="allNotification">
                      <a style={{color: "#fff", display: "block"}} href='/admin/notifications' className='btn btn-pink'>See all</a>
                    </div>
                  </li>

                </ul>
                
              </div>
              <div className="userToggle dropdown show">
                <Link className="dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={file} className='img-fluid' alt='Admin' />
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
    <MobileHeader/>
    </>
  )
}
