import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import { Base64 } from "js-base64";

export default function Invoices() {

    const [loading, setLoading] = useState("Loading...");
    const [invoices, setInvoices] = useState([]);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getInvoices = () => {
        axios
            .get('/api/admin/invoices', { headers })
            .then((res) => {
                if (res.data.invoices.data.length > 0) {
                    setInvoices(res.data.invoices.data);
                } else {
                    setInvoices([]);
                    setLoading('No Invoice found');
                }
            })
    }

    const copy = [...invoices];
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
            setInvoices(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setInvoices(sortData);
            setOrder('ASC');
        }
        
    }

    useEffect(() => {
        getInvoices();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Manage Invoices</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link
                                to="/admin/add-invoice"
                                className="ml-2 btn btn-pink addButton">
                                <i className="btn-icon fas fa-plus-circle"></i>
                                Create Invoice
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">

                                <Table className="table table-bordered">
                                    <Thead>
                                        <Tr>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'id')}}  >    #Invoice     <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'amount')}}  >Amount       <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'paid_amount')}} >Paid Amount       <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" >Pending Amount  </Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}   onClick={(e)=>{sortTable(e,'total_tax')}} >Total Tax         <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}   onClick={(e)=>{sortTable(e,'created_at')}}  >Created Date      <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}   onClick={(e)=>{sortTable(e,'due_date')}} >Due Date          <span className="arr"> &darr;</span></Th>
                                            <Th scope="col"  >Customer   </Th>
                                            {/*<Th scope="col" style={{ cursor: "pointer" }}  >Services          <span className="arr"> &darr;</span></Th>*/}
                                            <Th scope="col" style={{ cursor: "pointer" }}  onClick={(e)=>{sortTable(e,'status')}}  >Status            <span className="arr"> &darr;</span></Th>
                                            <Th scope="col">Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {invoices &&
                                            invoices.map((item, index) => {
                                                let services = (item.services != undefined && item.services != null) ? JSON.parse(item.services) : []

                                                return (
                                                    <Tr>
                                                        <Td>#{item.id}</Td>
                                                        <Td>{item.amount}</Td>
                                                        <Td>{ (item.paid_amount != null) ? item.paid_amount : 0}</Td>
                                                        <Td>{Math.abs(item.amount-item.paid_amount)}</Td>
                                                        <Td>{item.total_tax}</Td>
                                                        <Td>{Moment(item.created_at).format('DD, MMM Y')}</Td>
                                                        <Td>{(item.due_date != null) ? item.due_date : 'NA'}</Td>
                                                        <Td>{item.client.firstname + " " + item.client.lastname}</Td>

                                                       {/*<Td>
                                                            {
                                                                services && services.map((s, i) => {
                                                                    return (
                                                                        (services.length > 1) ? s.service + " | " : s.service
                                                                    )
                                                                })
                                                            }

                                                        </Td>*/}
                                                        <Td>
                                                            {item.status}
                                                        </Td>
                                                        <Td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <a target="_blank" href={`/view-invoice/${Base64.encode(item.id.toString())}`} className="dropdown-item">View Pdf</a>
                                                                    <Link to={`/admin/edit-invoice/${item.id}`} className="dropdown-item">Edit</Link>
                                                                    <button className="dropdown-item"
                                                                    >Delete</button>
                                                                </div>
                                                            </div>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                    </Tbody>
                                </Table>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}