import React,{ useState, useEffect  }   from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export default function WorkerTiming({job}) {
    const [job_time, setJobTime] = useState([]);
    const [total_time, setTotalTime] = useState(0);
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getTimes = () => {
     let data = {
        job_id:params.id,
        worker_id:job.worker_id
     };
      axios
            .post(`/api/admin/get-job-time`,data, { headers })
            .then((res) => {
                let t =res.data;
                setJobTime(t.time);
                setTotalTime(parseInt(t.total));
            });
                

  }
   useEffect(() => {
        getTimes();
    }, []);
  const handleSubmit = (e) => {
        e.preventDefault();
        const start = document.querySelector('#timing_starts').value;
        const end = document.querySelector('#timing_ends').value;
        const data = {
            start_time: start.replace('T',' ')+':00',
            end_time: end.replace('T',' ')+':00',
            job_id:params.id,
            worker_id:job.worker_id,
            timeDiff:(new Date(end).getTime() - new Date(start).getTime()) / 1000
        }
        if(data.start_time == ':00' || data.end_time == ':00'){
             window.alert('Please Select Start And End Time');  
             return 0;  
        }
        axios
        .post(`/api/admin/add-job-time`,data,{ headers })
        .then((res)=>{
            if(res.data.errors){
              for(let e in res.data.errors){
                alert.error(res.data.errors[e]);
              }
            } else {
                alert.success('Worker Timing Added Successfully.');
                document.querySelector('.closeb').click();
                document.querySelector('#timing_starts').value='';
                document.querySelector('#timing_ends').value='';
                getTimes();
            }
         
        })

    }
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
  return (
    <>
         <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-10">
                                  <h2 className="text-danger">Work Time</h2>
                                   </div>
                                <div className="col-sm-2">
                                <button type="button" className="btn btn-pink" data-toggle="modal" data-target="#add-work-time">
                                    Add Timing
                                </button>
                                </div>
                            </div>
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
                                ) : ( <p className="text-center mt-5"></p>
                                )}
                            </div>

                              <div className="modal fade" id="add-work-time" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Worker Timing</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">


                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                    <label for="timing_starts">Timing Starts at</label>
                                    <input type="datetime-local" className="form-control" id="timing_starts" name="timing_starts" placeholder="Enter Start Timing" />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                   <div className="form-group">
                                        <label for="timing_starts">Timing Ends at</label>
                                        <input type="datetime-local" className="form-control" id="timing_ends" name="timing_ends" placeholder="Enter End Timing" />
                                    </div>
                                </div>
                            
                              
                                
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit}  className="btn btn-primary">Save Timing</button>
                        </div>
                    </div>
                </div>
            </div>
    </>
 )
}