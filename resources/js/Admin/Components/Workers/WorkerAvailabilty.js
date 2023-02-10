import React,{useState,useEffect} from 'react'
import { useAlert } from "react-alert";
import { useParams,useNavigate,Link } from "react-router-dom";

export default function WorkerAvailabilty() {
    const [worker_aval, setWorkerAval] = useState([])
    const [errors, setErrors] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    let handleChange = (event,w_date, slot) => {
      let worker_id = params.id;

       const data = {
        'checked': event.target.checked,
        'w_date':w_date,
        'slot':slot
         }

        axios
            .put(`/api/admin/update_availability/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    // alert.success("Worker Availabilty Updated Successfully");
                    getWorkerAvailabilty();
                }
            });
    }

    let curr = new Date 
    let week = []
    let nextweek = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      if(first>=curr.getDate()){
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
      }
    }
    
    for (let i = 0; i < 7; i++) {
      var today = new Date;
       var first = today.getDate() - today.getDay() + 1 + 7+i;
       var firstday = new Date(today.setDate(first)).toISOString().slice(0, 10)
        nextweek.push(firstday)
    }
   const slot = [
     '6 AM - 10 AM',
     '10 AM - 2 PM',
     '2 PM - 6 PM',
     '6 PM - 10 PM',
     '10 PM - 2 AM',
     '2 AM - 6 AM'
    ]

     const getWorkerAvailabilty = () => {
        axios
            .get(`/api/admin/worker_availability/${params.id}`, { headers })
            .then((response) => {
                if(response.data.availability){
                    setWorkerAval(response.data.availability);
                }
            });
    };
    useEffect(() => {
        getWorkerAvailabilty();
    }, []);
    console.log(worker_aval)
  return (
    <div className="boxPanel">
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation"><a id="current-week" className="nav-link active" data-toggle="tab" href="#tab-current-week" aria-selected="true" role="tab">Current Week</a></li>
            <li className="nav-item" role="presentation"><a id="first-next-week" className="nav-link" data-toggle="tab" href="#tab-first-next-week" aria-selected="true" role="tab">Next Week</a></li>
        </ul>
         <div className='tab-content' style={{background: "#fff"}}>
         <div id="tab-current-week" className="tab-pane active show" role="tab-panel" aria-labelledby="current-week">
            <div className="table-responsive">
              <table className="timeslots table">
                <thead>
                  <tr>
                    {week.map((element, index) => (
                       <th key={index}>{element}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {slot.map((s, index) => (
                  <tr key={index}>
                    {week.map((w, index) => (
                    <td key={index}>
                      <div className="radio">
                        <label>
                          <input type="checkbox" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" data-value={w} value={s} onClick={(e)=>handleChange(e,w,s)} checked={(worker_aval[`${w}`] !== undefined)?worker_aval[`${w}`].includes(s):false} />
                          <span className="forcustom">{s}</span>
                        </label>
                      </div>
                    </td>
                    ))}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
       </div>
       <div id="tab-first-next-week" className="tab-pane" role="tab-panel" aria-labelledby="first-next-week">
            <div className="table-responsive">
              <table className="timeslots table">
                <thead>
                  <tr>
                    {nextweek.map((element, index) => (
                       <th key={index}>{element}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {slot.map((s, index) => (
                  <tr key={index}>
                    {nextweek.map((w, index) => (
                    <td key={index}>
                      <div className="radio">
                        <label>
                          <input type="checkbox" data-day="Sunday" className="btn-check" id="bordered-radio-1" name="timeslot" data-value={w} value={s} onClick={(e)=>handleChange(e,w,s)} checked={(worker_aval[`${w}`] !== undefined)?worker_aval[`${w}`].includes(s):false}/>
                          <span className="forcustom">{s}</span>
                        </label>
                      </div>
                    </td>
                    ))}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
       </div>
      </div>
    </div>
  )
}
