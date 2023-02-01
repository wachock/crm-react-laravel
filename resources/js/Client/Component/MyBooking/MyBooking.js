import React from 'react'
import Profileimage from '../../../Assets/image/Frontend/profileimage.png';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
export default function MyBooking() {
  return (
    <>
    <div className='ScheduledJob'>
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a id="scheduled-job-tab" className="nav-link active" data-toggle="tab" href="#tab-scheduled-job" aria-selected="true" role="tab">Schedule Jobs <span className='counter'>2</span></a>
        </li>
        <li className="nav-item" role="presentation">
          <a id="completed-job-tab" className="nav-link" data-toggle="tab" href="#tab-completed-job" aria-selected="false" role="tab">Completed Jobs <span className='counter'>2</span></a>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      <div id="tab-scheduled-job" className="tab-pane active show" role="tab-panel" aria-labelledby="scheduled-job-tab">
        <div className='all-job'>
          <div className='row'>
            <div className='col-sm-2'>
              <div className='profileimg text-right'>
                <img src={Profileimage} alt='Profile' className='img-fluid' width={60} height={60} />
              </div>
            </div>
            <div className='col-sm-10'>
              <div className='scheduled-title'>
                <h3>Employer Name</h3>
                <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                <ul className='schedule-details'>
                  <li><FaMapMarkerAlt/><span>8 rue Gouin de, 59280</span></li>
                  <li><FaCalendar/><span>25/01/2023</span></li>
                  <li><FaClock/><span>2:00PM - 4:00PM</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='all-job'>
          <div className='row'>
            <div className='col-sm-2'>
              <div className='profileimg text-right'>
                <img src={Profileimage} alt='Profile' className='img-fluid' width={60} height={60} />
              </div>
            </div>
            <div className='col-sm-10'>
              <div className='scheduled-title'>
                <h3>Employer Name</h3>
                <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                <ul className='schedule-details'>
                  <li><FaMapMarkerAlt/><span>8 rue Gouin de, 59280</span></li>
                  <li><FaCalendar/><span>25/01/2023</span></li>
                  <li><FaClock/><span>2:00PM - 4:00PM</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="tab-completed-job" className="tab-pane" role="tab-panel" aria-labelledby="completed-job-tab">
        <div className='all-job'>
            <div className='row'>
              <div className='col-sm-2'>
                <div className='profileimg text-right'>
                  <img src={Profileimage} alt='Profile' className='img-fluid' width={60} height={60} />
                </div>
              </div>
              <div className='col-sm-10'>
                <div className='scheduled-title'>
                  <h3>Employer Name</h3>
                  <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                  <div className='row'>
                    <div className='col-sm-10'>
                      <ul className='schedule-details'>
                        <li><FaMapMarkerAlt/><span>8 rue Gouin de, 59280</span></li>
                        <li><FaCalendar/><span>25/01/2023</span></li>
                        <li><FaClock/><span>2:00PM - 4:00PM</span></li>
                      </ul>
                    </div>
                    <div className='col-sm-2'>
                      <blockquote>Completed</blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='all-job'>
            <div className='row'>
              <div className='col-sm-2'>
                <div className='profileimg text-right'>
                  <img src={Profileimage} alt='Profile' className='img-fluid' width={60} height={60} />
                </div>
              </div>
              <div className='col-sm-10'>
                <div className='scheduled-title'>
                  <h3>Employer Name</h3>
                  <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.</p>
                  <div className='row'>
                    <div className='col-sm-10'>
                      <ul className='schedule-details'>
                        <li><FaMapMarkerAlt/><span>8 rue Gouin de, 59280</span></li>
                        <li><FaCalendar/><span>25/01/2023</span></li>
                        <li><FaClock/><span>2:00PM - 4:00PM</span></li>
                      </ul>
                    </div>
                    <div className='col-sm-2'>
                      <blockquote>Completed</blockquote>
                    </div>
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
