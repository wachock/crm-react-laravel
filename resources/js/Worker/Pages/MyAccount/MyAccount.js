import React from 'react'
import WorkerMyAccount from '../../Auth/WorkerMyAccount'
import Documents from '../../Auth/Documents'
import WorkerSidebar from '../../Layouts/WorkerSidebar'

export default function MyAccount() {
  return (
    <div id='container'>
        <WorkerSidebar/>
        <div id="content">
            <div className='view-applicant'>
                
                 <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation"><a id="worker-availability" className="nav-link active" data-toggle="tab" href="#tab-worker-availability" aria-selected="true" role="tab"><h4>Edit Account</h4></a></li>
            <li className="nav-item" role="presentation"><a id="current-job" className="nav-link" data-toggle="tab" href="#tab-current-job" aria-selected="true" role="tab"><h4>Manage Form</h4></a></li>
        </ul>
        <div className='tab-content' style={{background: "#fff"}}>
             <div id="tab-worker-availability" className="tab-pane active show" role="tab-panel" aria-labelledby="current-job"><WorkerMyAccount/></div>
            <div id="tab-current-job" className="tab-pane" role="tab-panel" aria-labelledby="current-job"><Documents/></div>
        </div>
            </div>
        </div>
    </div>
  )
}
