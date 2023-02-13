import React,{useState , useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import moment from 'moment-timezone';


export default function TeamAvailability() { 
   const [AllWorkers,setAllWorkers]   = useState([]);
   const [AllJobs,setAllJobs]   = useState([]);
   const [AllWorkerAvailability,setAllWorkerAvailability]   = useState([]);
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
     const getWorkerAvailabilty = () =>{
        axios
        .get('/api/admin/all-workers/availability',{headers})
        .then((res)=>{
          setAllWorkerAvailability(res.data.availability);
        })
     }
      useEffect(()=>{
        getWorkers();
        getJobs();
        getWorkerAvailabilty();
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
     const events1 = AllWorkerAvailability.map((wa,i)=>{
        return {
          id:wa.id,
          title: '',
          start:moment(wa.date+' '+wa.start_time).toISOString(),
          end:moment(wa.date+' '+wa.end_time).toISOString(),
          resourceId: wa.worker_id,
          backgroundColor: '#00FF00',
          borderColor: '#00FF00',
        }; 
    });  
     Array.prototype.push.apply(events,events1);
  return (
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin ]}
        initialView = 'resourceTimeGridDay'
        resources =  {resources}
        height={'auto'} // sets height to height of resources.
        slotDuration={'02:00:00'}
        events={events}
        slotMinTime={'08:00'} // start timeline at this time, must be in format '08:00'
        slotMaxTime={'24:00'}
    />
  )
}
