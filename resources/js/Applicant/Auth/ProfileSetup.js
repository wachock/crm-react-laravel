import React from 'react'
import AboutYou from '../Component/AboutYou'
import YourAd from '../Component/YourAd'
import YourPulses from '../Component/YourPulses'
export default function ProfileSetup() {
  return (
    <div className='setup-profile'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <div id='post-ad'>
                        <h1 className='free-register'>Register for free on Yeliko</h1>
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a id="primary-tab" className="nav-link active" data-toggle="tab" href="#tab-primary" aria-selected="true" role="tab"><span>1</span>About You</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a id="business-tab" className="nav-link" data-toggle="tab" href="#tab-business" aria-selected="false" role="tab"><span>2</span>Your Ad</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a id="media-tab" className="nav-link" data-toggle="tab" href="#tab-media" aria-selected="false" role="tab"><span>3</span>Your Pulses</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="tab-primary" className="tab-pane active show" role="tab-panel" aria-labelledby="primary-tab">
                            <AboutYou/>
                            </div>
                            <div id="tab-business" className="tab-pane" role="tab-panel" aria-labelledby="business-tab">
                            <YourAd/>
                            </div>
                            <div id="tab-media" className="tab-pane" role="tab-panel" aria-labelledby="media-tab">
                            <YourPulses/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </div>
  )
}
