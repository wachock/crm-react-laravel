import React from 'react'
import CurrentJob from './CurrentJob'
import PastJob from './PastJob'

export default function WorkerHistory() {
  return (
    <div className='ClientHistory'>
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation"><a id="current-job" className="nav-link active" data-toggle="tab" href="#tab-current-job" aria-selected="true" role="tab">Current Job</a></li>
            <li className="nav-item" role="presentation"><a id="past-job" className="nav-link" data-toggle="tab" href="#tab-past-job" aria-selected="false" role="tab">Past Job</a></li>
        </ul>
        <div className='tab-content'>
            <div id="tab-current-job" className="tab-pane active show" role="tab-panel" aria-labelledby="current-job"><CurrentJob/></div>
            <div id="tab-past-job" className="tab-pane" role="tab-panel" aria-labelledby="past-job"><PastJob/></div>
        </div>
        <div className='button-group'>
            <button className="btn bg-pink">Edit Worker</button>
            <button className="btn bg-yellow">New Job</button>
            <button className="btn bg-purple">Send Email</button>
        </div>
    </div>
  )
}
