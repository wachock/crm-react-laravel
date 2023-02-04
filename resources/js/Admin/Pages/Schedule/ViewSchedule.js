import React, { useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import events from './events'

export default function ViewSchedule() {      
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className="page-title">Schedule Meeting</h1>
            <div className='dashBox maxWidthControl p-4 sch-meet'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <h1>Sohrab Khan</h1>
                        <ul className='list-unstyled'>
                            <li><i className="fas fa-mobile"></i> +1 344890012</li>
                            <li><i className="fas fa-envelope"></i> itsmsohrabkhan@gmail.com</li>
                            <li><i className="fas fa-map-marker"></i> 58, Park Avenue, Galaxy Apartments, NSW</li>
                        </ul>
                    </div>
                    <div className='col-sm-4'>
                        <div className='form-group float-right'>
                            <label>Joined On</label>
                            <p>25/12/2022</p>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label className='control-label'>Booking Status</label>
                            <select className='form-control'>
                                <option>Please Select</option>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='form-group'>
                            <label className='control-label'>Team</label>
                            <select className='form-control'>
                                <option>Please Select</option>
                                <option>Jeniffer</option>
                                <option>Louis</option>
                                <option>Liza</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='mSchedule'>
                    <h4>Meeting time and date</h4>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label>Date</label>
                                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div> 
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label>Start Time</label>
                                <select name="start_time" id="start_time" className="form-control">
                                    <option>Choose start time</option>
                                    <option value="09:00:00" selected="">09:00:00</option>
                                    <option value="09:30:00">09:30:00</option>
                                    <option value="10:00:00">10:00:00</option>
                                    <option value="10:30:00">10:30:00</option>
                                    <option value="11:00:00">11:00:00</option>
                                    <option value="11:30:00">11:30:00</option>
                                    <option value="12:00:00">12:00:00</option>
                                    <option value="12:30:00">12:30:00</option>
                                    <option value="13:00:00">13:00:00</option>
                                    <option value="13:30:00">13:30:00</option>
                                    <option value="14:00:00">14:00:00</option>
                                    <option value="14:30:00">14:30:00</option>
                                    <option value="15:00:00">15:00:00</option>
                                    <option value="15:30:00">15:30:00</option>
                                    <option value="16:00:00">16:00:00</option>
                                    <option value="16:30:00">16:30:00</option>
                                    <option value="17:00:00">17:00:00</option>
                                    <option value="17:30:00">17:30:00</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='form-group'>
                                <label>End Time</label>
                                <select name="start_time" id="start_time" className="form-control">
                                    <option>Choose start time</option>
                                    <option value="09:30:00">09:30:00</option>
                                    <option value="10:00:00">10:00:00</option>
                                    <option value="10:30:00">10:30:00</option>
                                    <option value="11:00:00">11:00:00</option>
                                    <option value="11:30:00">11:30:00</option>
                                    <option value="12:00:00">12:00:00</option>
                                    <option value="12:30:00">12:30:00</option>
                                    <option value="13:00:00">13:00:00</option>
                                    <option value="13:30:00">13:30:00</option>
                                    <option value="14:00:00">14:00:00</option>
                                    <option value="14:30:00">14:30:00</option>
                                    <option value="15:00:00">15:00:00</option>
                                    <option value="15:30:00">15:30:00</option>
                                    <option value="16:00:00">16:00:00</option>
                                    <option value="16:30:00">16:30:00</option>
                                    <option value="17:00:00">17:00:00</option>
                                    <option value="17:30:00">17:30:00</option>
                                    <option value="18:00:00">18:00:00</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-3'>
                        <button className='btn btn-pink'>Send meeting</button>
                    </div>
                    <div className='worker-avail'>
                        <h4 className='text-center'>Worker Availability</h4>
                        <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        themeSystem="Simplex"
                        plugins={[dayGridPlugin]}
                        events={events}
                    />
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
