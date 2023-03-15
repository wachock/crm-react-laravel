import React  from 'react'

export default function Services({services,job}) {
  return (
    <>
                    <h2 className="text-custom">Service Details</h2>
                    <div className='dashBox p-4 mb-3'>
                        <form>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                        <label className='control-label'>Services</label>
                                          <p>{services.name}</p>
                                    </div>
                                </div>
                                <div className='col-sm-2'>
                                    <div className='form-group'>
                                        <label className='control-label'>Complete Time</label>
                                                
                                                 <p>{services.job_hour} hours</p>
                                    </div>
                                </div>
                                <div className='col-sm-2'>
                                    <div className='form-group'>
                                        <label className='control-label'>Shift</label>
                                        <p>{job.shifts}</p>
                                    </div>
                                </div>
                                <div className='col-sm-2'>
                                    <div className='form-group'>
                                        <label className='control-label'>Job Status</label>
                                        <p>{job.status}</p>
                                        {(job.status=='cancel')?`(With Cancellatiom fees ${job.rate} ILS)`:''}
                                    </div>
                                </div>
                               
                        </div>
                </form>
            </div>
        </>
 )
}
