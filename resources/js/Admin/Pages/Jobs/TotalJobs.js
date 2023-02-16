import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import JobFilter from "../../Components/Filter/JobFilter";
import { useAlert } from "react-alert";
import Select from 'react-select';

export default function TotalJobs() {
    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [AllClients, setAllClients] = useState([]);
    const [AllServices, setAllServices] = useState([]);
    const [AllWorkers, setAllWorkers] = useState([]);
    const alert = useAlert();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getJobs = () => {
        axios.get("/api/admin/jobs", { headers }).then((response) => {
            if (response.data.jobs.data.length > 0) {
                setTotalJobs(response.data.jobs.data);
                setPageCount(response.data.jobs.last_page);
            } else {
                setLoading("No Job found");
            }
        });
    };
    const getClients = () => {
        axios
            .get('/api/admin/all-clients', { headers })
            .then((res) => {
                setAllClients(res.data.clients);
            })

    }

    const getServices = () => {
        axios
            .get('/api/admin/all-services', { headers })
            .then((res) => {
                setAllServices(res.data.services);
            })
    }

    const getWorkers = () => {
        axios
            .get('/api/admin/all-workers', { headers })
            .then((res) => {
                setAllWorkers(res.data.workers);
            })
    }

    useEffect(() => {
        getJobs();
        getClients();
        getServices();
        getWorkers();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/jobs?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.jobs.data.length > 0) {
                    setTotalJobs(response.data.jobs.data);
                    setPageCount(response.data.jobs.last_page);
                } else {
                    setLoading("No Job found");
                }
            });
    };

    const getTotalJobs = (response) => {
        if (response.data.jobs.data.length > 0) {
            setTotalJobs(response.data.jobs.data);
            setPageCount(response.data.jobs.last_page);
        } else {
            setTotalJobs([]);
            setPageCount(response.data.jobs.last_page);
            setLoading("No Job found");
        }
    };

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
                            getJobs();
                        }, 1000);
                    });
            }
        });
    };

console.log(totalJobs);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Jobs</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="form-control" placeholder="Search" />
                                <Link to="/admin/add-job" className="btn btn-pink addButton"><i className="btn-icon fas fa-plus-circle"></i>
                                    Add New
                                </Link>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        {/* <JobFilter 
                        AllServices={AllServices} 
                        AllClients={AllClients}
                        AllWorkers={AllWorkers}
                        getTotalJobs={getTotalJobs}
                          /> */}
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {totalJobs.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Job Dated</th>
                                                <th scope="col">Worker Name</th>
                                                <th scope="col">Client Name</th>
                                                <th scope="col">Service Name</th>
                                                <th scope="col">Shift</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Complete Time</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalJobs &&
                                                totalJobs.map((item, index) => (
                                                    <tr key={index}>
                                                         <td>
                                                             {item.start_date}                                                                {item.start_date}
                                                        </td>
                                                        <td>
                                                            <h6>{
                                                                item.worker
                                                                    ? item.worker.firstname +
                                                                    " " + item.worker.lastname
                                                                    : "NA"
                                                                }
                                                            </h6>

                                                        </td>
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
                                                        
                                                         {item.start_time} to {item.end_time}
                                                        </td>
                                                        <td>{
                                                            item.client
                                                                ? item.client.geo_address
                                                                : "NA"
                                                        }
                                                        </td>
                                                        <td>
                                                            {parseFloat(`${item.end_time}.replace(":", ".")`)-parseFloat(`${item.start_time}.replace(":", ".")`)} Hours
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
                                                            {item.rate} NIS
                                                        </td>
                                                        <td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    
                                                                    <Link to={`/admin/view-job/${item.id}`} className="dropdown-item">View</Link>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(item.id)}>Delete</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                                {totalJobs.length > 0 ? (
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={
                                            "pagination justify-content-end mt-3"
                                        }
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
