import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar'
import ClientDetails from '../../Components/Job/ClientDetails'
import WorkerDetails from '../../Components/Job/WorkerDetails'
import Services from '../../Components/Job/Services'

export default function ViewJob() {
    const params = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [client, setClient] = useState([]);
    const [worker, setWorker] = useState([]);
    const [services, setServices] = useState([]);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getJob = () => {
        axios
            .get(`/api/admin/jobs/${params.id}`, { headers })
            .then((res) => {
                const r = res.data.job;
                setJob(r)
                setClient(r.client);
                setWorker(r.worker);
                setServices(JSON.parse(r.offer.services));
            });
    }
    useEffect(() => {
        getJob();
    }, []);
    const handleClick = () => {
        navigate(`/admin/jobs?q=scheduled`);
    }
    return (
        <div id='container'>
            <Sidebar />
            <div id="content">
                <div className='view-applicant'>
                    <div className='worker-profile'>
                        <div className="row">
                            <div className="col-sm-6">

                                <ClientDetails client={client} />
                            </div>
                            <div className="col-sm-6">
                                <WorkerDetails worker={worker} />
                            </div>
                            <div className="col-sm-12">
                                <Services services={services} job={job} />

                            </div>
                            <div className="col-sm-12 text-center">
                                <button type="button" onClick={handleClick} className="btn btn-pink addButton">
                                    Back
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
