import React, { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Link} from "react-router-link";
import User from '../../Assets/image/user.png';
import { useAlert } from "react-alert";
import axios from "axios";
import ClientMobileHeader from "./ClientMobileHeader";

export default function ClientHeader() {
  const alert = useAlert();
   const navigate = useNavigate();
    const [avatar,setAvatar] = useState("");
    const HandleLogout = (e) => {
        fetch("/api/client/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + localStorage.getItem("client-token"),
            },
        }).then((res) => {
            if (res.status === 200) {
                localStorage.removeItem("client-token");
                localStorage.removeItem("client-name");
                localStorage.removeItem("client-id");
                navigate("/client/login");
                alert.success("Logged Out Successfully");
            }
        });
    };
    const headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ` + localStorage.getItem("client-token"),
  };
    const getAvatar = () =>{
      axios
      .get('/api/client/my-account',{ headers })
      .then((res)=>{
        setAvatar(res.data.account.avatar);
      })
    }
    useEffect(()=>{
      getAvatar();
    },[]);
    
  return (
    <>
    <div className='AdminHeader hidden-xs'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1>Welcome { localStorage.getItem("client-name") }</h1>
          </div>
          <div className="col-sm-6">
            <div className="float-right">
              <div className="dropdown show">
                <Link className="dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={avatar} className='img-fluid' alt='Avatar not uploaded' />
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
    <ClientMobileHeader/>
    </>
  )
}
