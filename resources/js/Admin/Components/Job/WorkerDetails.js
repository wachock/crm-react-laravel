import React  from 'react'
import { Base64 } from 'js-base64'

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
                                {
                                (job.order != null) && <div className='col-sm-8'>
                                    <div className='form-group'>
                                        <label className='control-label'>Order Status</label>
                                        <p style={ {color:"green","font-size":"17px"} }><b>{job.order.status}</b></p>
                                    </div>
                                </div>
                                }
                                <div className='col-sm-2'>
                                    <div className='form-group'>
                                    {
                                (job.order != null) &&
                              
                                 <a className='btn btn-warning mb-2' target='_blank' href={job.order.doc_url}>view Order</a>
                                }
                                {
                                (job.invoice_url) &&
                              
                                 <a className='btn btn-success' target='_blank' href={job.invoice_url}>view invoice</a>
                                }
                                 </div>
                                </div>
                               
                        </div>
                </form>
            </div>
        </>
 )
}
