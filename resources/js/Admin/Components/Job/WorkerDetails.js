import React  from 'react'

export default function WorkerDetails({worker}) {
  return (
    <>
                    <h2 className="text-danger">Worker Details</h2>
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
                               
                        </div>
                </form>
            </div>
        </>
 )
}
