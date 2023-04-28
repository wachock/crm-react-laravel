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

    const copy = [...jobs];
    const [order,setOrder] = useState('ASC');
    const sortTable = (e,col) =>{
        
        let n = e.target.nodeName;

        if (n == "TH") {
            let q = e.target.querySelector('span');
            if (q.innerHTML === "↑") {
                q.innerHTML = "↓";
            } else {
                q.innerHTML = "↑";
            }

        } else {
            let q = e.target;
            if (q.innerHTML === "↑") {
                q.innerHTML = "↓";
            } else {
                q.innerHTML = "↑";
            }
        }

        if(order == 'ASC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? 1 : -1));
            setJobs(sortData);
            setOrder('DESC');
        }
        if(order == 'DESC'){
            const sortData = [...copy].sort((a, b) => (a[col] < b[col] ? -1 : 1));
            setJobs(sortData);
            setOrder('ASC');
        }
        
    }

  return (
    <div className="boxPanel">
        <div className="table-responsive">
            { jobs.length >0 ? (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th onClick={(e)=>sortTable(e,'id')} style={{cursor:'pointer'}}>ID <span className='arr'> &darr; </span></th>
                        <th>Service Name</th>
                        <th>Worker Name</th>
                        <th>Total Price</th>
                        <th onClick={(e)=>sortTable(e,'created_at')} style={{cursor:'pointer'}}>Date Created <span className='arr'> &darr; </span></th>
                        <th onClick={(e)=>sortTable(e,'status')} style={{cursor:'pointer'}}>Status <span className='arr'> &darr; </span></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>       
                    { jobs && jobs.map((j,i)=>{
                       // let services = (j.offer.services) ? JSON.parse(j.offer.services) : [];
                        let total = 0;
                      
                        return(
                        <tr>
                            <td>#{j.id}</td>
                            <td>
                                {
                                    
                                    j.jobservice && j.jobservice.map((js,i)=>{
                                     
                                         total += parseInt(js.total);
                                       return (js.name)? js.name+" ":'NA'
                                    })
                                }
                             
                            </td>
                            <td>{
                               j.worker 
                                ? j.worker.firstname 
                                +" "+ j.worker.lastname
                                :"NA" 
                             }</td>
                            <td> {total } ILS + VAT</td>
                            <td>{Moment(j.created_at).format('DD MMM,Y')}</td>
                            <td>{j.status}</td>
                            <td>
                                <div className="d-flex">
                                { (j.worker) ? 
                                    <Link to={`/admin/edit-job/${j.id}`} className="btn bg-purple"><i className="fa fa-edit"></i></Link>
                                    :<Link to={`/admin/create-job/${j.contract_id}`} className="btn bg-purple"><i className="fa fa-edit"></i></Link>
                                }
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
