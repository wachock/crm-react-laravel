import React, { useEffect, useState } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

export default function EditSubscription() {
    const [plan, setPlan] = useState("");
    const [plans, setPlans] = useState([]);
    const [employer, setEmployer] = useState("");
    const [employers, setEmployers] = useState([]);
    const [validfrom, setValidFrom] = useState("");
    const [validupto, setValidUpto] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id: employer,
            plan_id: plan,
            valid_from: validfrom,
            valid_upto: validupto,
            status: status,
        };
        axios.put(`/api/admin/subscriptions/${params.id}`, data, { headers }).then((response) => {
            if (response.data.errors) {
                setErrors(response.data.errors);
            } else {
                alert.success("Subscription has been updated successfully");
                setTimeout(() => {
                    navigate("/admin/subscription");
                }, 1000);
            }
        });
    };

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getUpdateFormData = () => {
        axios
            .get("/api/admin/subscriptions/create", { headers })
            .then((response) => {
                console.log(response)
                if (response.data.plans.length > 0) {
                    setPlans(response.data.plans);
                } else {
                    setPlans([]);
                }

                if (response.data.employers.length > 0) {
                    setEmployers(response.data.employers);
                } else {
                    setEmployers([]);
                }
            });

            axios
        .get(`/api/admin/subscriptions/${params.id}/edit`, { headers })
        .then((response) => {
            setPlan(response.data.subscription.plan_id);
            setEmployer(response.data.subscription.user_id);
            setValidFrom(response.data.subscription.valid_from);
            setValidUpto(response.data.subscription.valid_upto);
            setStatus(response.data.subscription.status);
        });
    };
    useEffect(() => {
        getUpdateFormData();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="add-subscription">
                    <h1 className="page-title add-subsc">Edit Subscription</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">
                                Employer name
                            </label>
                            <SelectPicker
                                data={
                                    employers &&
                                    employers.map((item) => ({
                                        label:
                                            item.firstname +
                                            " " +
                                            item.lastname,
                                        value: item.id,
                                    }))
                                }
                                onChange={(e) => setEmployer(e)}
                                value={employer ? employer : ""}
                                size="lg"
                            />
                            {errors.user_id ? (
                                <small className="text-danger mb-1">
                                    Please select user.
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Plan Name</label>
                            <select
                                className="form-control"
                                value={plan}
                                onChange={(e) => setPlan(e.target.value)}
                            >
                                <option>Please Select</option>
                                {plans &&
                                    plans.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.plan_id ? (
                                <small className="text-danger mb-1">
                                    Please select plan.
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Valid From</label>
                            <input
                                type="date"
                                value={validfrom}
                                onChange={(e) => setValidFrom(e.target.value)}
                                required
                                className="form-control"
                                name="validfrom"
                                placeholder="Valid From"
                            />
                            {errors.valid_from ? (
                                <small className="text-danger mb-1">
                                    {errors.valid_from}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Valid Upto</label>
                            <input
                                type="date"
                                value={validupto}
                                onChange={(e) => setValidUpto(e.target.value)}
                                required
                                className="form-control"
                                name="validupto"
                                placeholder="Valid From"
                            />
                            {errors.valid_upto ? (
                                <small className="text-danger mb-1">
                                    {errors.valid_upto}
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
