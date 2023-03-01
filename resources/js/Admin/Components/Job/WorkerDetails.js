import React  from 'react'

export default function WorkerDetails({worker, job}) {

  return (
    <>
                    <h2 className="text-custom">Worker Details</h2>
                    <div className='dashBox p-4 mb-3'>
                        <form>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Worker Name</label>
                                         <p>{worker.firstname} {worker.lastname}</p>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Worker Email</label>
                                          <p>{worker.email}</p>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='form-group'>
                                        <label className='control-label'>Worker Phone</label>
                                       <p>{worker.phone}</p>
                                    </div>
                                </div>
                                <div className='col-sm-8'>
                                    <div className='form-group'>
                                        <label className='control-label'>Address</label>
                                        <p>{worker.address}</p>
                                    </div>
                                </div>
                                {(job.invoice_url) ?
                                <div className='col-sm-2'>
                                    <div className='form-group'>
                                        <a className='btn btn-success' target='_blank' href={job.invoice_url}>view invoice</a>
                                    </div>
                                </div>
                                :''
                                }
                               
                        </div>
                </form>
            </div>
        </>
 )
}
