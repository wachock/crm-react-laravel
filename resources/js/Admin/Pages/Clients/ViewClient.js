import React, { useEffect, useState } from 'react'
import ClientHistory from '../../Components/Clients/ClientHistory'
import ProfileDetails from '../../Components/Clients/ProfileDetails'
import Sidebar from '../../Layouts/Sidebar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function ViewClient() {

  const [client, setClient] = useState([]);
  const [scheduleStatus, setSchedulesStatus] = useState([]);
  const [offerStatus, setOfferStatus] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [latestContract, setLatestContract] = useState([]);

  const param = useParams();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  const getLatestSchedule = () => {
    axios
      .post(`/api/admin/latest-client-schedule`, { id: param.id }, { headers })
      .then((res) => {
        setSchedulesStatus(res.data.latestSchedule.booking_status);
      });
  }

  const getLatestOffer = () => {
    axios
      .post(`/api/admin/latest-client-offer`, { id: param.id }, { headers })
      .then((res) => {
        setOfferStatus(res.data.latestOffer.status);
      });
  }

  const getClient = () => {
    axios
      .get(`/api/admin/clients/${param.id}`, { headers })
      .then((res) => {
        setClient(res.data.client);
      });
  }

  const getContract = () => {
    axios
      .post(`/api/admin/client-contracts`, { id: param.id }, { headers })
      .then((res) => {
        setContracts(res.data.contracts.data);
        setLatestContract(res.data.latest);
      })
  }

  useEffect(() => {
    getClient();
    getLatestSchedule();
    getLatestOffer();
    getContract();
  }, [])
 
  return (
    <div id='container'>
      <Sidebar />
      <div id="content">
        <div className='view-applicant'>
          <h1 className="page-title viewAppli">View Client</h1>
          <ProfileDetails
            client={client}
            offerStatus={offerStatus}
            scheduleStatus={scheduleStatus}
            latestContract={latestContract}
          />
          <div className='card mt-3'>
            <div className='card-body'>
              <ClientHistory
                contracts={contracts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
