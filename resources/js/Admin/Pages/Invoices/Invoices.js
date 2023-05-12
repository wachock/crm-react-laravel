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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Invoice!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .get(`/api/admin/delete-invoice/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Invoice has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getInvoices();
                        }, 1000);
                    });
            }
        });
    };

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

                                <Table className="table table-bordered">
                                    <Thead>
                                        <Tr>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'id')}}  >    #Invoice     <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }} onClick={(e)=>{sortTable(e,'amount')}}  >Amount       <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}   onClick={(e)=>{sortTable(e,'created_at')}}  >Created Date      <span className="arr"> &darr;</span></Th>
                                            <Th scope="col" style={{ cursor: "pointer" }}   onClick={(e)=>{sortTable(e,'due_date')}} >Due Date          <span className="arr"> &darr;</span></Th>
                                            <Th scope="col"  >Customer   </Th>
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
                                                        <Td>{item.amount} ILS</Td>
                                                        <Td>{Moment(item.created_at).format('DD, MMM Y')}</Td>
                                                        <Td>{(item.due_date != null) ? Moment(item.due_date).format('DD, MMM Y') : 'NA'}</Td>
                                                        <Td><Link to={`/admin/view-client/${item.client.id}`}>{item.client.firstname + " " + item.client.lastname}</Link></Td>
                                                        <Td>
                                                            {item.status}
                                                        </Td>
                                                        <Td>
                                                            <div className="action-dropdown dropdown">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <a target="_blank" href={item.doc_url} className="dropdown-item">View Invoice</a>
                                                                    {/*<Link to={`/admin/edit-invoice/${item.id}`} className="dropdown-item">Edit</Link>*/}
                                                                    <button  onClick={e=>handleDelete(item.id)} className="dropdown-item"
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