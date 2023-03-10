import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function MeetingStatus() {

  const { t } = useTranslation();
  const [meeting, setMeeting] = useState([]);
  const [teamName, setTeamName] = useState("");
  const param = useParams();
  const navigate = useNavigate();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
  const getMeeting = () => {
    axios
      .post(`/api/client/meeting`, { id: param.id })
      .then((res) => {
        setMeeting(res.data.schedule);
        setTeamName(res.data.schedule.team.name);
        const lng = res.data.schedule.client.lng;
        i18next.changeLanguage(lng);
        if (lng == 'heb') {
          import('../Assets/css/rtl.css')
          document.querySelector('html').setAttribute('dir', 'rtl')
      }
      else
          document.querySelector('html').removeAttribute('dir');
      })
  }
  useEffect(() => {
    getMeeting();
    setTimeout(() => {
      document.querySelector(".meeting").style.display = "block";
    }, 1000)
  }, []);


  return (
    <div className='container meeting' style={{ display: "none" }}>
     
      <div className='thankyou meet-status dashBox maxWidthControl p-4'>
        <h1>{t('meet_stat.with')} {teamName}</h1>
        <ul className='list-unstyled'>
          <li>{t('meet_stat.date')}: <span>{Moment(meeting.start_date).format('D-M-Y')}</span></li>
          <li>{t('meet_stat.time')}: <span>{meeting.start_time} {t('meet_stat.to')} {meeting.end_time}</span></li>
          {
            meeting.service_names
              ? <li>{t('meet_stat.service')}: <span>{meeting.service_names}</span></li>
              : ''
          }

        </ul>
        <div className='cta'>
          <p>{t('meet_stat.txt')}</p>
          <a className='btn btn-primary' href='mailto:office@broomservice.co.il' >{t('meet_stat.btn')}</a>
        </div>
      </div>
    </div>
  )
}
