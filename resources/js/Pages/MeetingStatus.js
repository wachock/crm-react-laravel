import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import Moment from 'moment';

export default function MeetingStatus() {

  const [meeting,setMeeting] = useState([]);
  const [teamName,setTeamName] = useState("");
  const param    = useParams();
  const navigate = useNavigate();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
  const getMeeting = () =>{
    axios
    .post(`/api/client/meeting`,{id:param.id})
    .then((res)=>{
       setMeeting(res.data.schedule);
       setTeamName(res.data.schedule.team.name);
    })
  }
  useEffect(()=>{
   getMeeting();
   setTimeout(()=>{
    document.querySelector(".meeting").style.display= "block";
   },1000)
  },[]);

  const updateMeeting = (e) =>{
    e.preventDefault();
    axios
    .post(`/api/client/accept-meeting`,{id:param.id})
    .then((res)=>{
      swal(res.data.message,'','success');
      setTimeout(()=>{
          window.location.href=('/client/login');
      },1000)
    })
  }
  
  return (
    <div className='container meeting' style={{display:"none"}}>
        <div className='meet-status dashBox maxWidthControl p-4'>
            <h1>Meeting with {teamName}</h1>
            <ul className='list-unstyled'>
                <li>Date: <span>{Moment(meeting.start_date).format('D-M-Y')}</span></li>
                <li>Time: <span>{meeting.start_time} to {meeting.end_time}</span></li>
                {
                  meeting.service_names
                  ? <li>Service: <span>{ meeting.service_names }</span></li>
                  :''
                }
                
            </ul>
            <div className='cta'>
                {/* <button className='btn btn-danger' onClick={updateMeeting}>Accept</button> */}
                <p>If you are not available for this date, please email us and let us know so that we can schedule another date.</p>
                <a className='btn btn-primary' href='mailto:office@broomservice.co.il' >Schedule another date</a>
            </div>
        </div>
    </div>
  )
}
