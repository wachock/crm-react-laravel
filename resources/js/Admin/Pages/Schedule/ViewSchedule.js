import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import events from './events'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import { useAlert } from 'react-alert';
import swal from 'sweetalert';

export default function ViewSchedule() {

    const [startDate, setStartDate] = useState(new Date());
    const [client, setClient] = useState([]);
    const [totalTeam, setTotalTeam] = useState([]);
    const [team, setTeam] = useState([]);
    const [bstatus, setBstatus] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [events ,setEvents] = useState([]);
    const [lang,setLang]      =useState("");
    const param = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const sid = queryParams.get("sid");
    const time =[
                "09:30 AM",
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "11:30 AM",
                "12:00 PM",
                "12:30 PM",
                "01:00 PM",
                "01:30 PM",
                "02:00 PM",
                "02:30 PM",
                "03:00 PM",
                "03:30 PM",
                "04:00 PM",
                "04:30 PM",
                "05:00 PM",
                "05:30 PM"
            ];

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const sendMeeting = () =>{

        let st = document.querySelector('#status').value;
        const data = {
            client_id:param.id,
            team_id  : team.length>0 ? team: (team == 0)? '' : '',
            start_date:startDate,
            start_time:startTime,
            end_time:endTime,
            booking_status:st,
            lang:lang
            
        }

        let btn = document.querySelector('.sendBtn');
        btn.setAttribute('disabled',true);
        btn.innerHTML = "Sending..";
        
        axios
        .post(`/api/admin/schedule`,data,{ headers })
        .then((res)=>{

            if(res.data.errors){
                for(let e in res.data.errors){
                    alert.error(res.data.errors[e]);
                } 
                btn.removeAttribute('disabled');
                btn.innerHTML = "Send meeting";
            } else {
                alert.success(res.data.message);
                setTimeout(()=>{
                  navigate('/admin/schedule');
                },1000);
            }
        })

    }

    const getClient = () => {
        axios
            .get(`/api/admin/clients/${param.id}`, { headers })
            .then((res) => {
                setClient(res.data.client);
            });
    }
    const getTeam = () => {
        axios
            .get(`/api/admin/team`, { headers })
            .then((res) => {
                setTotalTeam(res.data.team.data);
            });
    }

    
    const  getSchedule = () =>{
      axios
      .get(`/api/admin/schedule/${sid}`,{ headers })
      .then((res)=>{

        const d = res.data.schedule;
        setTeam( d.team_id ? (d.team_id).toString() : "0");
        setBstatus(d.booking_status);
        setStartDate(Moment(d.start_date).toDate());
        setStartTime(d.start_time);
        setEndTime(d.end_time);
       
      });
    }


    const getEvents = () =>{
       
        const tm = document.querySelector('#team').value;
        axios
        .post(`/api/admin/schedule-events`,{tid:tm},{ headers })
        .then((res)=>{
           setEvents(res.data.events);
        })
        
    }
    
    useEffect(() => {
        getClient();
        getTeam();
        if(sid != ''&& sid != null){
            setTimeout(()=>{
                getSchedule();
            },500)
            setTimeout(()=>{
                getEvents();
            },1000)
        }
        
    }, []);

    const handleUpdate = (e) =>{
        if(sid != ''&& sid != null){
            let data = {};
            
            if(e.target == undefined){
                data.name  = "start_date";
                data.value = e;
            } else {
               data.name  = e.target.name;
               data.value = e.target.value; 
            }
           axios
           .put(`/api/admin/schedule/${sid}`,data,{ headers })
           .then((res)=>{
             alert.success(res.data.message);
             if(res.data.change == 'date'){
                setTimeout(()=>{
                    window.location.reload(true);
                },2000);
             }
           })

        }
        
    }
  
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <h1 className="page-title">Schedule Meeting</h1>
                <div className='dashBox maxWidthControl p-4 sch-meet'>
                    <div className='row'>
                        <div className='col-sm-8'>
                            <h1>{client.firstname + " " + client.lastname}</h1>
                            <ul className='list-unstyled'>
                                <li><i className="fas fa-mobile"></i> {client.phone}</li>
                                <li><i className="fas fa-envelope"></i> {client.email}</li>
                                <li><i className="fas fa-map-marker"></i> {client.city + ", " + client.street_n_no + ", " + client.zipcode}</li>
                            </ul>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group float-right'>
                                <label>Joined On</label>
                                <p>{Moment(client.created_at).format('DD/MM/Y')}</p>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Booking Status</label>
                                <select className='form-control' name="booking_status" id="status"  onChange={(e)=>{setBstatus(e.target.value);handleUpdate(e)}}>
                                    <option value='pending'   selected={bstatus == 'pending'}>Pending</option>
                                    <option value='confirmed' selected={bstatus == 'confirmed'}>Confirmed</option>
                                    <option value='completed' selected={bstatus == 'completed'}>Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='form-group'>
                                <label className='control-label'>Meeting Attender</label>
                                <select className='form-control' name="team_id" id="team" onChange={(e) => {setTeam(e.target.value);handleUpdate(e)}}>
                                    <option value="0">Please Select</option>
                                    {totalTeam && totalTeam.map((t, i) => {
                                        return <option value={t.id} selected={team == t.id}> {t.name} </option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mSchedule'>
                        <h4>Meeting time and date</h4>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label>Date</label>
                                    <DatePicker dateFormat="dd/MM/Y" selected={startDate} onChange={(date) => {setStartDate(date);handleUpdate(date)}} />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label>Start Time</label>
                                    <select name="start_time" id="start_time"  onChange={(e)=>{setStartTime(e.target.value);handleUpdate(e)}} className="form-control">
                                        <option>Choose start time</option>
                                        {time && time.map((t,i)=>{
                                            return (<option value={t} selected={t == startTime}>{t}</option>);
                                        })}
                                       
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className='form-group'>
                                    <label>End Time</label>
                                    <select name="end_time" id="end_time" selected={endTime} onChange={(e)=>{setEndTime(e.target.value);handleUpdate(e)}} className="form-control">
                                        <option>Choose start time</option>
                                        {time && time.map((t,i)=>{
                                            return (<option value={t} selected={t == endTime}>{t}</option>);
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-3'>
                            <button className='btn btn-pink sendBtn' onClick={sendMeeting}>Send meeting</button>
                        </div>
                       
                        <div className='worker-avail'>
                            <h4 className='text-center'>Worker Availability</h4>
                            <FullCalendar
                                defaultView='basicWeek'
                                initialView='timeGridWeek'
                                themeSystem="Simplex"
                                allDay= {false}
                                droppable={true}
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                events={events}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
