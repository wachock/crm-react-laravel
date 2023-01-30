import React, { useEffect, useState } from "react";
import Sidebar from "./Layouts/Sidebar";
import suitcase from "../Assets/image/icons/suitcase.png";
import man from "../Assets/image/icons/man.png";
import employee from "../Assets/image/icons/employee.png";
import money from "../Assets/image/icons/earn-money.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [totalJobs, setTotalJobs] = useState([0]);
    const [totalApplicants, setTotalApplicants] = useState([0]);
    const [totalEmployers, setTotalEmployers] = useState([0]);
    const [totalEarnings, setTotalEarnings] = useState(["$0"]);
    const [latestEmployers, setlatestEmployers] = useState([]);
    const [loading, setLoading] = useState("Loading...");

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const GetDashboardData = () => {
        axios.get("/api/admin/dashboard", { headers }).then((response) => {
            setTotalJobs(response.data.total_jobs);
            setTotalApplicants(response.data.total_applicants);
            setTotalEmployers(response.data.total_employees);
            if (response.data.latest_employers.length > 0) {
                setlatestEmployers(response.data.latest_employers);
            } else {
                setLoading("No employer found");
            }
        });
    };

    useEffect(() => {
        GetDashboardData();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Employer!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/employers/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Employer has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            GetDashboardData();
                        }, 1000);
                    });
            }
        });
    };

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="adminDash">
                    <h1 className="page-title">Dashboard</h1>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="dashBox">
                                <img src={suitcase} className="img-fluid" />
                                <h4>{totalJobs}</h4>
                                <p>Jobs posted</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="dashBox">
                                <img src={man} className="img-fluid" />
                                <h4>{totalApplicants}</h4>
                                <p>Applicants</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="dashBox">
                                <img src={employee} className="img-fluid" />
                                <h4>{totalEmployers}</h4>
                                <p>Employers</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="dashBox">
                                <img src={money} className="img-fluid" />
                                <h4>{totalEarnings}</h4>
                                <p>Earning</p>
                            </div>
                        </div>
                    </div>
                    <div className="latest-users">
                        <h2 className="page-title">Latest employers</h2>
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {latestEmployers.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestEmployers &&
                                                latestEmployers.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>
                                                                {item.firstname}{" "}
                                                                {item.lastname}
                                                            </td>
                                                            <td>
                                                                {item.phone}
                                                            </td>
                                                            <td>
                                                                {item.email}
                                                            </td>
                                                            <td>
                                                                {item.status ===
                                                                0
                                                                    ? "Inactive"
                                                                    : "Active"}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <Link
                                                                        to={`/admin/edit-employer/${item.id}`}
                                                                        className="btn btn-success"
                                                                    >
                                                                        <i className="fa fa-pencil"></i>
                                                                    </Link>
                                                                    <button
                                                                        className="ml-2 btn btn-danger"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-5">
                                        {loading}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
