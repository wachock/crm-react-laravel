import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../Layouts/ClientSidebar'
import WorkerDetails from '../../Component/Job/WorkerDetails'
import Services from '../../Component/Job/Services'
import Comment from '../../Component/Job/Comment'

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
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const getJob = () => {
        axios
            .post(`/api/client/view-job`,{id:params.id}, { headers })
            .then((res) => {
                const r = res.data.job[0];
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
        navigate(`/client/jobs`);
    }
    return (
        <div id='container'>
            <Sidebar />
            <div id="content">
                <div className='view-applicant'>
                    <div className='worker-profile'>
                        <div className="row">
                            <div className="col-sm-12">
                                <WorkerDetails worker={worker} />
                            </div>
                            <div className="col-sm-12">
                                <Services services={services} job={job} />
                                <Comment />

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
