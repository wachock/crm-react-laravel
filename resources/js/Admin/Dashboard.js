import React, { useEffect, useState } from "react";
import Sidebar from "./Layouts/Sidebar";
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
                    <div className="card">
                        <div className="card-header">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <a href="#" className="btn btn-dark">All Dates</a>
                                        <button type="button" className="btn btn-dark dropdown-toggle filter-date-after dropdown-icon" data-toggle="dropdown" aria-expanded="false">
                                            <span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div className="dropdown-menu" role="menu">
                                            <a className="dropdown-item" href="#">Custom</a>
                                            <a className="dropdown-item" href="#">Today</a>
                                            <a className="dropdown-item" href="#">Yesterday</a>
                                            <a className="dropdown-item" href="#">This
                                                Week</a>
                                            <a className="dropdown-item" href="#">This
                                                Month</a>
                                            <a className="dropdown-item" href="#">This
                                                Year</a>
                                        </div>
                                    </div>
                                    {/* <input type="date" className="form-control" name="date" id="filter_date" /> */}
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-blue">
                                        <div className="inner">
                                            <a href="/admin/jobs-posted" className="text-center">
                                                <h3>{totalJobs}</h3>
                                                <p>Jobs posted</p>
                                            </a>
                                        </div> 
                                        <a href="/admin/jobs-posted" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-parrot">
                                        <div className="inner">
                                            <a href="/admin/clients" className="text-center">
                                                <h3>{totalApplicants}</h3>
                                                <p>Clients</p>
                                            </a>
                                        </div> 
                                        <a href="/admin/clients" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-yellow">
                                        <div className="inner">
                                            <a href="/admin/workers" className="text-center">
                                                <h3>{totalEmployers}</h3>
                                                <p>Workers</p>
                                            </a>
                                        </div> 
                                        <a href="/admin/workers" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-red">
                                        <div className="inner">
                                            <a href="#" className="text-center">
                                                <h3>50</h3>
                                                <p>Meetings</p>
                                            </a>
                                        </div> 
                                        <a href="#" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-purple">
                                        <div className="inner">
                                            <a href="/admin/offered-price" className="text-center">
                                                <h3>100</h3>
                                                <p>Offered Prices</p>
                                            </a>
                                        </div> 
                                        <a href="/admin/offered-price" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                                <div className="col-lg-2 col-6">
                                    <div className="small-box bg-green">
                                        <div className="inner">
                                            <a href="/admin/contracts" className="text-center">
                                                <h3>100</h3>
                                                <p>Contracts</p>
                                            </a>
                                        </div> 
                                        <a href="/admin/contracts" className="small-box-footer">View All</a>     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="latest-users">
                                <h2 className="page-title">Recent Completed Jobs</h2>
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
                                                                                className="btn bg-purple"
                                                                            >
                                                                                <i className="fa fa-edit"></i>
                                                                            </Link>
                                                                            <button
                                                                                className="ml-2 btn bg-yellow"
                                                                            >
                                                                                <i className="fa fa-eye"></i>
                                                                            </button>
                                                                            <button
                                                                                className="ml-2 btn bg-red"
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
            </div>
        </div>
    );
}
