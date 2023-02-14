import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function Clients() {
    
    const [clients, setClients] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getclients = () => {
        axios.get("/api/admin/clients", { headers }).then((response) => {
            
            if (response.data.clients.data.length > 0) {
                setClients(response.data.clients.data);
                setPageCount(response.data.clients.last_page);
            } else {
                setLoading("No client found");
            }
        });
    };
    useEffect(() => {
        getclients();
    }, []);

   
    const filterClients = (e) =>{
        axios
        .get(`/api/admin/clients?q=${e.target.value}`,{ headers })
        .then((response)=>{
            if (response.data.clients.data.length > 0) {
                setClients(response.data.clients.data);
                setPageCount(response.data.clients.last_page);
            } else {
                setClients([]);
                setPageCount(response.data.clients.last_page);
                setLoading("No client found");
            }
        })
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/clients?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.clients.data.length > 0) {
                    setClients(response.data.clients.data);
                    setPageCount(response.data.clients.last_page);
                } else {
                    setLoading("No client found");
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
            confirmButtonText: "Yes, Delete Client!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/clients/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Client has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getclients();
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
                            <h1 className="page-title">Clients</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="form-control" onChange={filterClients} placeholder="Search" />
                                <Link to="/admin/add-client" className="btn btn-pink addButton"><i className="btn-icon fas fa-plus-circle"></i>Add New</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {clients.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Client Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clients &&
                                                clients.map((item, index) => {
                                                    
                                                    let address = (item.geo_address) ? item.geo_address : "NA";
                                                    let cords   = (item.latitude && item.longitude) ? item.latitude +","+ item.longitude :"";

                                                    return(
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <Link to={`/admin/view-client/${item.id}`}>{item.firstname}{" "}{item.lastname}</Link>  
                                                        </td>
                                                        <td>{item.email}</td>
                                                        <td><a href={`https://maps.google.com?q=${cords}`} target='_blank'>{address}</a></td>
                                                        <td>{item.phone}</td>
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
                                                                    <Link to={`/admin/edit-client/${item.id}`} className="dropdown-item">Edit</Link>
                                                                    <Link to={`/admin/view-client/${item.id}`} className="dropdown-item">View</Link>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                                    >Delete</button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>)
                                                })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                                {clients.length > 0 ? (
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
