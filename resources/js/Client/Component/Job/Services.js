import React  from 'react'
import { useTranslation } from 'react-i18next'
export default function Services({services,job}) {
    const {t} = useTranslation();
  return (
    <>
                    <h2 className="text-custom">Service Details</h2>
                    <div className='dashBox p-4 mb-3'>
                        <form>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.services')}</label>
                                                 <p>{services ? services.name : 'NA'}</p>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.c_time')}</label>
                                                 <p>{services ? services.job_hour : 'NA'} {t('client.jobs.view.hour_s')}</p>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.shift')}</label>
                                        <p>{job.shifts}</p>
                                    </div>
                                </div>
                                 <div className='col-sm-3'>
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
