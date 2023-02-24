import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import { useNavigate } from "react-router-dom";

export default function AllWorkers() {
    const [workers, setWorkers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const navigate = useNavigate();

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
                setLoading("No Workers found");
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
                    setLoading("No Workers found");
                }
            });
    };

   

    const filterWorker = (e) =>{
        axios
        .get(`/api/admin/workers?q=${e.target.value}`,{ headers })
        .then((response)=>{
            if (response.data.workers.data.length > 0) {
                setWorkers(response.data.workers.data);
                setPageCount(response.data.workers.last_page);
            } else {
                setWorkers([]);
                setPageCount(response.data.workers.last_page);
                setLoading("No Workers found");
            }
        });
    }

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

    const handleNavigate = (e,id) =>{
        e.preventDefault();
        navigate(`/admin/view-worker/${id}`);
    }

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
                            <div className="search-data">
                                <input type='text' className="form-control" onChange={filterWorker} placeholder="Search" />
                                <Link to="/admin/add-worker" className="btn btn-pink addButton"><i className="btn-icon fas fa-plus-circle"></i>Add New</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    {/* <WorkerFilter getWorkerFilter={getWorkerFilter}/> */}
                        <div className="boxPanel">
                            <div className="Table-responsive">
                                {workers.length > 0 ? (
                                    <Table className='table table-bordered'>
                                        <Thead>
                                            <Tr style={{"cursor":"pointer"}}>
                                                <Th>ID</Th>
                                                <Th>Worker Name</Th>
                                                <Th>Email</Th>
                                                <Th>Address</Th>
                                                <Th>Phone</Th>
                                                <Th>Status</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {workers &&
                                                workers.map((item, index) => {
                                                    
                                                    return(
                                                    <Tr style={{cursor:"pointer"}}>
                                                        <Td onClick={(e)=>handleNavigate(e,item.id)}>{item.id}</Td>
                                                        <Td>
                                                            <Link to={`/admin/view-worker/${item.id}`}>{item.firstname}{" "}{item.lastname}</Link> 
                                                        </Td>
                                                        <Td onClick={(e)=>handleNavigate(e,item.id)}>{item.email}</Td>
                                                        <Td><a target="_blank" href={`https://maps.google.com?q=${item.address}`}>{ item.address }</a></Td>
                                                        <Td onClick={(e)=>handleNavigate(e,item.id)}>{item.phone}</Td>
                                                        <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                        {item.status == 0
                                                                ? "Inactive"
                                                                : "Active"}
                                                        </Td>
                                                        <Td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <Link to={`/admin/edit-worker/${item.id}`} className="dropdown-item">Edit</Link>
                                                                    <Link to={`/admin/view-worker/${item.id}`} className="dropdown-item">View</Link>
                                                                    <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                                                    >Delete</button>
                                                                </div>
                                                            </div>
                                                        </Td>
                                                    </Tr>
                                                )})}
                                        </Tbody>
                                    </Table>
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
