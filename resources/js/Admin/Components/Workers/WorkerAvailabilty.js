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
     
         let newworker = worker_aval;
         if((event.target.name).toString()==='true'){
            document.getElementById(event.target.id).setAttribute('name',!event.target.checked);
            document.getElementById(event.target.id).parentNode.childNodes[1].classList.add("checked_forcustom");
            if(newworker[w_date]===undefined){
              newworker[w_date]=[slot];
            }else{
              if(!newworker[w_date].includes(slot)){
                newworker[w_date].push(slot);
              }
            }
        }else{
           document.getElementById(event.target.id).setAttribute('name',!event.target.checked);
            document.getElementById(event.target.id).parentNode.childNodes[1].classList.remove("checked_forcustom");
            let newarray =[]
             newworker[`${w_date}`].filter( (e) => { 
                    if(e !== slot){
                      newarray.push(e)
                    }
               })
             newworker[w_date]=newarray;
        }
        setWorkerAval(newworker);
        // console.log(worker_aval);
    }
    let handleSubmit = () =>{
        let worker_id = params.id;
        let newworker = Object.assign({}, worker_aval);
        let newworker1=Object.assign({}, {'data':newworker});
       axios
            .post(`/api/admin/update_availability/${worker_id}`, newworker1, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Worker Availabilty Updated Successfully");
                    getWorkerAvailabilty();
                }
            });


    }

    let curr = new Date 
    let week = []
    let nextweek = []
    for (let i = 0; i <= 7; i++) {
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
     '4 AM - 8 AM',
     '8 AM - 12 PM',
     '12 PM - 4 PM',
     '4 PM - 8 PM',
     '8 PM - 12 AM',
     '12 AM - 4 AM'
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
                          <input type="checkbox" data-day="Sunday" className="btn-check" id={w+'-'+s} data-value={w} value={s} onChange={(e)=>handleChange(e,w,s)} name={((worker_aval[`${w}`] !== undefined)?!worker_aval[`${w}`].includes(s):true).toString()} />
                          <span className={(worker_aval[`${w}`] !== undefined)?((worker_aval[`${w}`].includes(s))?'forcustom checked_forcustom':'forcustom'):'forcustom'}>{s}</span>
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
                         <input type="checkbox" data-day="Sunday" className="btn-check" id={w+'-'+s} data-value={w} value={s} onChange={(e)=>handleChange(e,w,s)} name={((worker_aval[`${w}`] !== undefined)?!worker_aval[`${w}`].includes(s):true).toString()} />
                          <span className={(worker_aval[`${w}`] !== undefined)?((worker_aval[`${w}`].includes(s))?'forcustom checked_forcustom':'forcustom'):'forcustom'}>{s}</span>
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
      <div className="text-center">
                    <input type="button" value="Update availabilities" className="btn btn-pink" onClick={handleSubmit}/>
                </div>
    </div>
  )
}
