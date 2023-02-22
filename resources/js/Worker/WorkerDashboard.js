import React, { useEffect, useState } from "react";
import WorkerSidebar from "./Layouts/WorkerSidebar";
import axios from "axios";
import {  Link } from "react-router-dom";

export default function WorkerDashboard() {

    const [totalJobs, setTotalJobs] = useState([0]);
    const [totalOffers, setTotalOffers] = useState([0]);
    const [totalSchedules, setTotalSchedules] = useState([0]);
    const [latestJobs, setlatestJobs] = useState([]);
    const [contracts, setContract] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const id = localStorage.getItem('worker-id');
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("worker-token"),
    };

    const GetDashboardData = () => {
        axios.post("/api/dashboard",{id:id}, { headers }).then((response) => {
            setTotalJobs(response.data.total_jobs);
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
            <WorkerSidebar />
            <div id="content">
                <div className="adminDash">
                    <div className="titleBox">
                        <h1 className="page-title">Dashboard</h1>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-xs-6">
                            <a href="/worker/jobs">
                                <div className="dashBox">
                                    <div className="dashIcon">
                                        <i className="fa-solid fa-suitcase"></i>
                                    </div>
                                    <div className="dashText">
                                        <h3>{totalJobs}</h3>
                                        <p>Jobs</p>
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
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestJobs &&
                                                latestJobs.map(
                                                    (item, index) => {
                                                       let services =  (item.offer.services) ? JSON.parse(item.offer.services) : [];
                                                   
                                                    return (

                                                        <tr key={index}>
                                                                <td>{
                                                            item.client
                                                                ? item.client.firstname +
                                                                " " + item.client.lastname
                                                                : "NA"
                                                        }
                                                        </td>
                                                        <td>{
                                                           services && services.map((s,i)=>{
                                                            return(
                                                                (services.length -1) != i?
                                                                  s.name+" | "
                                                                : s.name
                                                            )
                                                           })
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

                                                        <td
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {item.status}
                                                        </td>
                                                        <td>
                                                           {item.offer.subtotal} ILS
                                                        </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    
                                                                    <Link
                                                                        to={`/worker/view-job/${item.id}`}
                                                                        className="ml-2 btn bg-yellow"
                                                                    >
                                                                        <i className="fa fa-eye"></i>
                                                                    </Link>

                                                                   
                                                                </div>
                                                                    </td>
                                                        </tr>
                                                    )
                                                     }
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
