import React, { useEffect } from 'react'
import logo from "../Assets/image/logo.png";
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function Thankyou() {
  
  const param = useParams();
  const { t } = useTranslation();
  const updateMeeting = () =>{
    let res = (param.response=="accept") ? 'confirmed' : 'declined';
    axios
    .post(`/api/client/accept-meeting`,{id:param.id,response:res})
    .then((res)=>{ })
  }

  useEffect(()=>{
    updateMeeting();
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
