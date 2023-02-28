import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/ClientSidebar";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import Moment from 'moment';
import { useTranslation } from "react-i18next";

export default function TotalJobs() {
    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [AllClients, setAllClients] = useState([]);
    const [AllServices, setAllServices] = useState([]);
    const [AllWorkers, setAllWorkers] = useState([]);
    const alert = useAlert();
    const cid = localStorage.getItem('client-id'); 
    const {t} = useTranslation();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const getJobs = () => {
        axios.post("/api/client/jobs", {cid},{ headers }).then((response) => {
            if (response.data.jobs.length > 0) {
                setTotalJobs(response.data.jobs);
                setPageCount(response.data.jobs.last_page);
            } else {
                setLoading("No Job found");
            }
        });
    };
   
    useEffect(() => {
        getJobs();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/client/jobs?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.jobs.data.length > 0) {
                    setTotalJobs(response.data.jobs.data);
                    setPageCount(response.data.jobs.last_page);
                } else {
                    setLoading("No Job found");
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
                            <h1 className="page-title">{t('client.jobs.title')}</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="form-control" placeholder={t('client.search')} />
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {totalJobs.length > 0 ? (
                                    <Table className="table table-bordered responsiveTable">
                                        <Thead>
                                            <Tr>
                                                <Th scope="col">{t('client.jobs.job_date')}</Th>
                                                <Th scope="col">{t('client.jobs.worker_name')}</Th>
                                                <Th scope="col">{t('client.jobs.client_name')}</Th>
                                                <Th scope="col">{t('client.jobs.service_name')}</Th>
                                                <Th scope="col">{t('client.jobs.shift')}</Th>
                                                <Th scope="col">{t('client.jobs.address')}</Th>
                                                <Th scope="col">{t('client.jobs.c_time')}</Th>
                                                <Th scope="col">{t('client.jobs.status')}</Th>
                                                <Th scope="col">{t('client.jobs.total')}</Th>
                                                <Th scope="col">{t('client.jobs.action')}</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {totalJobs &&
                                                totalJobs.map((item, index) => {

                                                    let services =  (item.offer.services) ? JSON.parse(item.offer.services) : [];
                                                    let address = (item.client.geo_address) ? (item.client.geo_address) : 0;
                                                    let Ad = [];
                                                    if(address){
                                                        let ar = address.split('\n');
                                                        for (let a in ar){
                                                            Ad.push(
                                                                <span>{ ar[a] }<br/></span>
                                                            )
                                        
                                                        }
                                                    
                                                    }
                                                    return(
                                                    <Tr key={index}>
                                                        <Td>
                                                           {Moment(item.start_date).format('DD MMM,Y')}
                                                        </Td>
                                                        <Td>
                                                            <h6>{
                                                                item.worker
                                                                    ? item.worker.firstname +
                                                                    " " + item.worker.lastname
                                                                    : "NA"
                                                            }</h6>
                                                            
                                                           
                                                        </Td>
                                                        <Td>{
                                                            item.client
                                                                ? item.client.firstname +
                                                                " " + item.client.lastname
                                                                : "NA"
                                                        }
                                                        </Td>
                                                        <Td>{
                                                           item.jobservice?item.jobservice.name:''
                                                        }</Td>
                                                        <Td>
                                                             {(item.start_time !='')?(`${item.start_time} to ${item.end_time}`):''}
                                                           
                                                        </Td>
                                                        <Td>{
                                                            Ad
                                                        }
                                                        </Td>
                                                        <Td>
                                                            {
                                                            item.end_time && item.start_time ?
                                                            parseFloat(`${item.end_time}.replace(":", ".")`)
                                                             - parseFloat(`${item.start_time}.replace(":", ".")`)
                                                             +" Hours"
                                                             :"NA"
                                                            }
                                                        </Td>
                                                        <Td
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {item.status}
                                                        </Td>
                                                        <Td>
                                                            {item.jobservice?item.jobservice.total:'0'} ILS + VAT
                                                        </Td>
                                                        <Td>
                                                            <Link to={`/client/view-job/${item.id}`} className="btn btn-primary">{t('client.jobs.view_btn')}</Link>
                                                        </Td>
                                                       
                                                    </Tr>
                                                )})}
                                        </Tbody>
                                    </Table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                                {totalJobs.length > 0 ? (
                                    <ReactPaginate
                                        previousLabel={t('client.previous')}
                                        nextLabel={t('client.next')}
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
