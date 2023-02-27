import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../Layouts/ClientSidebar'
import WorkerDetails from '../../Component/Job/WorkerDetails'
import Services from '../../Component/Job/Services'
import Comment from '../../Component/Job/Comment'
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

export default function ViewJob() {
    const params = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [job_status, setJobStatus] = useState('completed');
    const [client, setClient] = useState([]);
    const [worker, setWorker] = useState([]);
    const [services, setServices] = useState([]);
    const [total, setTotal] = useState(0);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const getJob = () => {
        axios
            .post(`/api/client/view-job`,{id:params.id}, { headers })
            .then((res) => {
                const r = res.data.job[0];
                setJob(r)
                setJobStatus(r.status);
                setClient(r.client);
                setWorker(r.worker);
                setTotal(r.offer.subtotal);
                setServices(r.jobservice);
            });
    }
    useEffect(() => {
        getJob();
    }, []);
    const handleClick = () => {
        navigate(`/client/jobs`);
    }
    const HandleCancelJob = () => {
         let Job_start_time = moment(job.start_date + ' ' + job.start_time);
         let currentTime = moment();

         let time_diff = Job_start_time.diff(currentTime,'h');
         let warning_text ='';
         let new_total=total;
         if(time_diff<24){
               warning_text='Full Payment Will be Recieved as Cancellation Fee( '+total+' ILS).';

         }else{
             warning_text='Half Payment Will be Recieved as Cancellation Fee( '+(total/2)+' ILS).';
             new_total=total/2;
         }
         let data = {'status':'cancel','total':new_total};

        Swal.fire({
            title: "Are you sure?",
            text: warning_text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel Job",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/api/client/update-job-status/${params.id}`,data,{ headers })
                    .then((response) => {
                        Swal.fire(
                            "Updated!",
                            "Job has been updated.",
                            "success"
                        );
                        setTimeout(() => {
                            getJob();
                        }, 1000);
                    });
            }
        });

    }
    return (
        <div id='container'>
            <Sidebar />
            <div id="content">
                <div className='view-applicant'>
                    <div className='worker-profile'>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                   <div className="col-sm-8 ">
                                      <h2 className="text-danger">Worker Details</h2>
                                    </div>
                                    <div className="col-sm-2 text-right">
                                          Job Status : <h6 className="text-danger">{job.status}</h6>
                                    </div>
                                     <div className="col-sm-2">
                                          {(job_status !='completed' && job_status !='cancel') && ( <button type="button" onClick={HandleCancelJob} className="btn btn-success">Cancel</button>)}
                                    </div>
                                </div>
                               
                                <WorkerDetails worker={worker} />
                            </div>
                            <div className="col-sm-12">
                                <Services services={services} job={job} />
                                <Comment />

                            </div>
                            <div className="col-sm-12 text-center">
                                <button type="button" onClick={handleClick} className="btn btn-pink addButton">
                                    Back
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
