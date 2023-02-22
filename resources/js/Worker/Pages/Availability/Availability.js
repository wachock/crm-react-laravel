import React from 'react'
import WorkerAvailabilty from '../../Components/Availability/WorkerAvailabilty'
import WorkerSidebar from '../../Layouts/WorkerSidebar'

export default function Availability() {
  return (
    <div id='container'>
        <WorkerSidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">Schedule</h1>
                <WorkerAvailabilty/>     
            </div>
        </div>
    </div>
  )
}
