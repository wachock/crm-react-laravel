import React from 'react'
import Sidebar from '../../Layouts/Sidebar'

export default function Notification() {
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className="page-title">Notifications</h1>
            <div className='notification-page'>
                <div className='card'>
                    <div className='card-body'>
                        <div className="agg-list">
                            <div className="icons"><i className="fas fa-check-circle"></i></div>
                            <div className="agg-text">
                                <h6><a href='#'>John Doe</a> has cancelled the job for <a href='#'>Office Cleaning</a>, <a href='#'>Cleaning after renovation</a>, <a href='#'>Window cleaning</a> service</h6>
                                <p>15 Mar 2023, 02:25 PM</p>
                            </div>
                        </div>

                        <div className="agg-list">
                            <div className="icons"><i className="fas fa-check-circle"></i></div>
                            <div className="agg-text">
                                <h6><a href='#'>John Doe</a> has cancelled the job for <a href='#'>Office Cleaning</a>, <a href='#'>Cleaning after renovation</a>, <a href='#'>Window cleaning</a> service</h6>
                                <p>15 Mar 2023, 02:25 PM</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
