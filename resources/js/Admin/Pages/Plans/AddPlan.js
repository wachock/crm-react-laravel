import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Layouts/Sidebar";

export default function AddPlan() {
    const [plan, setPlan] = useState("");
    const [description, setDescription] = useState("");
    const [profile, setProfile] = useState("");
    const [contact, setContact] = useState(0);
    const [chat, setChat] = useState(0);
    const [price, setPrice] = useState("");
    const [billingCycle, setBillingCycle] = useState("");
    const [currency, setCurrency] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const alert = useAlert();
    const navigate = useNavigate();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: plan,
            description: description,
            price: price,
            cycle: billingCycle,
            currency: currency,
            profile_visit: profile,
            access_contacts: contact,
            allow_chat: chat,
            status: status,
        };
        axios.post(`/api/admin/plans`, data, { headers }).then((response) => {
            if (response.data.errors) {
                setErrors(response.data.errors);
            } else {
                alert.success("Plan has been created successfully");
                setTimeout(() => {
                    navigate("/admin/plans");
                }, 1000);
            }
        });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-skill">
                    <h1 className="page-title addSkill">Add Plan</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Plan name</label>
                            <input
                                type="text"
                                value={plan}
                                onChange={(e) => setPlan(e.target.value)}
                                className="form-control"
                                placeholder="Plan name"
                            />
                            {errors.name ? (
                                <small className="text-danger mb-1">
                                    {errors.name}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Plan description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-control"
                                placeholder="Plan description"
                            />
                            {errors.description ? (
                                <small className="text-danger mb-1">
                                    {errors.description}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="form-control"
                                placeholder="Price"
                            />
                            {errors.price ? (
                                <small className="text-danger mb-1">
                                    {errors.price}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Billing Cycle
                            </label>
                            <select
                                className="form-control"
                                value={billingCycle}
                                onChange={(e) =>
                                    setBillingCycle(e.target.value)
                                }
                            >
                                <option>Please Select</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Half-yearly">Half Yearly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                            {errors.cycle ? (
                                <small className="text-danger mb-1">
                                    {errors.cycle}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Currency</label>
                            <select
                                className="form-control"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option>Please Select</option>
                                <option value="usd">US Dollar (USD)</option>
                                <option value="eur">Euro (EUR)</option>
                                <option value="gbp">Pound (GBP)</option>
                                <option value="inr">Indian Rupee (INR)</option>
                            </select>
                            {errors.currency ? (
                                <small className="text-danger mb-1">
                                    {errors.currency}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <h4 className="myFeatures">Features</h4>
                        <div className="form-group">
                            <label className="control-label">
                                Profile visit
                            </label>
                            <input
                                type="number"
                                value={profile}
                                onChange={(e) => setProfile(e.target.value)}
                                className="form-control"
                                placeholder="Profile visit"
                            />
                            {errors.profile_visit ? (
                                <small className="text-danger mb-1">
                                    {errors.profile_visit}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                style={{ display: "block" }}
                            >
                                Access contact details
                            </label>
                            <label className="radio-inline ml-2">
                                <input
                                    type="radio"
                                    style={{ height: "unset" }}
                                    value="0"
                                    name="contactAccess"
                                    onChange={(e) => setContact(e.target.value)}
                                    checked={contact == 0}
                                />{" "}
                                No
                            </label>
                            <label className="radio-inline ml-2">
                                <input
                                    type="radio"
                                    style={{ height: "unset" }}
                                    value="1"
                                    name="contactAccess"
                                    onChange={(e) => setContact(e.target.value)}
                                    checked={contact == 1}
                                />{" "}
                                Yes
                            </label>
                            {errors.access_contacts ? (
                                <small className="text-danger mb-1">
                                    {errors.access_contacts}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                style={{ display: "block" }}
                            >
                                Chat with applicant
                            </label>
                            <label className="radio-inline ml-2">
                                <input
                                    type="radio"
                                    style={{ height: "unset" }}
                                    value="0"
                                    name="chatAccess"
                                    onChange={(e) => setChat(e.target.value)}
                                    checked={chat == 0}
                                />{" "}
                                No
                            </label>
                            <label className="radio-inline ml-2">
                                <input
                                    type="radio"
                                    style={{ height: "unset" }}
                                    value="1"
                                    name="chatAccess"
                                    onChange={(e) => setChat(e.target.value)}
                                    checked={chat == 1}
                                />{" "}
                                Yes
                            </label>
                            {errors.allow_chat ? (
                                <small className="text-danger mb-1">
                                    {errors.allow_chat}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Please Select</option>
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                            </select>
                            {errors.status ? (
                                <small className="text-danger mb-1">
                                    {errors.status}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group text-center">
                            <input
                                type="submit"
                                value="SAVE"
                                onClick={handleSubmit}
                                className="btn btn-danger saveBtn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
