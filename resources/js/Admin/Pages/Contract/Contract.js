import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { useNavigate } from 'react-router-dom';

export default function Contract() {

    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();
    
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Contract!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/contract/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Contract has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    });
            }
        });
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/contract?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.contracts.data.length > 0) {
                    setContracts(response.data.contracts.data);
                    setPageCount(response.data.contracts.last_page);
                } else {
                    setLoading("No contract found");
                }
            });
    };

    const filterContracts = (e) => {
        axios
            .get(`/api/admin/contract?q=${e.target.value}`, { headers })
            .then((response) => {
                if (response.data.contracts.data.length > 0) {
                    setContracts(response.data.contracts.data);
                    setPageCount(response.data.contracts.last_page);
                } else {
                    setContracts([]);
                    setPageCount(response.data.contracts.last_page);
                    setLoading("No contract found");
                }
            });
    }


    const getContract = () => {
        axios
            .get(`/api/admin/contract`, { headers })
            .then((res) => {
                if (res.data.contracts.data.length > 0) {
                    setContracts(res.data.contracts.data);
                } else {
                    setLoading("No contract found");
                }

            })
    }
    useEffect(() => {
        getContract();
    }, []);

    const handleNavigate = (e, id) => {
        e.preventDefault();
        navigate(`/admin/view-contract/${id}`);
    }

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Contracts</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="mr-0 form-control" onChange={filterContracts} placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {contracts.length > 0 ? (
                                    <Table className="table table-bordered">
                                        <Thead>
                                            <Tr>
                                                <Th scope="col">Client</Th>
                                                <Th scope="col">Email</Th>
                                                <Th scope="col" style={{ width: "16%" }}>Address</Th>
                                                <Th scope="col">Phone</Th>
                                                <Th scope="col">Service Name</Th>
                                                <Th scope="col">Status</Th>
                                                <Th scope="col">Total</Th>
                                                <Th scope="col">Job Status</Th>
                                                <Th scope="col">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {contracts && contracts.map((c, i) => {

                                            if(c.client){
                                                let address = c.client ? c.client.city + ", " : '';
                                                address += c.client ? c.client.street_n_no + ", " : '';
                                                address += c.client ? c.client.zipcode + " " : '';

                                                let services = JSON.parse(c.offer.services);

                                                return (

                                                    <Tr>
                                                        <Td><Link to={`/admin/view-client/${c.client.id}`}>
                                                            {
                                                                c.client
                                                                    ? c.client.firstname + " " + c.client.lastname
                                                                    : ''
                                                            }
                                                        </Link></Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>{c.client.email}</Td>
                                                        <Td><Link to={`https://maps.google.com?q=${address}`}>

                                                            {address}

                                                        </Link></Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>{c.client.phone}</Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>
                                                            {services && services.map((s, j) => {

                                                                return (
                                                                    (services.length - 1 != j) ?
                                                                        s.name + " | "
                                                                        : s.name
                                                                )
                                                            })}
                                                        </Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>{c.status}</Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>{c.offer.total} ILS + VAT</Td>
                                                        <Td onClick={(e)=>handleNavigate(e,c.id)}>{(c.job_status) ? 'Active' : 'InActive'}</Td>
                                                        <Td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <Link to={`/admin/create-job/${c.id}`} className="dropdown-item">Create Job</Link>
                                                                    <Link to={`/admin/view-contract/${c.id}`} className="dropdown-item">View</Link>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(c.id)}
                                                                    >Delete</button>
                                                                </div>
                                                            </div>
                                                        </Td>
                                                    </Tr>

                                                )
                                            }
                                            })}

                                        </Tbody>
                                    </Table>
                                ) : (
                                    <div className='form-control text-center'>{loading}</div>
                                )
                                }
                            </div>
                            {contracts.length > 0 ? (
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
                            ) : ''}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

