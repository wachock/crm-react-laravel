import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/image/logo.png";
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function ClientSidebar() {

    const alert = useAlert();
    const name = localStorage.getItem("admin-name");
    const navigate = useNavigate();
    const {t} = useTranslation();
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
        localStorage.removeItem("client-token");
        localStorage.removeItem("client-name");
        localStorage.removeItem("client-id");
        navigate("/client/login");
        alert.success("Logged Out Successfully");
    };

    
    
    return (
        <div id="column-left">
            <div className="sideLogo">
                <Link to="/client/dashboard">
                    <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
            </div>
            <ul className="list-group">
                <li className="list-group-item">
                    <NavLink to="/client/dashboard"><i className="fa-solid fa-gauge"></i>{t('client.sidebar.dashboard')}</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/client/schedule"><i className="fa-solid fa-video"></i>{t('client.sidebar.schedule_meet')}</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/client/offered-price"><i className="fa-solid fa-tags"></i>{t('client.sidebar.ofr_price')}</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/client/contracts"><i className="fa-solid fa-clipboard-list"></i>{t('client.sidebar.contracts')}</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/client/jobs"><i className="fa-solid fa-briefcase"></i>{t('client.sidebar.jobs')}</NavLink>
                </li>
                <li className="list-group-item">
                    <NavLink to="/client/settings"><i className="fa-solid fa-gear"></i>{t('client.sidebar.settings')}</NavLink>
                </li>
                
            </ul>
            <div className="sideLogout">
                <div className="logoutBtn">
                    <button className="btn btn-white" onClick={HandleLogout}>
                    {t('client.logout')}
                    </button>
                </div>
            </div>
        </div>
    );
}
