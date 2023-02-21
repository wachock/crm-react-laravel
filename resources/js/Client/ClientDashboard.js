import React, { useEffect, useState } from "react";
import ClientSidebar from "./Layouts/ClientSidebar";
import axios from "axios";
import {  Link } from "react-router-dom";

export default function ClientDashboard() {

    const [totalJobs, setTotalJobs] = useState([0]);
    const [totalOffers, setTotalOffers] = useState([0]);
    const [totalSchedules, setTotalSchedules] = useState([0]);
    const [latestJobs, setlatestJobs] = useState([]);
    const [contracts, setContract] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const id = localStorage.getItem('client-id');
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const GetDashboardData = () => {
        axios.post("/api/client/dashboard",{id:id}, { headers }).then((response) => {
            setTotalJobs(response.data.total_jobs);
            setTotalOffers(response.data.total_offers);
            setTotalSchedules(response.data.total_schedules);
            setContract(response.data.total_contracts);
            if (response.data.latest_jobs.length > 0) {
                setlatestJobs(response.data.latest_jobs);
            } else {
                setLoading("No job found");
            }
        });
    };
    
    useEffect(() => {
        GetDashboardData();
    }, []);
    

    return (
        <div id="container">
            <ClientSidebar />
            <div id="content">
                <div className="adminDash">
                    <div className="titleBox">
                        <h1 className="page-title">Dashboard</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-xs-6">
                            <a href="/client/jobs">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i class="fa-solid fa-suitcase"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalJobs}</h3>
                                        <p>Jobs</p>
                                    </div>   
                                </div>
                            </a>
                        </div>

                        <div className="col-sm-3 col-xs-6">
                            <a href="#">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-handshake"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{ totalSchedules }</h3>
                                        <p>Meetings</p>    
                                    </div>   
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <a href="/client/offered-price">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-dollar-sign"></i>
                                    </div>
                                    <div className="dashText"> 
                                        <h3>{ totalOffers }</h3>
                                        <p>Offered Prices</p>  
                                    </div>   
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                            <a href="/client/contracts">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-file-contract"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{ contracts }</h3>
                                        <p>Contracts</p>   
                                    </div>   
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="latest-users">
                        <h2 className="page-title">Recent Jobs</h2>
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {latestJobs.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Client Name</th>
                                                <th>Service Name</th>
                                                <th>Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Assigned Worker</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestJobs &&
                                                latestJobs.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                                <td>{
                                                            item.client
                                                                ? item.client.firstname +
                                                                " " + item.client.lastname
                                                                : "NA"
                                                        }
                                                        </td>
                                                        <td>{
                                                            item.service
                                                                ? item.service.name
                                                                : "NA"
                                                        }</td>
                                                        <td>
                                                            {item.start_date}
                                                        </td>
                                                        <td>
                                                            {item.start_time}
                                                        </td>
                                                        <td>
                                                            {item.end_time}
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
                                                            {item.rate}
                                                        </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    
                                                                    <Link
                                                                        to={`/client/view-job/${item.id}`}
                                                                        className="ml-2 btn bg-yellow"
                                                                    >
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>

                                                                   
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
