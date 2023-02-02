import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import WorkerFilter from "../../Components/Filter/WorkerFilter";
import ReactPaginate from "react-paginate";

export default function AllWorkers() {
    const [workers, setWorkers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getWorkers = () => {
        axios.get("/api/admin/workers", { headers }).then((response) => {
            if (response.data.workers.data.length > 0) {
                setWorkers(response.data.workers.data);
                setPageCount(response.data.workers.last_page);
            } else {
                setLoading("No Employer found");
            }
        });
    };
    useEffect(() => {
        getWorkers();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/workers?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.workers.data.length > 0) {
                    setWorkers(response.data.workers.data);
                    setPageCount(response.data.workers.last_page);
                } else {
                    setLoading("No Employer found");
                }
            });
    };

    const getWorkerFilter = (response) => {
        if (response.data.workers.data.length > 0) {
            setWorkers(response.data.workers.data);
            setPageCount(response.data.workers.last_page);
        } else {
            setWorkers([]);
            setPageCount(response.data.workers.last_page);
            setLoading("No Employer found");
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
            confirmButtonText: "Yes, Delete Worker!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/workers/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Worker has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getWorkers();
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
                            <h1 className="page-title">Workers</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/admin/add-worker" className="btn btn-pink addButton"><i className="btn-icon fas fa-plus-circle"></i>
                                Add New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    <WorkerFilter getWorkerFilter={getWorkerFilter}/>
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {workers.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Worker Name</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {workers &&
                                                workers.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            {item.firstname}{" "}
                                                            {item.lastname}
                                                        </td>
                                                        <td>{item.phone}</td>
                                                        <td>
                                                        {item.status == 0
                                                                ? "Inactive"
                                                                : "Active"}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link
                                                                    to={`/admin/edit-worker/${item.id}`}
                                                                    className="btn bg-green"
                                                                >
                                                                    <i className="fa fa-edit"></i>
                                                                </Link>
                                                                
                                                                <Link
                                                                    to={`/admin/view-worker/${item.id}`}
                                                                    className="ml-2 btn btn-warning"
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
                                                ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                                {workers.length > 0 ? (
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
