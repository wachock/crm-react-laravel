import React from 'react'
import WorkerHistory from '../../Components/Workers/WorkerHistory'
import WorkerProfile from '../../Components/Workers/WorkerProfile'
import Sidebar from '../../Layouts/Sidebar'

export default function ViewWorker() {
  return (
    <div id='container'>
        <Sidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">View Worker</h1>
                <WorkerProfile/>
                <WorkerHistory/>     
            </div>
        </div>
    </div>
  )
}
