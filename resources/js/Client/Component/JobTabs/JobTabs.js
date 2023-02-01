import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
export default function JobTabs() {
  return (
    <>
    <div className='offered-job'>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a id="offered-tab" className="nav-link active" data-toggle="tab" href="#tab-offered" aria-selected="true" role="tab">All Offered Jobs <span className='counter'>2</span></a>
        </li>
        <li className="nav-item" role="presentation">
          <a id="accepted-tab" className="nav-link" data-toggle="tab" href="#tab-accepted" aria-selected="false" role="tab">Accepted Jobs <span className='counter'>2</span></a>
        </li>
        <li className="nav-item" role="presentation">
          <a id="rejected-tab" className="nav-link" data-toggle="tab" href="#tab-rejected" aria-selected="false" role="tab">Rejected Jobs <span className='counter'>2</span></a>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      <div id="tab-offered" className="tab-pane active show" role="tab-panel" aria-labelledby="offered-tab">
        <div className='all-job'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='offered-title'>
                <h3>Need a elder care</h3>
                <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                <span>2 Weeks ago</span>
              </div>
            </div>
            <div className='col-sm-5'>
              <div className='offer-accept'>
                <div className='d-flex'>
                  <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                </div>
                <div className='weekly-available'>
                  <ul>
                    <li className='disabled'>S</li>
                    <li>M</li>
                    <li>T</li>
                    <li>W</li>
                    <li>T</li>
                    <li className='disabled'>F</li>
                    <li className='disabled'>S</li>
                  </ul>
                </div>
                <div className='button-group'>
                  <a href='#' className='btn btn-white'>Decline</a>
                  <a href='#' className='btn btn-default'>Accept Offer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='all-job'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='offered-title'>
                <h3>Need a elder care</h3>
                <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                <span>2 Weeks ago</span>
              </div>
            </div>
            <div className='col-sm-5'>
              <div className='offer-accept'>
                <div className='d-flex'>
                  <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                </div>
                <div className='weekly-available'>
                  <ul>
                    <li className='disabled'>S</li>
                    <li>M</li>
                    <li>T</li>
                    <li>W</li>
                    <li>T</li>
                    <li className='disabled'>F</li>
                    <li className='disabled'>S</li>
                  </ul>
                </div>
                <div className='button-group'>
                  <a href='#' className='btn btn-white'>Decline</a>
                  <a href='#' className='btn btn-default'>Accept Offer</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="tab-accepted" className="tab-pane" role="tab-panel" aria-labelledby="accepted-tab">
        <div className='all-job'>
            <div className='row'>
              <div className='col-sm-7'>
                <div className='offered-title'>
                  <h3>Need a elder care</h3>
                  <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                  <span>2 Weeks ago</span>
                </div>
              </div>
              <div className='col-sm-5'>
                <div className='offer-accept'>
                  <div className='d-flex'>
                    <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                  </div>
                <div className='weekly-available'>
                  <ul>
                    <li className='disabled'>S</li>
                    <li>M</li>
                    <li>T</li>
                    <li>W</li>
                    <li>T</li>
                    <li className='disabled'>F</li>
                    <li className='disabled'>S</li>
                  </ul>
                </div>
                <div className='button-group'>
                  <a href='#' className='btn btn-white'>More Info</a>
                  <a href='#' className='btn btn-default'>Contact</a>
                </div>
                </div>
              </div>
            </div>
        </div>
        <div className='all-job'>
            <div className='row'>
              <div className='col-sm-7'>
                <div className='offered-title'>
                  <h3>Need a elder care</h3>
                  <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                  <span>2 Weeks ago</span>
                </div>
              </div>
              <div className='col-sm-5'>
                <div className='offer-accept'>
                  <div className='d-flex'>
                    <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                  </div>
                <div className='weekly-available'>
                  <ul>
                    <li className='disabled'>S</li>
                    <li>M</li>
                    <li>T</li>
                    <li>W</li>
                    <li>T</li>
                    <li className='disabled'>F</li>
                    <li className='disabled'>S</li>
                  </ul>
                </div>
                <div className='button-group'>
                  <a href='#' className='btn btn-white'>More Info</a>
                  <a href='#' className='btn btn-default'>Contact</a>
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div id="tab-rejected" className="tab-pane" role="tab-panel" aria-labelledby="rejected-tab">
        <div className='all-job'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='offered-title'>
                <h3>Need a elder care</h3>
                <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                <span>2 Weeks ago</span>
              </div>
            </div>
            <div className='col-sm-5'>
              <div className='offer-accept'>
                <div className='d-flex'>
                  <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                </div>
              <div className='weekly-available'>
                <ul>
                  <li className='disabled'>S</li>
                  <li>M</li>
                  <li>T</li>
                  <li>W</li>
                  <li>T</li>
                  <li className='disabled'>F</li>
                  <li className='disabled'>S</li>
                </ul>
              </div>
              <div className='button-group'>
                <a href='#' className='btn btn-white disabled'>Declined</a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
