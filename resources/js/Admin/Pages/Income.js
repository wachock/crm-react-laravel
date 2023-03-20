import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import axios from "axios";

export default function income() {
    const [tasks,setTasks] = useState([]);
    const [loading,setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getTasks = () =>{
        axios
        .get('/api/admin/income',{headers})
        .then((res)=>{
          if(res.data.tasks.length > 0){
            setTasks(res.data.tasks);
          } else {
            setTasks([]);
            setLoading('No Completed Tasks found.');
          }
        });
    }
    useEffect(()=>{
        getTasks();
    },[])
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox card card-body p-3 m-3">
                    <div className="row">
                        <div className="col-sm-6">
                            <h4 className="page-title">Total Jobs : 0</h4>
                            <h4 className="page-title">Income : 0</h4>
                            <h4 className="page-title">Outcome : 0</h4>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data" style={{ cursor: "pointer" }}>
                                <span className="p-2">Day</span>
                                <span className="p-2">Week</span>
                                <span className="p-2">Month</span>
                                <span className="p-2">All</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            {tasks.length > 0 ? (
                                <Table className='table table-bordered'>
                                    <Thead>
                                        <Tr style={{ cursor: 'pointer' }}>
                                            <Th>ID</Th>
                                            <Th>Worker Name</Th>
                                            <Th>Client Name</Th>
                                            <Th>Time Takes</Th>
                                            <Th>Income</Th>
                                            <Th>Outcome</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {tasks &&
                                            tasks.map((item, index) => {

                                                return (
                                                    <Tr>
                                                        <Td >{item.id}</Td>
                                                        <Td>

                                                           {item.worker.firstname}{" "}{item.worker.lastname}
                                                        </Td>
                                                        <Td > {item.client.firstname}{" "}{item.client.lastname}</Td>
                                                        <Td>{0}</Td>
                                                        <Td >{ item.offer ? item.offer.subtotal+"ILS + VAT " : ''}</Td>
                                                        <Td >{0}</Td>
                                                       
                                                    </Tr>)
                                            })}
                                    </Tbody>
                                </Table>
                            ) : (
                                <p className="text-center mt-5">{loading}</p>
                            )}
                            {/*clients.length > 0 ? (
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
                            )*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}