import React from 'react'
import { useParams,Link } from "react-router-dom";
import CurrentJob from './CurrentJob'
import PastJob from './PastJob'
import WorkerAvailabilty from './WorkerAvailabilty'
import Documents from './Documents'
import WorkerContract from './WorkerContract'

export default function WorkerHistory() {
    const params = useParams();
  return (
    <div className='ClientHistory'>
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation"><a id="worker-availability" className="nav-link active" data-toggle="tab" href="#tab-worker-availability" aria-selected="true" role="tab">Worker Availability</a></li>
            <li className="nav-item" role="presentation"><a id="current-job" className="nav-link" data-toggle="tab" href="#tab-current-job" aria-selected="true" role="tab">Current Job</a></li>
            <li className="nav-item" role="presentation"><a id="past-job" className="nav-link" data-toggle="tab" href="#tab-past-job" aria-selected="false" role="tab">Past Job</a></li>
            <li className="nav-item" role="presentation"><a id="doucments" className="nav-link" data-toggle="tab" href="#tab-doucments" aria-selected="false" role="tab">Form 101</a></li>
            <li className="nav-item" role="presentation"><a id="worker-contract" className="nav-link" data-toggle="tab" href="#tab-worker-contract" aria-selected="false" role="tab">Contract</a></li>
        </ul>
        <div className='tab-content' style={{background: "#fff"}}>
             <div id="tab-worker-availability" className="tab-pane active show" role="tab-panel" aria-labelledby="current-job"><WorkerAvailabilty/></div>
            <div id="tab-current-job" className="tab-pane" role="tab-panel" aria-labelledby="current-job"><CurrentJob/></div>
            <div id="tab-past-job" className="tab-pane" role="tab-panel" aria-labelledby="past-job"><PastJob/></div>
            <div id="tab-doucments" className="tab-pane" role="tab-panel" aria-labelledby="doucments"><Documents/></div>
            <div id="tab-worker-contract" className="tab-pane" role="tab-panel" aria-labelledby="doucments"><WorkerContract/></div>
        </div>
    </div>
  )
}
