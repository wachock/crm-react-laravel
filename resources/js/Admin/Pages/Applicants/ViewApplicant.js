import React from 'react'
import ApplicantSkills from '../../Components/Applicant/ApplicantSkills'
import ProfileDetails from '../../Components/Applicant/ProfileDetails'
import WorkScenario from '../../Components/Applicant/WorkScenario'
import Sidebar from '../../Layouts/Sidebar'

export default function ViewApplicant() {
  return (
    <div id='container'>
        <Sidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">View Applicant</h1>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a id="profile-tab" className="nav-link active" data-toggle="tab" href="#tab-profile" aria-selected="true" role="tab">Profile Details</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a id="skills-tab" className="nav-link" data-toggle="tab" href="#tab-skills" aria-selected="false" role="tab">Skills</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a id="work-tab" className="nav-link" data-toggle="tab" href="#tab-work" aria-selected="false" role="tab">Work Scenario</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="tab-profile" className="tab-pane active show" role="tab-panel" aria-labelledby="profile-tab">
                        <ProfileDetails/>
                    </div>
                    <div id="tab-skills" className="tab-pane" role="tab-panel" aria-labelledby="skills-tab">
                        <ApplicantSkills/>
                    </div>
                    <div id="tab-work" className="tab-pane" role="tab-panel" aria-labelledby="work-tab">
                        <WorkScenario/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
