import React  from 'react'

export default function ClientDetails({client}) {
     let address =  (client.city) ? client.city+", " : '';
        address += (client.street_n_no) ? client.street_n_no : '';
        address += (client.zipcode) ? client.zipcode : '';  
    let geo_address = (client.geo_address) ? client.geo_address : "NA";
    let cords   = (client.latitude && client.longitude) ? client.latitude +","+ client.longitude :"";
  return (
    <>
                    <h2 className="text-danger">Client Details</h2>
                    <div className='dashBox p-4 mb-3'>
                        <form>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>Client Name</label>
                                          <p>{client.firstname} {client.lastname}</p>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>Client Email</label>
                                          <p>{client.email}</p>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>Client Phone</label>
                                         <p>{client.phone}</p>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                            <div className='form-group'>
                                                <label>Google address</label>
                                                <p><a href={`https://maps.google.com?q=${ cords}`} target='_blank'>
                                                    {geo_address}</a></p>
                                            </div>
                                        </div>
                                        <div className='col-sm-6'>
                                            <div className='form-group'>
                                                <label>Address</label>
                                                <p>{address}</p>
                                            </div>
                                        </div>
                               
                        </div>
                </form>
            </div>
        </>
 )
}
