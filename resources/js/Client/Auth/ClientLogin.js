import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//import Footer from "../client/Layouts/Footer";
//import Header from "../client/Layouts/Header";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../../Assets/image/logo.png";


export default function ClientLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const HandleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        axios.post(`/api/client/login`, data).then((result) => {
            if (result.data.errors) {
                setErrors(result.data.errors);
            } else {
                localStorage.setItem("client-token", result.data.token);
                localStorage.setItem(
                    "client-name",
                    result.data.firstname + " " + result.data.lastname
                );
                localStorage.setItem("client-id", result.data.id);

                    window.location = "/client/dashboard";
            }
        });
    };
    const onChange = (value) => {
        console.log("Captcha value:", value);
    };

    return (
           <div id="loginPage">
            <div className="container adminLogin">
                <div className="formSide"> 
                    <img src={logo} className="img-fluid" />
                    <h1 className="page-title">Client Login</h1>
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
        </div>
    );
}