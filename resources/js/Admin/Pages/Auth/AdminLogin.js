import React, { useState } from "react";
import { useAlert } from "react-alert";
import loginbg from "../../../Assets/image/loginbg.jpeg";
import logo from "../../../Assets/image/logo.png";

export default function AdminLogin() {
    const alert = useAlert();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const HandleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        axios.post(`/api/admin/login`, data).then((result) => {
            if (result.data.errors) {
                setErrors(result.data.errors);
            } else {
                localStorage.setItem("admin-token", result.data.token);
                localStorage.setItem(
                    "admin-name",
                    result.data.firstname + " " + result.data.lastname
                );
                localStorage.setItem("admin-id", result.data.id);
                window.location = "/admin/dashboard";
            }
        });
    };

    return (
        <div id="loginPage">
            <div className="container-fluid adminLogin">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="formSide">
                            <img src={logo} className="img-fluid" />
                            <h1 className="page-title">Admin Login</h1>
                            <form>
                                <div className="form-group">
                                    <div className="input-group mt-2">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"
                                                id="basic-addon1"
                                            >
                                                <i className="fa-solid fa-user"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            className="form-control"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Username"
                                            name="username"
                                            aria-label="Username"
                                        />
                                    </div>
                                    {errors.email ? (
                                        <small className="text-danger mb-1">
                                            {errors.email}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text"
                                                id="basic-addon1"
                                            >
                                                <i className="fa-solid fa-key"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            name="password"
                                            aria-label="Password"
                                        />
                                    </div>
                                    {errors.password ? (
                                        <small className="text-danger mb-1">
                                            {errors.password}
                                        </small>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="form-group">
                                    <ul className="list-inline">
                                        <li>
                                            <label>
                                                <input type="checkbox" />{" "}
                                                Remember me{" "}
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="form-group mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={HandleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 padding-right-zero">
                        <div className="trackImg">
                            <img src={loginbg} className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
