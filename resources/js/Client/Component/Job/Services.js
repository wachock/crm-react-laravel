import React  from 'react'
import { useTranslation } from 'react-i18next'
export default function Services({services,job}) {
    const {t,i18n } = useTranslation();
    const c_lng = i18n.language;
     const show_shift = [
        "Full Day",
        "Morning",
        'Afternoon',
        'Evening',
        'Night'
    ];
    const getShift = (shifts) =>{
        let s = (shifts).split(",");
        let check='';
        let new_shift='';
            show_shift.map((p)=>{
                     if(p == 'Afternoon'){
                        check ='noon';
                     }else{
                         check =p;
                     }
                     s.map((sh)=>{
                        if(sh.includes(check.toLowerCase())){
                            if(new_shift==''){
                                new_shift=p;
                            }else{
                                if(!new_shift.includes(p)){
                                   new_shift=new_shift+','+p;
                                 }
                            }
                            
                        }
                     })
            })
             return new_shift;
    }
  return (
    <>
                    <h2 className="text-custom">Service Details</h2>
                    <div className='dashBox p-4 mb-3'>
                        <form>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <div className='form-group'>
                                        <label className='control-label'>{t('client.jobs.view.services')}</label>
                                                 <p>{ (c_lng=='en') ? services.name : services.heb_name }</p>
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
                                        <p>{ (job.shifts) ? getShift(job.shifts) : '' }</p>
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
