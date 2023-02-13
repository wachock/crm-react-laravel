import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";

export default function ServiceSchedule() {

    const [schedules, setSchedules] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getSchedules = () => {
        axios.get("/api/admin/service-schedule", { headers }).then((response) => {
            console.log(response);
            if (response.data.schedules.data.length > 0) {
                setSchedules(response.data.schedules.data);
                setPageCount(response.data.schedules.last_page);
            } else {
                setLoading("No schedule found");
            }
        });
    };
    useEffect(() => {
        getSchedules();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/service-schedule?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.schedules.data.length > 0) {
                    setSchedules(response.data.schedules.data);
                    setPageCount(response.data.schedules.last_page);
                } else {
                    setLoading("No schedule found");
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Schedule!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/service-schedule/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Schedule has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getSchedules();
                        }, 1000);
                    });
            }
        });
    };

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Service Schedules</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link
                                to="/admin/add-service-schedule"
                                className="btn btn-success addButton"
                            >
                                Add Schedule
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="boxPanel">
                    <div className="table-responsive">
                        {schedules.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Schedule</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules &&
                                        schedules.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    {item.status == 0
                                                        ? "Inactive"
                                                        : "Active"}
                                                </td>
                                                <td>
                                                    <div className="action-dropdown dropdown">
                                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                            <i className="fa fa-ellipsis-vertical"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <Link to={`/admin/edit-service-schedule/${item.id}`} className="dropdown-item">Edit</Link>
                                                            <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                            >Delete</button>
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
                        {schedules.length > 0 ? (
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