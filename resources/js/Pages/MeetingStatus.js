import React from 'react'

export default function MeetingStatus() {
  return (
    <div className='container'>
        <div className='meet-status dashBox maxWidthControl p-4'>
            <h1>Meeting with Jenny</h1>
            <ul className='list-unstyled'>
                <li>Date: <span>22-02-2023</span></li>
                <li>Time: <span>09:00 am to 09:30 am</span></li>
                <li>Service: <span>Glass Cleaning</span></li>
            </ul>
            <div className='cta'>
                <button className='btn btn-danger'>Accept</button>
                <p>If you are not available for this date, please email us and let us know so that we can schedule another date.</p>
                <a className='btn btn-primary' href='mailto:office@broomservice.co.il'>Schedule another date</a>
            </div>
        </div>
    </div>
  )
}
