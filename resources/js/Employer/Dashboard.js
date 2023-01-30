
import React from 'react'
import DashContents from './Components/DashContents'
import EmployeeSidebar from './Layouts/EmployeeSidebar'

export default function EmployerDashboard() {
  return (
    <div className='EmployerDashboard'>
      <div className='container'>
        <div className='employerDash'>
          <div className='row'>
            <div className='col-sm-3'>
              <EmployeeSidebar/>
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
