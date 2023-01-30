import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import JobFilter from "../../Components/Filter/JobFilter";

export default function TotalJobs() {
    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");

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
    useEffect(() => {
        getJobs();
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

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <h1 className="page-title jobTitle">Jobs</h1>
                <JobFilter getTotalJobs={getTotalJobs} />
                <div className="boxPanel">
                    <div className="table-responsive">
                        {totalJobs.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Job ID</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Applicant</th>
                                        <th scope="col">Employer</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalJobs &&
                                        totalJobs.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    {item.applicant
                                                        ? item.applicant
                                                              .firstname +
                                                          " " +
                                                          item.applicant
                                                              .lastname
                                                        : "N/A"}
                                                </td>
                                                <td>
                                                    {item.employer.firstname}{" "}
                                                    {item.employer.lastname}
                                                </td>
                                                <td>{item.address}</td>
                                                <td
                                                    style={{
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {item.status}
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link
                                                            to={`/admin/view-job/${item.id}`}
                                                            className="btn btn-success"
                                                        >
                                                            <i className="fa fa-eye"></i>
                                                        </Link>
                                                        <div className="text-center">
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
    );
}
