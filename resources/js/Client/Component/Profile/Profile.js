import React from 'react'
import AchievableTask from '../../../Employer/Components/ApplicantDetails/AchievableTask'
import Availability from '../../../Employer/Components/ApplicantDetails/Availability'
import Description from '../../../Employer/Components/ApplicantDetails/Description'
import Experience from '../../../Employer/Components/ApplicantDetails/Experience'
import Map from '../../../Employer/Components/ApplicantDetails/Map'
import ProfileInfo from '../../../Employer/Components/ApplicantDetails/ProfileInfo'
import ProposedServices from '../../../Employer/Components/ApplicantDetails/ProposedServices'
import Reviews from '../../../Employer/Components/ApplicantDetails/Reviews'
import SpokenLanguages from '../../../Employer/Components/ApplicantDetails/SpokenLanguages'

export default function Profile() {
  return (
    <div className='applicant-profile'>
      <ProfileInfo/>
      <Description/>
      <ProposedServices/>
      <AchievableTask/>
      <SpokenLanguages/>
      <Availability/>
      <Reviews/>
      <Experience/>
      <Map/>
    </div>
  )
}
