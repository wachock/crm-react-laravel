import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Jobs() {
    
    const [jobs,setJobs] = useState([]);
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
            console.log(res);
        });
    }
    useEffect(()=>{
       getJobs();
    },[]);
  return (
    <div className="boxPanel">
        <div className="table-responsive"> 
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
                    <tr>
                        <td>#001</td>
                        <td>Lorem Ipsum Doler</td>
                        <td>Elwyn VonRueden</td>
                        <td>440 NIS</td>
                        <td>October 5, 2022 </td>
                        <td>Completed</td>
                        <td>
                            <div className="d-flex">
                                <Link to={`#`} className="btn bg-purple"><i className="fa fa-edit"></i></Link>
                                <button className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></button>
                                <button className="ml-2 btn bg-red" onClick={() => handleDelete( item.id )}><i className="fa fa-trash"></i></button>                            
                            </div>
                        </td>
                    </tr>      
                </tbody>
            </table>
        </div>
    </div>
  )
}
