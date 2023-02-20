import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";

export default function Services() {

    const [services, setServices] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getservices = () => {
        axios.get("/api/admin/services", { headers }).then((response) => {

            if (response.data.services.data.length > 0) {
                setServices(response.data.services.data);
                setPageCount(response.data.services.last_page);
            } else {
                setLoading("No service found");
            }
        });
    };
    useEffect(() => {
        getservices();
    }, []);

    

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/services?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.services.data.length > 0) {
                    setservices(response.data.services.data);
                    setPageCount(response.data.services.last_page);
                } else {
                    setLoading("No service found");
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
            confirmButtonText: "Yes, Delete Service!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/services/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Service has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getservices();
                        }, 1000);
                    });
            }
        });
    };
    const copy = [...services];
    const [order,setOrder] = useState('ASC');
    const sortTable = (col) =>{
        
        if(order == 'ASC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setServices(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setServices(sortData);
            setOrder('ASC');
        }
        
    }

    return (
        <div id="container">
            <Sidebar />
                <div id="content">
                    <div className="titleBox customer-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h1 className="page-title">Services</h1>
                            </div>
                            <div className="col-sm-6">
                                <Link
                                    to="/admin/add-service"
                                    className="ml-2 btn btn-success addButton">
                                    Add Service
                                </Link>
                                <Link
                                    to="/admin/service-schedule"
                                    className="ml-2 btn btn-warning addButton">
                                    Schedules
                                </Link>
                                <Link
                                    to="/admin/templates"
                                    className="btn btn-pink addButton">
                                    Templates
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">

                            <div className="boxPanel">
                                <div className="table-responsive">
                                    {services.length > 0 ? (
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col" onClick={(e)=>sortTable('id')}>ID</th>
                                                    <th scope="col" onClick={(e)=>sortTable('name')}>Service</th>
                                                    <th scope="col" onClick={(e)=>sortTable('status')}>Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {services &&
                                                    services.map((item, index) => (
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
                                                                        <Link to={`/admin/edit-service/${item.id}`} className="dropdown-item">Edit</Link>
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
                                    {services.length > 0 ? (
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