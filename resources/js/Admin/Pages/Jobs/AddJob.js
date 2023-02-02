import React, { useState , useEffect} from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';


export default function AddJob() {
    const [service, setService] = useState('');
    const [client, setClient] = useState('');
    const [worker, setWorker] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [rate, setRate] = useState('');
    const [instruction,setInstruction] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');

    const [AllClients,setAllClients] = useState([]);
    const [AllServices,setAllServices] = useState([]);
    const [AllWorkers,setAllWorkers] = useState([]);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const applicantData = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
        item => ({ label: item, value: item })
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            job_id:service,
            client_id:client,
            worker_id:worker,
            start_date:startDate,
            start_time:startTime,
            end_time:endTime,
            rate:rate,
            instruction:instruction,
            address:address,
            status:status
        };
        console.log(data);
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
    
    useEffect(()=>{
        getClients();
        getServices();
        getWorkers();
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

  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="edit-customer">
                <h1 className="page-title editJob">Add Job</h1>
                <div className='card'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                        
                            <div className="form-group">
                                <label className="control-label">Client Name</label>
                                <SelectPicker data={cData} value={client} onChange={(value,event)=>setClient(value)} size="lg" required/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Worker Name</label>
                                <SelectPicker data={wData} value={worker} onChange={(value,event)=>setWorker(value)} size="lg" required/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Service Name</label>
                                <SelectPicker data={sData} value={service} onChange={(value,event)=>setService(value)} size="lg" required/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Instruction</label>
                                <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} className="form-control" placeholder="Instruction"/>
                            </div>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <div className="form-group">
                                        <label className="control-label">Start Date</label>
                                        <input type="date" value={startDate} required onChange={(e) => setStartDate(e.target.value)} className='form-control' placeholder="Job Title"/>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className="form-group">
                                        <label className="control-label">Start Time</label>
                                        <input type="time" value={startTime} required onChange={(e) => setStartTime(e.target.value)} className='form-control' placeholder="Job Title"/>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className="form-group">
                                        <label className="control-label">End Time</label>
                                        <input type="time" value={endTime} required onChange={(e) => setEndTime(e.target.value)} className='form-control' placeholder="Job Title"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Area/Location *</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Complete Address"/>
                            </div> 
                            <div className="form-group">
                                <label className="control-label">Status</label>
                                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option>Please Select</option>
                                    <option value="1">Enable</option>
                                    <option value="0">Disable</option>
                                </select>
                            </div>
                            <div className="form-group text-right">
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
