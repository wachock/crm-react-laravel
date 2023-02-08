import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import JobFilter from "../../Components/Filter/JobFilter";
import { useAlert } from "react-alert";
import Select from 'react-select';

export default function TotalJobs() {
    const [totalJobs, setTotalJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [AllClients, setAllClients] = useState([]);
    const [AllServices, setAllServices] = useState([]);
    const [AllWorkers, setAllWorkers] = useState([]);
    const alert = useAlert();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getJobs = () => {
        axios.get("/api/admin/jobs", { headers }).then((response) => {
            if (response.data.jobs.data.length > 0) {
                setTotalJobs(response.data.jobs.data);
                setPageCount(response.data.jobs.last_page);
            } else {
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
        getJobs();
        getClients();
        getServices();
        getWorkers();
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
    const handleDate = (e,index) => {
          let newTotalJobs = [...totalJobs];
          newTotalJobs[index][e.target.name]=e.target.value;
           setTotalJobs(newTotalJobs);    
    }
    const [workers, setWorkers] = useState([]);
    const handleChange= (e,index) => {
          let newWorkers = [...workers];
          newWorkers[e.target.name]=e.target.value;
          setWorkers(newWorkers);
    }

 const handleform = (job_id,e) => {
      let date = getSelectedDate(job_id);
      let worker = getSelectedWorkers(job_id);
      let shifts = getSelectedShift(job_id,e);
      let data ={
        date:date,
        worker:(worker!=undefined)?worker:'',
        shifts:(shifts!=null)?shifts:''
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
  const getSelectedDate = (job_id) => {
      const filteredDate = totalJobs.filter(
        (job) => job.id === job_id
      );
      return filteredDate['0']['start_date'];
  };
   const getSelectedWorkers = (job_id) => {
      if(workers[job_id] !== 'undefined'){
          return workers[job_id];
      }else{
          return '';
      }
      
  };
   const [selected_values,setSelectedValue]=useState([]);
   const getSelectedShift = (job_id,e) => {
     return document.getElementById('job-shift-'+job_id).getAttribute('value');
  };
const colourOptions = [
  { value: 0, label: 'full day - 8am-16pm' },
  { value: 1, label: 'morning - 8-12pm' },
  { value: 2, label: 'morning1 - 8-10am' },
  { value: 3, label: 'noon - 12pm-16pm' },
  { value: 4, label: 'noon - 12pm-16pm' }
]

const changeShift = (job_id,e) =>{
      
      let data='';
      {e.map((user,index) => (

          data += (index)?','+user['value']:user['value']
      ))}
     document.getElementById('job-shift-'+job_id).setAttribute('value',data);
};
console.log(totalJobs);
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
                            <Link to="/admin/add-job" className="btn btn-pink addButton"><i class="btn-icon fas fa-plus-circle"></i>
                                Add New
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <JobFilter 
                        AllServices={AllServices} 
                        AllClients={AllClients}
                        AllWorkers={AllWorkers}
                        getTotalJobs={getTotalJobs}
                          />
                        <div className="boxPanel">
                            <div className="table-responsive">
                                {totalJobs.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Worker Availability</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Worker Name</th>
                                                <th scope="col">Client Name</th>
                                                <th scope="col">Service Name</th>
                                                {/* <th scope="col">Start Time</th>
                                                 <th scope="col">End Time</th> 
                                                <th scope="col">Assigned Worker</th>
                                                */} 
                                                <th scope="col">Shift</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {totalJobs &&
                                                totalJobs.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>Available</td>
                                                         <td>
                                                            <input name='start_date' type="date" value={item.start_date} onChange={(e) =>
                                                                            handleDate(
                                                                                e,
                                                                                index
                                                                            )
                                                                        } />
                                                        </td>
                                                        <td>
                                                        {
                                                            item.worker
                                                                ? item.worker.firstname +
                                                                " " + item.worker.lastname
                                                                : "NA"
                                                        }
                                                        <div>Change Worker</div>
                                                        <select name={item.id}  className="form-control" value={(workers[`${item.id}`])?workers[`${item.id}`] : "" } onChange={e => handleChange(e,index)} >
                                                        <option selected>select</option>
                                                       { AllWorkers && AllWorkers.map((w,i)=>{
                                                         return (
                                                            <option value={w.id} key={i}> {w.firstname}  {w.lastname}</option>
                                                         )
                                                       })}
                                                      </select>

                                                        </td>
                                                        <td>{
                                                            item.client
                                                                ? item.client.firstname +
                                                                " " + item.client.lastname
                                                                : "NA"
                                                        }
                                                        </td>
                                                        <td>{
                                                            item.service
                                                                ? item.service.name
                                                                : "NA"
                                                        }</td>
                                                         {/*<td>
                                                            {item.start_time}
                                                        </td>
                                                        <td>
                                                            {item.end_time}
                                                        </td>
                                                        <td>{
                                                            item.worker
                                                                ? item.worker.firstname +
                                                                " " + item.worker.lastname
                                                                : "NA"
                                                        }</td>
                                                         */}
                                                        <td>
                                                        
                                                    <Select
                                                        defaultValue={colourOptions.filter(colour => {
                                                                          if (`${item.shifts}`.includes(colour.value)) {
                                                                            return colour
                                                                          }
                                                                      })}
                                                        isMulti
                                                        name="colors"
                                                        id={`job-shift-${item.id}`}
                                                        options={colourOptions}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={(e)=>changeShift(item.id,e)}
                                                      />
                                                        </td>
                                                        <td
                                                            style={{
                                                                textTransform:
                                                                    "capitalize",
                                                            }}
                                                        >
                                                            {item.status}
                                                        </td>
                                                        <td>
                                                            {item.rate}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex">
                                                                 <button
                                                                        className="ml-2 btn btn-danger"
                                                                        onClick={(e) =>
                                                                            handleform(
                                                                                item.id,
                                                                                e
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                {/*
                                                                <Link
                                                                    to={`/admin/edit-job/${item.id}`}
                                                                    className="btn bg-purple"
                                                                >
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                */}
                                                                <Link
                                                                    to={`/admin/view-job/${item.id}`}
                                                                    className="ml-2 btn btn-success"
                                                                >
                                                                    <i className="fa fa-eye"></i>
                                                                </Link>
                                                                <div className="text-center">
                                                                    <button
                                                                        className="ml-2 btn btn-danger"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
