import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import WorkerSidebar from '../../Layouts/WorkerSidebar'
import ClientDetails from '../../Components/Job/ClientDetails'
import WorkerDetails from '../../Components/Job/WorkerDetails'
import Services from '../../Components/Job/Services'

export default function WorkerViewJob() {
    const params = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    const [client, setClient] = useState([]);
    const [worker, setWorker] = useState([]);
    const [services, setServices] = useState([]);
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("worker-token"),
    };

    const getJob = () => {
        axios
            .get(`/api/jobs/${params.id}`, { headers })
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
        navigate(`/worker/jobs`);
    }
    return (
        <div id='container'>
            <WorkerSidebar />\
            <div id="content">
                <div className='view-applicant'>
                    <div className='worker-profile'>
                        <div className="row">
                            <div className="col-sm-12">

                                <ClientDetails client={client} />
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
