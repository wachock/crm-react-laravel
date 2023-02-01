import React from 'react'
import Headline from '../Headline/Headline'
import JobTabs from '../JobTabs/JobTabs'
import ModifyPasswod from '../ModifyPassword/ModifyPasswod'
import MyAccount from '../MyAccount/MyAccount'
import MyAds from '../MyAds/MyAds'
import MyBooking from '../MyBooking/MyBooking'
import Profile from '../Profile/Profile'
import VerifyMyProfile from '../VerifyMyProfile/VerifyMyProfile'

export default function DashTabs() {
  return (
    <div className="tab-content">
        <div className="tab-pane active" id="dashboard" role="tabpanel">
          <Headline/>
          <JobTabs/>
        </div>
        <div className="tab-pane" id="profile" role="tabpanel"><Profile/></div>
        <div className="tab-pane" id="ads" role="tabpanel"><MyAds/></div>
        <div className="tab-pane" id="account" role="tabpanel"><MyAccount/><ModifyPasswod/><VerifyMyProfile/></div>
        <div className="tab-pane" id="booking" role="tabpanel"><MyBooking/></div>
    </div>
  )
}
