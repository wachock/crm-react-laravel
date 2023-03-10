import React, { useState,useEffect } from 'react'
import logo from "../Assets/image/logo.png";
import { useParams } from 'react-router-dom';
import { useSSR, useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function Thankyou() {

  const [lng,setLng] = useState([]);
  const param = useParams();
  const { t } = useTranslation();
  const updateMeeting = () =>{
    let res = (param.response=="accept") ? 'confirmed' : 'declined';
    axios
    .post(`/api/client/accept-meeting`,{id:param.id,response:res})
    .then((res)=>{ })
  }
  const getMeeting = () => {
    axios
      .post(`/api/client/meeting`, { id: param.id })
      .then((res) => {
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
  
  useEffect(()=>{
    updateMeeting();
    getMeeting();
  },[]);
 
  return (
    <div className='container'>
     
        <div className='thankyou dashBox maxWidthControl p-4'>
            <img src={logo} alt='Broom Service' />
            <h3>{t('res_txt')}</h3>
          {
          (param.response == "accept") ? 
            <>
              <p> {t('meet_accept.cnct_txt')}</p>
            </>
              :
            <>
              <p className='mb-3'>{t('meet_reject.txt')}</p>
              <a className='btn btn-pink' href='mailto:office@broomservice.co.il'>{t('meet_reject.btn_txt')}</a>
             </>
          } 

              </div>
    </div>
  )
}
