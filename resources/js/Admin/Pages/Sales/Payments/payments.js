import React, { useState, useEffect } from "react";
import Sidebar from "../../../Layouts/Sidebar";
import ReactPaginate from "react-paginate";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Base64 } from "js-base64";

export default function Payments() {

    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);
    const [pay, setPay]   = useState([]);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getOrders = () => {
        axios
            .get('/api/admin/payments', { headers })
            .then((res) => {
                if (res.data.pay.data.length > 0) {
                    setPay(res.data.pay.data);
                    setPageCount(res.data.pay.last_page);
                } else {
                    setPay([]);
                    setLoading('No Payments Found');
                }
            })
    }

    const copy = [...pay];
    const [order,setOrder] = useState('ASC');
    const sortTable = (e,col) =>{
        
        let n = e.target.nodeName;
        if(n != "SELECT"){
        if (n == "TH") {
            let q = e.target.querySelector('span');
            if (q.innerHTML === "↑") {
                q.innerHTML = "↓";
            } else {
                q.innerHTML = "↑";
            }

        } else {
            let q = e.target;
            if (q.innerHTML === "↑") {
                q.innerHTML = "↓";
            } else {
                q.innerHTML = "↑";
            }
        }
    }
 
        if(order == 'ASC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setPay(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setPay(sortData);
            setOrder('ASC');
        }
        
    }


    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/payments?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.pay.data.length > 0) {
                    setPay(response.data.pay.data);
                    setPageCount(response.data.pay.last_page);
                } else {
                    setLoading("No Payment Found");
                }
            });
    };

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Manage Payments</h1>
                        </div>
                        {/*<div className="col-sm-6">
                            <Link
                                to="/admin/add-invoice"
                                className="ml-2 btn btn-pink addButton">
                                <i className="btn-icon fas fa-plus-circle"></i>
                                Create Invoice
                            </Link>
                        </div>*/}
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                            { pay.length > 0 ?(
                                <Table className="table table-bordered">
                                    <Thead>
                                        <Tr>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'id')}}  > #payment           <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" >#Invoice </Th>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'created_at')}} >Payment Method   <span className="arr"> &darr;</span></Th>
                                            <Th scope="col"  >Transaction ID   </Th>
                                            <Th scope="col"  >Customer   </Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}  onClick={(e)=>{sortTable(e,'status')}}>Total Amount <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}  onClick={(e)=>{sortTable(e,'status')}}>Paid Amount <span className="arr"> &darr;</span></Th>
                                            <Th scope="col">Date</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {pay &&
                                            pay.map((item, index) => {
                                               
                                                return (
                                                    <Tr>
                                                        <Td>#{item.id}</Td>
                                                        <Td><a href={item.doc_url} target="_blank">{item.invoice_id}</a></Td>
                                                        <Td>{ item.callback != null ? 'Credit Card' : item.pay_method }</Td>
                                                        <Td>
                                                            {item.txn_id ? item.txn_id : 'NA'}
                                                        </Td>
                                                        <Td><Link to={`/admin/view-client/${item.client.id}`}>{item.client.firstname + " " + item.client.lastname}</Link></Td>
                                                        <Td>{item.amount} ILS</Td>
                                                        <Td>{item.paid_amount} ILS</Td>
                                                        <Td>{ Moment(item.created_at).format('DD, MMM Y')}</Td>
                                                    </Tr>
                                                )
                                            })}
                                    </Tbody>
                                </Table>)
                                :(
                                    <div className="form-control text-center"> No Payment Found</div>
                                )}

                               {pay.length > 0 ? (
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
        </div>

    )
}