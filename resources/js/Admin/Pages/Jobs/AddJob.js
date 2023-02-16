import React, { useState , useEffect} from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import TeamAvailability from '../../Components/TeamAvailability/TeamAvailability';


export default function AddJob() {
    const alert                        = useAlert();
    const navigate                     = useNavigate();
    
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className="edit-customer">
                <h1 className="page-title editJob">Add Job</h1>
                <div id='calendar'></div>
                <div className='card'>
                    <div className='card-body'>
                        <form>     
                            <div className='row'>
                                <div className='col-sm-2'>
                                          <div className='form-group'>
                                            <label>Client</label>
                                            <p>Kulwinder</p>
                                        </div>
                                </div>
                                 <div className='col-sm-2'>
                                          <div className='form-group'>
                                            <label>Services</label>
                                            <p>Office Cleaning,Regular Room Service</p>
                                        </div>
                                </div>
                                <div className='col-sm-2'>
                                          <div className='form-group'>
                                            <label>Frequency</label>
                                            <p>Once a week</p>
                                        </div>
                                </div>
                                 <div className='col-sm-2'>
                                          <div className='form-group'>
                                            <label>Complete Time</label>
                                            <p>2.5 hour</p>
                                        </div>
                                </div>
                                 <div className='col-sm-4'>
                                          <div className='form-group'>
                                            <label>Address</label>
                                            <p>Delhi</p>
                                        </div>
                                </div>
                                <div className='col-sm-12'>
                                    <div className='mt-3 mb-3'>
                                        <h3 className='text-center'>Worker Availability</h3>
                                    </div>
                                </div> 
                                <div className='col-sm-12'>
                                    <TeamAvailability/>
                                    <div className='mb-3'>&nbsp;</div>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
