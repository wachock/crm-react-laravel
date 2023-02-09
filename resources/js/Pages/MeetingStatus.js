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
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };
  const getMeeting = () =>{
    axios
    .get(`/api/admin/schedule/${param.id}`,{ headers})
    .then((res)=>{
       setMeeting(res.data.schedule);
       setTeamName(res.data.schedule.team.name);
    })
  }
  useEffect(()=>{
   getMeeting();
   setTimeout(()=>{
    document.querySelector(".meeting").style.display= "block";
   },2000)
  },[]);
  
  return (
    <div className='container meeting' style={{display:"none"}}>
        <div className='meet-status dashBox maxWidthControl p-4'>
            <h1>Meeting with {teamName}</h1>
            <ul className='list-unstyled'>
                <li>Date: <span>{Moment(meeting.start_date).format('D-M-Y')}</span></li>
                <li>Time: <span>{meeting.start_time} to {meeting.end_time}</span></li>
                <li>Service: <span>Glass Cleaning</span></li>
            </ul>
            <div className='cta'>
                <button className='btn btn-danger'>Accept</button>
                <p>If you are not available for this date, please email us and let us know so that we can schedule another date.</p>
                <a className='btn btn-primary' href='mailto:office@broomservice.co.il'>Schedule another date</a>
            </div>
        </div>
    </div>
  )
}
