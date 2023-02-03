import React from 'react'
import ClientHistory from '../../Components/Clients/ClientHistory'
import ProfileDetails from '../../Components/Clients/ProfileDetails'
import Sidebar from '../../Layouts/Sidebar'

export default function ViewApplicant() {
  return (
    <div id='container'>
        <Sidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">View Client</h1>
                <ProfileDetails/>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <ClientHistory/>
                    </div>
                </div>     
            </div>
        </div>
    </div>
  )
}
