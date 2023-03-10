import React from 'react'
import WorkerNotAvailability from '../../Components/Availability/WorkerNotAvailability'
import WorkerSidebar from '../../Layouts/WorkerSidebar'
import { useTranslation } from 'react-i18next'

export default function NotAvailability() {
  const {t} = useTranslation();
  return (
    <div id='container'>
        <WorkerSidebar/>
        <div id="content">
            <div className='view-applicant'>
                <h1 className="page-title viewAppli">{t('worker.schedule.title')}</h1>
                <WorkerNotAvailability/>     
            </div>
        </div>
    </div>
  )
}
