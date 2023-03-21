import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useLocation } from 'react-router-dom'
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { intlDateTimeFormatSupported } from "javascript-time-ago";
export default function TotalJobs() {

    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [AllClients, setAllClients] = useState([]);
    const [AllServices, setAllServices] = useState([]);
    const [AllWorkers, setAllWorkers] = useState([]);
    const [from,setFrom] = useState([]);
    const [to,setTo] = useState([]);
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
        let up = e.target.parentNode.parentNode.lastChild.lastChild;
        setTimeout(() => {
            up.click();
        }, 500)

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

    function toHoursAndMinutes(totalSeconds) {
        const totalMinutes = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        return decimalHours(h, m, s);
    }

    function decimalHours(h, m, s) {

        var hours = parseInt(h, 10);
        var minutes = m ? parseInt(m, 10) : 0;
        var min = minutes / 60;
         return hours + ":" + min.toString().substring(0, 4);
       

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

        if(!from) { window.alert("Please select form date!"); return false;}
        if(!to) { window.alert("Please select to date!"); return false;}

        axios.post(`/api/admin/export_report`, { type: 'all',from:from,to:to }, { headers })
            .then((res) => {
                if (res.data.status_code == 404) {
                    alert.error(res.data.msg);
                } else {
                    setFilename(res.data.filename);
                    let rep = res.data.report;
                    for (let r in rep) {
                        rep[r].time_diffrence = toHoursAndMinutes(rep[r].time_total);

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
    const copy = [...totalJobs];
    const [order,setOrder] = useState('ASC');
    const sortTable = (col) =>{
        
        if(order == 'ASC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setTotalJobs(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setTotalJobs(sortData);
            setOrder('ASC');
        }
        
    }
    const filterJobs = (e) => {
       filterJobs1();
    }

    const filterJobDate = (w) => {
        $('#filter-week').val(w)
        filterJobs1();
    }
    const filterJobs1 = () => {
        let filter_value = $('#search-field').val();
        let filter_week = $('#filter-week').val();
        axios
            .get(`/api/admin/jobs?filter_week=${filter_week}&q=${filter_value}`, { headers })
            .then((response) => {
                if (response.data.jobs.data.length > 0) {
                    setTotalJobs(response.data.jobs.data);
                    setPageCount(response.data.jobs.last_page);
                } else {
                    setTotalJobs([]);
                    setPageCount(response.data.jobs.last_page);
                    setLoading("No Jobs found");
                }
            })
    }
   
    return (
        <div id="container">
            <Sidebar />
            <div id="content" className="job-listing-page">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-2 col-4">
                            <h1 className="page-title">Jobs</h1>
                        </div>
                        <div className="col-8 hidden-xl">
                            <div className="search-data"> 
                               <input type='text' id="search-field" className="form-control" placeholder="Search" onChange={filterJobs} style={{marginRight: "0"}} />
                            </div>
                        </div>
                        <div className="col-sm-6 hidden-xs">
                            <div className="job-buttons">
                                <input type="hidden" id="filter-week" />
                                <button className="btn btn-success" onClick={(e)=>{filterJobDate('current')}}> Current week</button>
                                <button className="ml-2 btn btn-pink" onClick={(e)=>{filterJobDate('next')}}> Next week</button>
                                <button className="ml-2 btn btn-primary" onClick={(e)=>{filterJobDate('nextnext')}}> Next Next week</button>
                                <button className="ml-2 btn btn-warning addButton"  data-toggle="modal" data-target="#exampleModal">Export Time Reports</button>
                            </div>
                            <div classname="App" style={{ display: "none" }}>
                                <CSVLink {...csvReport} id="csv">Export to CSV</CSVLink> 
                            </div>
                        </div>
                        <div className="col-12 hidden-xl">
                            <div className="job-buttons">
                                <input type="hidden" id="filter-week" />
                                <button className="btn btn-success" onClick={(e)=>{filterJobDate('current')}}> Current week</button>
                                <button className="ml-2 btn btn-pink" onClick={(e)=>{filterJobDate('next')}}> Next week</button>
                                <button className="ml-2 btn btn-primary" onClick={(e)=>{filterJobDate('nextnext')}}> Next Next week</button> 
                            </div>
                            <button className="reportModal btn btn-warning"  data-toggle="modal" data-target="#exampleModal">Export Time Reports</button>
                        </div>
                        <div className="col-sm-4 hidden-xs">
                            <div className="search-data"> 
                               <input type='text' id="search-field" className="form-control" placeholder="Search" onChange={filterJobs} style={{marginRight: "0"}} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body getjobslist">

                        <div className="boxPanel">
                            <div className="table-responsive">
                                {totalJobs.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" onClick={(e)=>{sortTable('start_date')}}>Job Dated</th>
                                                <th scope="col">Worker</th>
                                                <th scope="col">Client</th>
                                                <th scope="col">Service</th>
                                                <th className="hidden-xs" scope="col">Status</th>
                                                {/* <th scope="col">Shift</th> 
                                                <Th scope="col">Address</Th>
                                                <Th scope="col">Complete Time</Th>
                                                <Th scope="col">Total</Th> */}
                                                <th className='text-center' scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalJobs &&
                                                totalJobs.map((item, index) => {
                                                    return (
                                                        <tr key={index} style={{ "cursor": "pointer" }}>
                                                            <td onClick={(e) => handleNavigate(e, item.id)}>
                                                                {Moment(item.start_date).format('DD MMM,Y')}
                                                                <span className="d-block">{(item.start_time != '') ? (`${item.start_time} to ${item.end_time}`) : ''}</span>
                                                            </td>
                                                            <td><Link to={(item.worker) ? `/admin/view-worker/${item.worker.id}` : '#'}>
                                                                <h6>{
                                                                    item.worker
                                                                        ? item.worker.firstname +
                                                                        " " + item.worker.lastname
                                                                        : "NA"
                                                                }</h6>
                                                            </Link>
                                                            <select name={item.id} className="form-control mb-3 mt-1 form-control" value={(workers[`${item.id}`]) ? workers[`${item.id}`] : ""} onChange={e => handleChange(e, index)} >
                                                                <option selected>select</option>
                                                                {item.avl_worker && item.avl_worker.map((w, i) => {
                                                                    return (
                                                                        <option value={w.id} key={i}> {w.firstname}  {w.lastname}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            </td>
                                                            <td style={item.client ? {background:item.client.color} : {}}><Link to={item.client ? `/admin/view-client/${item.client.id}` : '#'}>{
                                                                item.client
                                                                    ? item.client.firstname +
                                                                    " " + item.client.lastname
                                                                    : "NA"
                                                            }
                                                            </Link>
                                                            </td>
                                                            <td onClick={(e) => handleNavigate(e, item.id)}>{
                                                                
                                                                (item.jobservice) ?
                                                                    item.jobservice == '10' 
                                                                        ? item.jobservice.other_title :item.jobservice.name 
                                                                : 'NA'

                                                            }</td>
                                                            <td className="hidden-xs" onClick={(e)=>handleNavigate(e,item.id)}
                                                                style={{
                                                                    textTransform:
                                                                        "capitalize",
                                                                }}
                                                            >
                                                                {item.status}
                                                                <p>
                                                                {(item.status=='cancel')?`(With Cancellatiom fees ${item.rate} ILS)`:''}
                                                                </p>
                                                            </td>
                                                            {/* <td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {(item.start_time != '') ? (`${item.start_time} to ${item.end_time}`) : ''}

                                                            </td>
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
                                                            </Td>*/}
                                                            {/* 
                                                            <Td onClick={(e)=>handleNavigate(e,item.id)}>
                                                                {item.jobservice
                                                                   ? item.jobservice.total:'0'} ILS + VAT
                                                    
                                                            </Td> */}
                                                            <td className='text-center'>
                                                                <div className="action-dropdown dropdown pb-2">
                                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <Link to={`/admin/view-job/${item.id}`} className="dropdown-item">View</Link>
                                                                        <button className="dropdown-item" onClick={() => handleDelete(item.id)}>Delete</button>
                                                                    </div>
                                                                </div>
                                                                <button type="button" style={{ display: 'none' }} className="btn btn-success" onClick={(e) => handleform(item.id, e)}>
                                                                    Update
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
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

                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Export Records</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">


                                        <div className="row">
                                           
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        From
                                                    </label>
                                                    <input
                                                        type="date"
                                                        onChange={(e) =>
                                                            setFrom(e.target.value)
                                                        }
                                                        className="form-control"
                                                        required

                                                    />

                                                </div>
                                            </div>

                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        To
                                                    </label>
                                                    <input
                                                        type="date"
                                                        onChange={(e) =>
                                                            setTo(e.target.value)
                                                        }
                                                        className="form-control"
                                                        required

                                                    />

                                                </div>
                                            </div>


                                        </div>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary closeb" data-dismiss="modal">Close</button>
                                        <button type="button" onClick={(e)=> handleReport(e)} className="btn btn-primary">Export</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
