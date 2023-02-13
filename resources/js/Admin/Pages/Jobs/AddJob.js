import React, { useState , useEffect} from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import TeamAvailability from '../../Components/TeamAvailability/TeamAvailability';


export default function AddJob() {
    const alert                        = useAlert();
    const navigate                     = useNavigate();
    const [service, setService]        = useState('');
    const [client, setClient]          = useState('');
    const [worker, setWorker]          = useState('');
    const [startDate, setStartDate]    = useState('');
    const [endDate, setEndDate]        = useState('');
    const [startTime, setStartTime]    = useState('');
    const [endTime, setEndTime]        = useState('');
    const [rate, setRate]              = useState('');
    const [instruction,setInstruction] = useState('');
    const [address, setAddress]        = useState('');
    const [status, setStatus]          = useState('');
    const [schedule, setSchedule]   = useState('');

    const [AllClients,setAllClients]   = useState([]);
    const [AllServices,setAllServices] = useState([]);
    const [AllWorkers,setAllWorkers]   = useState([]);
    const [AllSchedules,setAllSchedules]   = useState([]);
    
    
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            client_id:client,
            worker_id:worker,
            start_date:startDate,
            start_time:startTime,
            end_time:endTime,
            schedule:schedule,
            status:status
        };
        axios
        .post(`/api/admin/jobs`,data,{headers})
        .then((res)=>{
            if(res.data.error){
                for (let e in res.data.error){
                    alert.error(res.data.error[e]);
                }
                } else {
                alert.success(res.data.message);
                setTimeout(()=>{
                    navigate('/admin/jobs');
                },1000);
                
                }
        });
    }

    const getClients = () =>{
       axios
       .get('/api/admin/all-clients',{headers})
       .then((res)=>{
         setAllClients(res.data.clients);
       })
       
    }

    const getServices = () =>{
        axios
        .get('/api/admin/all-services',{headers})
        .then((res)=>{
          setAllServices(res.data.services);
        })
     }

     const getWorkers = () =>{
        axios
        .get('/api/admin/all-workers',{headers})
        .then((res)=>{
          setAllWorkers(res.data.workers);
        })
     }
    
     const getSchedule = () =>{
        axios
        .get('/api/admin/all-service-schedule',{headers})
        .then((res)=>{
            setAllSchedules(res.data.schedules);
        })
     }
    useEffect(()=>{
        getClients();
        getServices();
        getWorkers();
        getSchedule();
    },[]);
    
    const cData = AllClients.map((c,i)=>{
       return {value:c.id,label:(c.firstname+' '+c.lastname)}; 
    });
    const sData = AllServices.map((s,i)=>{
        return {value:s.id,label:(s.name)}; 
    });
    const wData = AllWorkers.map((w,i)=>{
        return {value:w.id,label:(w.firstname+' '+w.lastname)}; 
    });
    const scData = AllSchedules.map((sc,i)=>{
        return {value:sc.id,label:sc.name}; 
    });
    const time =[
                ["08:00","08:00 AM"],
                ["08:30","08:30 AM"],
                ["09:00","09:00 AM"],
                ["09:30","09:30 AM"],
                ["10:00","10:00 AM"],
                ["10:30","10:30 AM"],
                ["11:00","11:00 AM"],
                ["11:30","11:30 AM"],
                ["12:00","12:00 PM"],
                ["12:30","12:30 PM"],
                ["13:00","01:00 PM"],
                ["13:30","01:30 PM"],
                ["14:00","02:00 PM"],
                ["14:30","02:30 PM"],
                ["15:00","03:00 PM"],
                ["15:30","03:30 PM"],
                ["16:00","04:00 PM"],
                ["16:30","04:30 PM"],
                ["17:00","05:00 PM"],
                ["17:30","05:30 PM"],
                ["18:00","06:00 PM"],
                ["18:30","06:30 PM"],
                ["19:00","07:00 PM"],
                ["19:30","07:30 PM"],
                ["20:00","08:00 PM"],
                ["20:30","08:30 PM"],
                ["21:00","09:00 PM"],
                ["21:30","09:30 PM"],
                ["22:00","10:00 PM"],
                ["22:30","10:30 PM"],
                ["23:00","11:00 PM"],
                ["23:30","11:30 PM"],
                ["00:00","12:00 AM"],
            ];
    
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="edit-customer">
                <h1 className="page-title editJob">Add Job</h1>
                <div id='calendar'></div>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>     
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-group">
                                        <label className="control-label">Client Name</label>
                                        <SelectPicker data={cData} value={client} onChange={(value,event)=>setClient(value)} size="lg" required/>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-group">
                                        <label className="control-label">Worker Name</label>
                                        <SelectPicker data={wData} value={worker} onChange={(value,event)=>setWorker(value)} size="lg" required/>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <div className='mt-3 mb-3'>
                                        <h3 className='text-center'>Worker Availability</h3>
                                    </div>
                                </div> 
                                <div className='col-sm-12'>
                                    <TeamAvailability/>
                                    <div className='mb-3'>&nbsp;</div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label className="control-label">Start Date</label>
                                        <input type="date" value={startDate} required onChange={(e) => setStartDate(e.target.value)} className='form-control' />
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                     <div className='form-group'>
                                    <label>Start Time</label>
                                    <select name="start_time" id="start_time"  onChange={(e)=>{setStartTime(e.target.value)}} className="form-control">
                                        <option>Choose start time</option>
                                        {time && time.map((t,i)=>{
                                            return (<option value={t[0]} selected={t[0] == startTime}>{t[1]}</option>);
                                        })}
                                       
                                    </select>
                                </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                    <label>End Time</label>
                                    <select name="end_time" id="end_time" selected={endTime} onChange={(e)=>{setEndTime(e.target.value)}} className="form-control">
                                        <option>Choose end time</option>
                                        {time && time.map((t,i)=>{
                                            return (<option value={t[0]} selected={t[0] == endTime}>{t[1]}</option>);
                                        })}
                                    </select>
                                </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className="form-group">
                                        <label className="control-label">Status</label>
                                        <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option>Please Select</option>
                                            <option value="not-started">Not Started</option>
                                            <option value="progress">Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <input type='submit' value='Save and Send' onClick={handleSubmit} className="btn btn-pink saveBtn"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
