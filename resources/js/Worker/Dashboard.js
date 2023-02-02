
import React from 'react'
import DashContents from './Components/DashContents'
import WorkerSidebar from './Layouts/WorkerSidebar'

export default function WorkerDashboard() {
  return (
    <div className='WorkerDashboard'>
      <div className='container'>
        <div className='employerDash'>
          <div className='row'>
            <div className='col-sm-3'>
              <WorkerSidebar/>
            </div>
            <div className='col-sm-9'>
              <DashContents/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
