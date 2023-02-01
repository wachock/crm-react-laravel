import React from 'react'
import DashTabs from './Component/Dashboard/DashTabs'
import ClientSidebar from './Layouts/ClientSidebar'


export default function ApplicantDashboard() {
  return (
    <div className='dashboard-applicant'>
      <div className='container'>
        <div className='applicantDash'>
          <div className='row'>
            <div className='col-sm-3'>
              <ClientSidebar/>
            </div>
            <div className='col-sm-9'>
              <DashTabs/>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
