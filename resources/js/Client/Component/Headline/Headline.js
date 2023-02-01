import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
export default function Headline() {
  return (
    <div className='hello-note'>
      <div className='row'>
        <div className='col-sm-6'>
          <h2>Hello <span>Alex</span></h2>
          <h4>You have <span>2</span> new offer</h4>
        </div>
        <div className='col-sm-6 text-right'>
          <div className='active-ad'>
            <h3>My Ad</h3>
            <label>Active</label>
            <h6><a href="#">Edit</a></h6>
          </div>
          <div className='applicant-location'>
            <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
          </div> 
        </div>
      </div>  
    </div>
  )
}
