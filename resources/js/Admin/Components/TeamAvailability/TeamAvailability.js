import React,{useState , useEffect} from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import {resourceTimeGridPlugin} from '@fullcalendar/resource-timegrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction';
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
        .get('/api/admin/all-workers?filter=true',{headers})
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
          title: 'Busy',
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
          title: 'Available',
          start:moment(wa.date+' '+wa.start_time).toISOString(),
          end:moment(wa.date+' '+wa.end_time).toISOString(),
          resourceId: wa.worker_id,
          textColor: wa.worker_id+'_'+wa.name,
          backgroundColor: '#00FF00',
          borderColor: '#00FF00',
        }; 
    });  
     Array.prototype.push.apply(events,events1);

    const contracts = {
        client_id :1,
        client_name:'Kulwinder',
        services:'Office Cleaning,Regular Room Service',
        frequency:'once a week',
        hours:2.5,

    }
     
     const [data,setData]=useState({client_id:contracts.client_id,
                                    client_name:contracts.client_name,
                                    services:contracts.services,
                                    frequency:contracts.frequency,
                                    hours:contracts.hours,
                                     worker_id:'',
                                     date:'',
                                     start_time:'',
                                     end_time:'',
                                     status:'not-started',
                                 });
     const handleEventClick = (e) =>{
           let str=e.startStr;
            var parts = str.slice(0, -9).split('T');
            var dateComponent = parts[0];
            var timeComponent = parts[1];
            var endtime = moment(parts[0]+' '+parts[1]).add(contracts.hours, 'hours').format('HH:mm');

            const str1 = e.textColor;
            var parts1 = str1.split('_');

            var newdata = data;
            newdata.worker_id=parts1[0];
            newdata.date=dateComponent;
            newdata.start_time=timeComponent;
            newdata.end_time=endtime;
            document.getElementById('d_worker_name').innerHTML=parts1[1];
            document.getElementById('d_date').innerHTML=dateComponent;
            document.getElementById('d_start_time').innerHTML=timeComponent;
            document.getElementById('d_end_time').innerHTML=endtime;
            setData(newdata);
     }
    console.log(data);

  return (
    <>
    <FullCalendar
        selectable= {true}
        plugins={[dayGridPlugin, timeGridPlugin,resourceTimelinePlugin,interactionPlugin  ]}
        initialView = 'resourceTimelineWeek'
        resources =  {resources}
        height={'auto'} // sets height to height of resources.
        slotDuration={'00:30:00'}
        events={events}
        resourceAreaWidth= {"15%"}
        slotMinTime={'08:00'} // start timeline at this time, must be in format '08:00'
        slotMaxTime={'24:00'}
        allDaySlot= {false}
        eventClick= {function(info) {
                    // alert('Event: ' + info.event.textColor);
                    // console.log(info.event);
                    handleEventClick(info.event);
                    info.el.style.borderColor = 'red';
                  } }
    />  
    <div className="form-group text-center">
        <input type='button' value='View Job' className="btn btn-pink" data-toggle="modal" data-target="#exampleModal"/>
    </div> 
     <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Job</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                            client Name
                                            <p> {data.client_name}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Services
                                            <p> {data.services}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Frequency
                                            <p> {data.frequency}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Hours
                                            <p> {data.hours} hours</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                 <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Worker Name
                                            <p id="d_worker_name"> {data.worker_id}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Date
                                            <p id="d_date"> {data.date}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Start Time
                                            <p id="d_start_time"> {data.start_time}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              End Time
                                            <p id="d_end_time"> {data.end_time}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label className="control-label">
                                              Status
                                            <p > {data.status}</p>
                                        </label>
                                       

                                    </div>
                                </div>
                                
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb" data-dismiss="modal">Close</button>
                            <button type="button"  className="btn btn-primary">Save and Send</button>
                        </div>
                    </div>
                </div>
            </div>
    </>    
  )
}
