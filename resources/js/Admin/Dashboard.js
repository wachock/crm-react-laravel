import React, { useEffect, useState } from "react";
import Sidebar from "./Layouts/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const [totalJobs, setTotalJobs] = useState([0]);
    const [totalClients, setTotalClients] = useState([0]);
    const [totalWorkers, setTotalWorkers] = useState([0]);
    const [totalOffers, setTotalOffers] = useState([0]);
    const [totalSchedules, setTotalSchedules] = useState([0]);
    const [contracts, setContracts] = useState([0]);
    const [latestJobs, setlatestJobs] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const navigate = useNavigate();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const GetDashboardData = () => {
        axios.get("/api/admin/dashboard", { headers }).then((response) => {
            setTotalJobs(response.data.total_jobs);
            setTotalClients(response.data.total_clients);
            setTotalWorkers(response.data.total_workers);
            setTotalOffers(response.data.total_offers);
            setContracts(response.data.total_contracts);
            setTotalSchedules(response.data.total_schedules);
            if (response.data.latest_jobs.length > 0) {
                setlatestJobs(response.data.latest_jobs);
            } else {
                setLoading("No job found");
            }
        });
    };

    const rowHandle = (e,id) =>{
      e.preventDefault();
      navigate(`/admin/view-job/${id}`);
    }

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
            confirmButtonText: "Yes, Delete Job!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/jobs/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Job has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            GetDashboardData();
                        }, 1000);
                    });
            }
        });
    };

    const copy = [...latestJobs];
    const [order,setOrder] = useState('ASC');
    const sortTable = (col) =>{
        
        if(order == 'ASC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setlatestJobs(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setlatestJobs(sortData);
            setOrder('ASC');
        }
        
    }

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="adminDash">
                    <div className="titleBox">
                        <h1 className="page-title">Dashboard</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/jobs">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i class="fa-solid fa-suitcase"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalJobs}</h3>
                                        <p>Jobs posted</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/clients">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalClients}</h3>
                                        <p>Clients</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/workers">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalWorkers}</h3>
                                        <p>Workers</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/schedule">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-handshake"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalSchedules}</h3>
                                        <p>Meetings</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/offered-price">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-dollar-sign"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalOffers}</h3>
                                        <p>Offered Prices</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-4 col-xs-6">
                            <a href="/admin/contracts">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-file-contract"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{contracts}</h3>
                                        <p>Contracts</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="latest-users">
                        <h2 className="page-title">Recent Completed Jobs</h2>
                        <div className="boxPanel card">
                            <div className="table-responsive card-body">
                                {latestJobs.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Client Name</th>
                                                <th>Service Name</th>
                                                <th style={{cursor:'pointer'}} onClick={e=>sortTable('date')}> Date</th>
                                                <th style={{cursor:'pointer'}} onClick={e=>sortTable('shift')}> Shift</th>
                                                <th>Assigned Worker</th>
                                                <th style={{cursor:'pointer'}} onClick={e=>sortTable('sattus')}>Status</th>
                                                <th style={{cursor:'pointer'}} onClick={e=>sortTable('total')}>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestJobs &&
                                                latestJobs.map(
                                                    (item, index) => (
                                                        <tr key={index} style={{cursor:'pointer'}} onClick={e=>rowHandle(e,item.id)}>
                                                            <td>{
                                                                item.client
                                                                    ? item.client.firstname +
                                                                    " " + item.client.lastname
                                                                    : "NA"
                                                            }
                                                            </td>
                                                            <td>{
                                                                item.jobservice
                                                                    ? item.jobservice.name
                                                                    : "NA"
                                                            }</td>
                                                            <td>
                                                                {item.start_date}
                                                            </td>
                                                            <td>
                                                                {item.shifts}
                                                            </td>
                                                            <td>{
                                                                item.worker
                                                                    ? item.worker.firstname +
                                                                    " " + item.worker.lastname
                                                                    : "NA"
                                                            }</td>

                                                            <td
                                                                style={{
                                                                    textTransform:
                                                                        "capitalize",
                                                                }}
                                                            >
                                                                {item.status}
                                                            </td>
                                                            <td>
                                                                {item.jobservice.total} ILS
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <Link
                                                                        to={`/admin/edit-job/${item.id}`}
                                                                        className="btn bg-purple d-none"
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <Link
                                                                        to={`/admin/view-job/${item.id}`}
                                                                        className="ml-2 btn bg-yellow"
                                                                    >
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>


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
    );
}
