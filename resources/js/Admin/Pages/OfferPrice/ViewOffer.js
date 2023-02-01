import React from 'react'
import Sidebar from '../../Layouts/Sidebar'
import logo from "../../../Assets/image/logo.png";
export default function ViewOffer() {
  return (
    <div id="container">
      <Sidebar/>
      <div id='content'>
        <div className="AddOffer">
          <h1 className="page-title addEmployer">View Offer</h1>
          <div className='card'>
            <div className='card-body'>
              <div className='ViewOffer'>
                <img src={logo} className="img-fluid" alt="Logo" />
                <div className='row'>
                  <div className='col-sm-5'>
                    <h2>Broom Service</h2>
                    <p>4 Ashlinn House,College Squar</p>
                    <p>Florida, USA</p>
                    <p>Phone: <span>0872992300</span></p>
                    <p>Email: <span>info@yourcompany.com</span></p>
                  </div>
                  <div className='col-sm-4'>
                    <h2>To</h2>
                    <p>Martin Doe</p>
                    <p>15A Hebron Business Park</p>
                    <p>New York, Florida</p>
                    <p>Phone: <span>353872992300</span></p>
                    <p>Email: <span>martindoe@gmail.com</span></p>
                  </div>
                  <div className='col-sm-3 text-right'>
                    <h2>Offer Price</h2>
                    <p><b>Offer Id: </b><span> 0001</span></p>
                    <p><b>Date: </b><span> October 5, 2022</span></p>
                    <div className='sent-status'>
                      <p>Sent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
