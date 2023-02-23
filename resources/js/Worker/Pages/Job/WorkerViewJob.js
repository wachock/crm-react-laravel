import React, { useState, useEffect  } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import WorkerSidebar from '../../Layouts/WorkerSidebar'
import ClientDetails from '../../Components/Job/ClientDetails'
import WorkerDetails from '../../Components/Job/WorkerDetails'
import Services from '../../Components/Job/Services'
import Comment from '../../Components/Job/Comment'
import { useAlert } from "react-alert";

export default function WorkerViewJob() {
    const params = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [job_status, setJobStatus] = useState('completed');
    const [client, setClient] = useState([]);
    const [worker, setWorker] = useState([]);
    const [services, setServices] = useState([]);
    const [counter, setCounter] = useState('00:00:00');
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [time_id, setTimeId] = useState(null);
    const [job_time, setJobTime] = useState([]);
    const [total_time, setTotalTime] = useState(0);
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("worker-token"),
    };

    const getJob = () => {
        axios
            .get(`/api/jobs/${params.id}`, { headers })
            .then((res) => {
                const r = res.data.job;
                setJob(r)
                setJobStatus(r.status);
                setClient(r.client);
                setWorker(r.worker);
                setServices(JSON.parse(r.offer.services));
            });
    }
    useEffect(() => {
        getJob();
    }, []);
    const handleClick = () => {
        navigate(`/worker/jobs`);
    }
    const HandleMarkComplete = () => {
         let data = [];
         axios
            .put(`/api/jobs/${params.id}`,data, { headers })
            .then((res) => {
                alert.success('Job Mark as Completed.');
            });

    }
    const getDateTime = () =>{
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }
   const startTimer = () => {
    setIsRunning(true);
     let data = {
        job_id:params.id,
        worker_id:localStorage.getItem("worker-id"),
        start_time:getDateTime()
     };
         axios
            .post(`/api/job-start-time`,data, { headers })
            .then((res) => {
                 getTime();
            });
  };
  const stopTimer = () => {
    setIsRunning(false);
    setStartTime(getDateTime());
     let data = {
        id:time_id,
        time_diff: (new Date(getDateTime()).getTime() - new Date(startTime).getTime()) / 1000,
        end_time:getDateTime()
     };
     axios
            .post(`/api/job-end-time`,data, { headers })
            .then((res) => {
                getTimes();
                 
            });
  };
  const getTime = () => {
     let data = {
        job_id:params.id,
        worker_id:localStorage.getItem("worker-id"),
        filter_end_time:true
     };
      axios
            .post(`/api/get-job-time`,data, { headers })
            .then((res) => {
                let t =res.data.time;
                if(Object.keys(t).length){
                    setTimeId(t.id);
                    setStartTime(t.start_time);
                    setIsRunning(true);
                }
                 
            });
                

  }
  const getTimes = () => {
     let data = {
        job_id:params.id,
        worker_id:localStorage.getItem("worker-id")
     };
      axios
            .post(`/api/get-job-time`,data, { headers })
            .then((res) => {
                let t =res.data;
                setJobTime(t.time);
                setTotalTime(parseInt(t.total));
            });
                

  }
   useEffect(() => {
        getTime();
        getTimes();
    }, []);
   useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = (new Date().getTime() - new Date(startTime).getTime()) / 1000;
     let hours = Math.floor(timeDiff / 3600);
      let minutes = Math.floor((timeDiff % 3600) / 60);
      let seconds = Math.floor(timeDiff % 60);
       hours=(hours<10)?'0'+hours:hours;
      minutes=(minutes<10)?'0'+minutes:minutes;
      seconds=(seconds<10)?'0'+seconds:seconds;
      setCounter(`${hours}h:${minutes}m:${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
   let time_difference = (start,end) =>{
    const timeDiff = (new Date(end).getTime() - new Date(start).getTime()) / 1000;
      return calculateTime(timeDiff);

   }
   let calculateTime = (timeDiff) => {
    let hours = Math.floor(timeDiff / 3600);
      let minutes = Math.floor((timeDiff % 3600) / 60);
      let seconds = Math.floor(timeDiff % 60);
       hours=(hours<10)?'0'+hours:hours;
      minutes=(minutes<10)?'0'+minutes:minutes;
      seconds=(seconds<10)?'0'+seconds:seconds;
      return `${hours}h:${minutes}m:${seconds}s`;

   }
  console.log(job_status);

    return (
        <div id='container'>
            <WorkerSidebar />\
            <div id="content">
                <div className='view-applicant'>
                    <div className='worker-profile'>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                  <div className='col-sm-8'>
                                     <h2 className="text-danger">Client Details</h2>
                                  </div>
                                  <div className='col-sm-2'>
                                     {(job_status !='completed') && ( <button type="button" onClick={HandleMarkComplete} className="btn btn-success">Mark as Complete</button>)}
                                  </div>
                                   {(job_status !='completed')?
                                    <div className='col-sm-2'>
                                     {!isRunning && (
                                          <button onClick={startTimer} className="btn btn-primary">Start Timer</button>
                                        )}
                                        {isRunning && (
                                            <>
                                           
                                          <button onClick={stopTimer} className="btn btn-danger">Stop Timer</button>
                                           <h4>{counter}</h4>
                                            </>
                                        )}
                                    </div>
                                    :
                                    <div className='col-sm-2'>
                                       Job Status : <h6 className="text-danger">Completed</h6>
                                    </div>
                                     }
                                 </div>

                                <ClientDetails client={client} />
                            </div>
                            <div className="col-sm-12">
                                <Services services={services} job={job} />
                               

                            </div>
                            <div className="col-sm-12">
                                <h2 className="text-danger">Work Time</h2>
                                 {job_time.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Start Time</th>
                                                <th scope="col">End Time</th>
                                                <th scope="col">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {job_time &&
                                                job_time.map((item, index) => {
                                                    let w_t = (item.end_time)?time_difference(item.start_time,item.end_time):'';
                                                     return(
                                                    <tr key={index}>
                                                    <td>{item.start_time}</td>
                                                    <td>{item.end_time}</td>
                                                    <td>{w_t}</td>
                                                    </tr>

                                                    )})}
                                                <tr>
                                                 <td colSpan="2">Total Time</td>
                                                 <td>{calculateTime(total_time)}</td>
                                                </tr>
                                        </tbody>
                                        
                                        </table>
                                ) : (
                                    <p className="text-center mt-5"></p>
                                )}
                                       
                           

                             <Comment/>
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
