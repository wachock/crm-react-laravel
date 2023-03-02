import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useLocation } from 'react-router-dom'
import Moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
export default function TotalJobs() {

    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [AllClients, setAllClients] = useState([]);
    const [AllServices, setAllServices] = useState([]);
    const [AllWorkers, setAllWorkers] = useState([]);
    const alert = useAlert();
    const location = useLocation();
    const navigate = useNavigate();
    const query = (location.search.split('=')[1]);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getJobs = () => {
        axios.get(`/api/admin/jobs`, { headers }).then((response) => {
            if (response.data.jobs.data.length > 0) {
                setTotalJobs(response.data.jobs.data);
                setPageCount(response.data.jobs.last_page);
            } else {
                setTotalJobs([]);
                setLoading("No Job found");
            }
        });
    };
    const getClients = () => {
        axios
            .get('/api/admin/all-clients', { headers })
            .then((res) => {
                setAllClients(res.data.clients);
            })

    }

    const getServices = () => {
        axios
            .get('/api/admin/all-services', { headers })
            .then((res) => {
                setAllServices(res.data.services);
            })
    }

    const getWorkers = () => {
        axios
            .get('/api/admin/all-workers', { headers })
            .then((res) => {
                setAllWorkers(res.data.workers);
            })
    }

    useEffect(() => {
        getClients();
        getServices();
        getWorkers();
        getJobs();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/jobs?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.jobs.data.length > 0) {
                    setTotalJobs(response.data.jobs.data);
                    setPageCount(response.data.jobs.last_page);
                } else {
                    setLoading("No Job found");
                }
            });
    };

    const getTotalJobs = (response) => {
        if (response.data.jobs.data.length > 0) {
            setTotalJobs(response.data.jobs.data);
            setPageCount(response.data.jobs.last_page);
        } else {
            setTotalJobs([]);
            setPageCount(response.data.jobs.last_page);
            setLoading("No Job found");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Job!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/jobs/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Job has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getJobs();
                        }, 1000);
                    });
            }
        });
    };
    const handleDate = (e, index) => {
        let newTotalJobs = [...totalJobs];
        newTotalJobs[index][e.target.name] = e.target.value;
        setTotalJobs(newTotalJobs);
    }

    const [workers, setWorkers] = useState([]);
    const handleChange = (e, index) => {
        let newWorkers = [...workers];
        newWorkers[e.target.name] = e.target.value;
        setWorkers(newWorkers);
    }

    const handleform = (job_id, e) => {
        let date = '';
        let worker = getSelectedWorkers(job_id);
        let shifts = null;

        let data = {
            date: date,
            worker: (worker != undefined) ? worker : '',
            shifts: (shifts != null) ? shifts : '',
        }
        axios
            .post(`/api/admin/upldate-job/${job_id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Job Updated Successfully");
                    setTimeout(() => {
                        getJobs();
                    }, 1000);
                }
            });

    }
    const getSelectedWorkers = (job_id) => {
        if (workers[job_id] !== 'undefined') {
            return workers[job_id];
        } else {
            return '';
        }

    };
    const handleNavigate = (e, id) => {
        e.preventDefault();
        navigate(`/admin/view-job/${id}`);
    }
    let time_difference = (start, end) => {
        const timeDiff = (new Date(end).getTime() - new Date(start).getTime()) / 1000;
        return calculateTime(timeDiff);

    }
    let calculateTime = (timeDiff) => {
        let hours = Math.floor(timeDiff / 3600);
        let minutes = Math.floor((timeDiff % 3600) / 60);
        let seconds = Math.floor(timeDiff % 60);
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        return `${hours}h:${minutes}m:${seconds}s`;

    }

    const header = [
        { label: "Worker Name", key: "worker_name" },
        { label: "Worker ID", key: "worker_id" },
        { label: "Start Time", key: "start_time" },
        { label: "End Time", key: "end_time" },
        { label: "Total Time", key: "time_diffrence" },
    ];


    const [Alldata, setAllData] = useState([]);
    const [filename, setFilename] = useState("");
    const handleReport = (e) => {
        e.preventDefault();
        axios.post(`/api/admin/export_report`, { type:'all' }, { headers })
            .then((res) => {
                if (res.data.status_code == 404) {
                    alert.error(res.data.msg);
                } else {
                    setFilename(res.data.filename);
                    let rep = res.data.report;
                    for( let r in rep){
                        rep[r].time_diffrence = time_difference(rep[r].start_time,rep[r].end_time);
                    }
                    setAllData(rep);
                    document.querySelector('#csv').click();
                }
            });
    }

    const csvReport = {
        data: Alldata,
        headers: header,
        filename: filename
    };

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Jobs</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                            <div classname="App" style={{display:"none"}}>
                                <CSVLink {...csvReport}  id="csv">Export to CSV</CSVLink>
                            </div>
                                <button className="btn btn-success addButton" onClick={(e)=>handleReport(e)}>Export Time Reports</button>
                                {/*<input type='text' className="form-control" placeholder="Search" />
                                <Link to="/admin/add-job" className="btn btn-pink addButton"><i className="btn-icon fas fa-plus-circle"></i>
                                    Add New
                                </Link>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">

                        <div className="boxPanel">
                            <div className="table-responsive">
                                {totalJobs.length > 0 ? (
                                    <Table className="table table-bordered">
                                        <Thead>
                                            <Tr>
                                                <Th scope="col">Job Dated</Th>
                                                <Th scope="col">Worker Name</Th>
                                                <Th scope="col">Client Name</Th>
                                                <Th scope="col">Service Name</Th>
                                                <Th scope="col">Shift</Th>
                                                <Th scope="col">Address</Th>
                                                <Th scope="col">Complete Time</Th>
                                                <Th scope="col">Status</Th>
                                                <Th scope="col">Total</Th>
                                                <Th scope="col">Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {totalJobs &&
                                                totalJobs.map((item, index) => {

                                                    let services = (item.offer.services) ? JSON.parse(item.offer.services) : [];

                                                    return (
                                                        <Tr key={index} style={{"cursor":"pointer"}}>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {Moment(item.start_date).format('DD MMM,Y')}
                                                            </Td>
                                                            <Td><Link to={(item.worker) ? `/admin/view-worker/${item.worker.id}` : '#'}>
                                                                <h6>{
                                                                    item.worker
                                                                        ? item.worker.firstname +
                                                                        " " + item.worker.lastname
                                                                        : "NA"
                                                                }</h6>
                                                                </Link>
                                                                <div>Change Worker</div>
                                                                <select name={item.id} className="form-control" value={(workers[`${item.id}`]) ? workers[`${item.id}`] : ""} onChange={e => handleChange(e, index)} >
                                                                    <option selected>select</option>
                                                                    {AllWorkers && AllWorkers.map((w, i) => {
                                                                        return (
                                                                            <option value={w.id} key={i}> {w.firstname}  {w.lastname}</option>
                                                                        )
                                                                    })}
                                                                </select>

                                                            </Td>
                                                            <Td><Link to={ item.client ? `/admin/view-client/${item.client.id}` : '#'}>{
                                                                item.client
                                                                    ? item.client.firstname +
                                                                    " " + item.client.lastname
                                                                    : "NA"
                                                            }
                                                            </Link>
                                                            </Td>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>{
                                                               item.jobservice
                                                                   ? item.jobservice.name:'NA'
                                                            }</Td>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {(item.start_time != '') ? (`${item.start_time} to ${item.end_time}`) : ''}

                                                            </Td>
                                                            <Td><Link target='_blank' to={ (item.client.latitude && item.client.longitude)
                                                                 ? `https://maps.google.com/?q=${(item.client.latitude+","+item.client.longitude)}` 
                                                                 : '#' }>
                                                                {
                                                                item.client
                                                                    ? item.client.geo_address
                                                                    : "NA"
                                                            }
                                                            </Link>
                                                            </Td>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {
                                                                    item.end_time && item.start_time ?
                                                                        parseFloat(`${item.end_time}.replace(":", ".")`)
                                                                        - parseFloat(`${item.start_time}.replace(":", ".")`)
                                                                        + " Hours"
                                                                        : "NA"
                                                                }
                                                            </Td>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}
                                                                style={{
                                                                    textTransform:
                                                                        "capitalize",
                                                                }}
                                                            >
                                                                {item.status}
                                                                <p>
                                                                {(item.status=='cancel')?`(With Cancellatiom fees ${item.rate} ILS)`:''}
                                                                </p>
                                                            </Td>
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {item.jobservice
                                                                   ? item.jobservice.total:'0'} ILS + VAT
                                                    
                                                            </Td>
                                                            <Td>
                                                                <div className="action-dropdown dropdown pb-2">
                                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                            <Link to={`/admin/edit-job/${item.id}`} className="dropdown-item">Edit Job</Link>
                                                                        <Link to={`/admin/view-job/${item.id}`} className="dropdown-item">View</Link>
                                                                        <button className="dropdown-item" onClick={() => handleDelete(item.id)}>Delete</button>
                                                                    </div>
                                                                </div>
                                                                <button type="button" className="btn btn-success" onClick={(e) => handleform(item.id, e)}>
                                                                    Update
                                                                </button>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                })}
                                        </Tbody>
                                    </Table>
                                ) : (
                                    <p className="text-center mt-5">{loading}</p>
                                )}
                                {totalJobs.length > 0 ? (
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
