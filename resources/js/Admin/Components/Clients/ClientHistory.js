import React from 'react'
import Contract from './Contract'
import Jobs from './Jobs'
import OfferedPrice from './OfferedPrice'
import ScheduledMeeting from './ScheduledMeeting'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
export default function ClientHistory() {
  const params = useParams();
  return (
    <div className='ClientHistory'>
        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation"><a id="schedule-meeting" className="nav-link active" data-toggle="tab" href="#tab-schedule" aria-selected="true" role="tab">Scheduled Meeting</a></li>
            <li className="nav-item" role="presentation"><a id="offered-price" className="nav-link" data-toggle="tab" href="#tab-offered" aria-selected="false" role="tab">Offered Price</a></li>
            <li className="nav-item" role="presentation"><a id="contract" className="nav-link" data-toggle="tab" href="#tab-contract" aria-selected="false" role="tab">Contracts</a></li>
            <li className="nav-item" role="presentation"><a id="jobs-tab" className="nav-link" data-toggle="tab" href="#tab-jobs" aria-selected="false" role="tab">Jobs</a></li>
        </ul>
        <div className='tab-content'>
            <div id="tab-schedule" className="tab-pane active show" role="tab-panel" aria-labelledby="schedule-meeting"><ScheduledMeeting/></div>
            <div id="tab-offered" className="tab-pane" role="tab-panel" aria-labelledby="offered-price"><OfferedPrice/></div>
            <div id="tab-contract" className="tab-pane" role="tab-panel" aria-labelledby="rejected-tab"><Contract/></div>
            <div id="tab-jobs" className="tab-pane" role="tab-panel" aria-labelledby="rejected-tab"><Jobs/></div>
        </div>
        <div className='d-flex button-group1'>
          
          <Link 
          to={`/admin/edit-client/${params.id}`}
          className = "btn bg-pink" 
           >Edit Client
          </Link>

          <Link 
          to={`/admin/add-job`}
          className = "btn bg-yellow" 
           >New Job
          </Link>
  
            <button className="btn bg-green">Price Offered</button>
            <button className="btn bg-red">Contract</button>
            <button className="btn bg-purple">Send Email</button>
        </div>
    </div>
  )
}
