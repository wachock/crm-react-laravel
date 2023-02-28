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
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.services')}</label>
                                                 <p>{services.name}</p>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.c_time')}</label>
                                                 <p>{services.job_hour} {t('client.jobs.view.hour_s')}</p>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.shift')}</label>
                                        <p>{job.start_time} {t('client.jobs.view.to')} {job.end_time}</p>
                                    </div>
                                </div>
                               
                        </div>
                </form>
            </div>
        </>
 )
}
