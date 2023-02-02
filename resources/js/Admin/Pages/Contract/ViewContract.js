import React from 'react'
import Sidebar from '../../Layouts/Sidebar'
import logo from "../../../Assets/image/logo.png";
import Dropdown from 'react-bootstrap/Dropdown';

export default function ViewContract() {
  return (
    <div id="container">
      <Sidebar/>
      <div id='content'>
        <div className="AddOffer">
          <h1 className="page-title addEmployer">View Contract</h1>
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
                    <h2>Contract</h2>
                    <p><b>Offer Id: </b><span> 0001</span></p>
                    <p><b>Date: </b><span> October 5, 2022</span></p>
                    <div className='sent-status'>
                      <p>Sent</p>
                    </div>
                  </div>
                </div>
                <div className="card card-dark">
                  <div className="card-header card-black">
                    <h3 class="card-title">Line Items</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table class="table table-sm">
                        <thead>
                          <tr>
                            <th style={{width:"30%"}}>Services</th>
                            <th className='text-right'>Start Time</th>
                            <th className='text-right'>End Time</th>
                            <th className='text-right'>Rate Per Hour</th>
                            <th className='text-right'>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Garden grass cutting</td>
                            <td className='text-right'>10:15 AM</td>
                            <td className='text-right'>12:45 PM</td>
                            <td className='text-right'>200 NIS</td>
                            <td className='text-right'>440 NIS</td>
                          </tr>
                          <tr>
                            <td>Garden grass cutting</td>
                            <td className='text-right'>10:15 AM</td>
                            <td className='text-right'>12:45 PM</td>
                            <td className='text-right'>200 NIS</td>
                            <td className='text-right'>440 NIS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className='row'>
                      <div className='col-sm-6'></div>
                      <div className='col-sm-6'>
                        <div className="table-responsive">
                          <table class="table table-sm table-bordered ">
                            <thead>
                              <tr>
                                <td width="65%" class="text-right">Subtotal</td>
                                <td class="text-right"><span>440.00 </span>NIS</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td width="65%" class="text-right">Total Tax</td>
                                <td class="text-right"><span>0.00 </span>NIS</td> 
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td width="65%" class="text-right">Total Tax</td>
                                <td class="text-right"><span>0.00 </span>NIS</td> 
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Dropdown className='text-right'>
                  <Dropdown.Toggle className='btn-pink' id="dropdown-basic">Acton</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#">Download PDF</Dropdown.Item>
                    <Dropdown.Item href="#">Send as Email</Dropdown.Item>
                    <Dropdown.Item href="#">Print</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
