import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Recaptcha from "../Assets/image/Frontend/recaptcha.png";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
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
                localStorage.setItem("user-token", result.data.token);
                localStorage.setItem(
                    "user-name",
                    result.data.firstname + " " + result.data.lastname
                );
                localStorage.setItem("user-id", result.data.id);

                    window.location = "/client/dashboard";
            }
        });
    };
    const onChange = (value) => {
        console.log("Captcha value:", value);
    };

    return (
        <div>
            <Header />
            <div className="login">
                <Container>
                    <Row>
                        <Col sm="12" xs="12">
                            <div className="loginform">
                                <h1>Client Login</h1>
                                <Form>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleUForm.ControlInput1"
                                    >
                                        <Form.Label>
                                             Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            className="inputstyle"
                                            placeholder="Enter email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                        {errors.email ? (
                                            <small className="text-danger mb-1">
                                                {errors.email}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput2"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            className="inputstyle"
                                            placeholder="Enter password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        {errors.password ? (
                                            <small className="text-danger mb-1">
                                                {errors.password}
                                            </small>
                                        ) : (
                                            ""
                                        )}
                                        <Link to="/" className="forgotpsw">
                                            Forget Password
                                        </Link>
                                    </Form.Group>
                                    <Form.Group>
                                        {/* <img
                                            src={Recaptcha}
                                            className="img-fluid mb-4"
                                        /> */}
                                        <ReCAPTCHA
                                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                            onChange={onChange}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button
                                            as="input"
                                            type="submit"
                                            value="LOGIN"
                                            className="btn btn-primary"
                                            onClick={HandleLogin}
                                        />
                                    </Form.Group>
                                   {/* <div className="donthaveaccount text-center">
                                        <p>
                                            Vous n'avez pas encore de compte ?
                                            <Link to="/register">
                                                {" "}
                                                Créer un compte
                                            </Link>
                                        </p>
                                    </div>*/}
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
