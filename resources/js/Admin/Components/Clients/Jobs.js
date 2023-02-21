import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Moment from 'moment';

export default function Jobs() {
    
    const [jobs,setJobs] = useState([]);
    const [loading , setLoading] = useState("Loading...");
    const params = useParams();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const getJobs = () =>{
        axios
        .post(`/api/admin/get-client-jobs`,{cid:params.id},{headers})
        .then((res)=>{
            (res.data.jobs.length >0) ?
            setJobs(res.data.jobs)
            :setLoading('No job found');
        });
    }
    useEffect(()=>{
       getJobs();
    },[]);
  return (
    <div className="boxPanel">
        <div className="table-responsive">
            { jobs.length >0 ? (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Worker Name</th>
                        <th>Total Price</th>
                        <th>Date Created</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>       
                    { jobs && jobs.map((j,i)=>{
                        let services = (j.offer.services) ? JSON.parse(j.offer.services) : [];
                        console.log(services)
                        return(
                        <tr>
                            <td>#{j.job_id}</td>
                            <td>{
                               services && services.map((s,i)=>{
                                return(
                                (services.length) -1 != i ?
                                 s.name+" | "
                                 :s.name
                                )
                               })
                            }
                            </td>
                            <td>{
                               j.worker 
                                ? j.worker.firstname 
                                +" "+ j.worker.lastname
                                :"NA" 
                             }</td>
                            <td>{j.offer.subtotal} ILS + VAT</td>
                            <td>{Moment(j.created_at).format('DD MMM,Y')}</td>
                            <td>{j.status}</td>
                            <td>
                                <div className="d-flex">
                                    <Link to={`/admin/edit-job/${j.id}`} className="btn bg-purple"><i className="fa fa-edit"></i></Link>
                                    <Link to={`/admin/view-job/${j.id}`} className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></Link>
                                    <button className="ml-2 btn bg-red" onClick={() => handleDelete( j.id )}><i className="fa fa-trash"></i></button>                            
                                </div>
                            </td>
                        </tr>    
                        )
                    })}
                      
                </tbody>
            </table>
            )
            :
            (
                <div className='form-control text-center'>{loading}</div>
            )
            }
        </div>
    </div>
  )
}
