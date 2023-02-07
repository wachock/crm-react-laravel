import React, { useEffect, useState } from 'react'
import ClientHistory from '../../Components/Clients/ClientHistory'
import ProfileDetails from '../../Components/Clients/ProfileDetails'
import Sidebar from '../../Layouts/Sidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ViewApplicant() {
  const [ client , setClient] = useState([]);
  const param = useParams();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  useEffect(()=>{
    axios
    .get(`/api/admin/clients/${param.id}`,{ headers })
    .then((res)=>{
        setClient(res.data.client);
    });
  },[])
  return (
    <div id='container'>
        <Sidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">View Client</h1>
                <ProfileDetails client={client}/>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <ClientHistory/>
                    </div>
                </div>     
            </div>
        </div>
    </div>
  )
}
