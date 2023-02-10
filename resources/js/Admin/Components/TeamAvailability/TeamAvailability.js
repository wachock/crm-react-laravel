import React,{useState , useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import moment from 'moment-timezone';


export default function TeamAvailability() { 
   const [AllWorkers,setAllWorkers]   = useState([]);
   const [AllJobs,setAllJobs]   = useState([]);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getWorkers = () =>{
        axios
        .get('/api/admin/all-workers',{headers})
        .then((res)=>{
          setAllWorkers(res.data.workers);
        })
     }
     const getJobs = () =>{
        axios
        .get('/api/admin/get-all-jobs',{headers})
        .then((res)=>{
          setAllJobs(res.data.jobs);
        })
     }
      useEffect(()=>{
        getWorkers();
        getJobs();
    },[]);
      
      const resources = AllWorkers.map((w,i)=>{
        return {id:w.id,title:(w.firstname+' '+w.lastname)}; 
    });
    const events = AllJobs.map((j,i)=>{
        return {
          id:j.id,
          title: j.schedule,
          start:moment(j.start_date+' '+j.start_time).toISOString(),
          end:moment(j.start_date+' '+j.end_time).toISOString(),
          resourceId: j.worker_id,
          backgroundColor: '#ff0000',
          borderColor: '#ff0000',
        }; 
    });    
  return (
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin ]}
        initialView = 'resourceTimeGridDay'
        resources =  {resources}
        
        events={events}
    />
  )
}
