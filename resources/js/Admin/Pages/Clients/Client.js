import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { useNavigate } from "react-router-dom";

export default function Clients() {

    const [clients, setClients] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const navigate = useNavigate();
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


    const filterClients = (e) => {
        axios
            .get(`/api/admin/clients?q=${e.target.value}`, { headers })
            .then((response) => {
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
    const handleNavigate = (e, id) => {
        e.preventDefault();
        navigate(`/admin/view-client/${id}`);
    }


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
                            {clients.length > 0 ? (
                                <Table className='table table-bordered'>
                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>Client Name</Th>
                                            <Th>Email</Th>
                                            <Th>Address</Th>
                                            <Th>Phone</Th>
                                            <Th>Status</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {clients &&
                                            clients.map((item, index) => {

                                                let address = (item.geo_address) ? item.geo_address : "NA";
                                                let cords = (item.latitude && item.longitude) ? item.latitude + "," + item.longitude : "";
                                                let status = '';
                                                if (item.status == 0)
                                                    status = "Lead";
                                                if (item.status == 1)
                                                    status = "Potential Customer";
                                                if (item.status == 2)
                                                    status = "Customer";
                                               
                                               
                                                return (
                                                    <Tr style={{ "cursor": "pointer" }}>
                                                        <Td onClick={(e) => handleNavigate(e, item.id)}>{item.id}</Td>
                                                        <Td>
                                                            <Link to={`/admin/view-client/${item.id}`}>{item.firstname}{" "}{item.lastname}</Link>
                                                        </Td>
                                                        <Td onClick={(e) => handleNavigate(e, item.id)}>{item.email}</Td>
                                                        <Td><a href={`https://maps.google.com?q=${cords}`} target='_blank'>{address}</a></Td>
                                                        <Td onClick={(e) => handleNavigate(e, item.id)}>{(item.phone) ? item.phone.toString().split(",").join(' | ') : ''}</Td>
                                                        <Td onClick={(e) => handleNavigate(e, item.id)}>
                                                            {
                                                                status
                                                            }
                                                        </Td>
                                                        <Td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    {
                                                                        item.latest_contract != 0 
                                                                        ? <Link to={`/admin/create-job/${item.latest_contract}`} className="dropdown-item">Create Job</Link>
                                                                        :''
                                                                    }
                                                                    
                                                                    <Link to={`/admin/edit-client/${item.id}`} className="dropdown-item">Edit</Link>
                                                                    <Link to={`/admin/view-client/${item.id}`} className="dropdown-item">View</Link>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                                    >Delete</button>
                                                                </div>
                                                            </div>
                                                        </Td>
                                                    </Tr>)
                                            })}
                                    </Tbody>
                                </Table>
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
    );
}
