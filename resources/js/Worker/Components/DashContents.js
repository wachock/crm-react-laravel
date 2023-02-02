import React from 'react'
import TabAccount from './TabAccount'
import TabCandidate from './TabCandidate'
import TabDashboard from './TabDashboard'
import TabPassword from './TabPassword'
import TabUpgradePlan from './TabUpgradePlan'
    
    export default function DashContents() {
      return (
        <div className="tab-content">
            <div className="tab-pane active" id="dashboard" role="tabpanel">
                <TabDashboard/>
            </div>
            <div className="tab-pane" id="candidate" role="tabpanel">
              <TabCandidate/>
            </div>
            <div className="tab-pane" id="account" role="tabpanel">
              <TabAccount/><TabPassword/>
            </div>
            
            <div className="tab-pane" id="plan" role="tabpanel"><TabUpgradePlan/></div>
        </div>
      )
    }
    