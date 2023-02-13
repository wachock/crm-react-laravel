import React, { useEffect } from 'react'
import logo from "../Assets/image/logo.png";
import { useParams } from 'react-router-dom';

export default function Thankyou() {
  const param = useParams();
  
  const updateMeeting = () =>{
    let res = (param.response=="accept") ? 'confirmed' : 'declined';
    axios
    .post(`/api/client/accept-meeting`,{id:param.id,response:res})
    .then((res)=>{
    // swal(res.data.message,'','success',);
      /*setTimeout(()=>{
          window.location.href=('/client/login');
      },1000)*/
    })
  }

  useEffect(()=>{
    updateMeeting();
  },[]);

  return (
    <div className='container'>
        <div className='thankyou dashBox maxWidthControl p-4'>
            <img src={logo} alt='Broom Service' />

      {
        (param.response == "accept")? 
      
            (param.lang =="heb") ?
             
             (<>
              <h3>תודה עבור תגובתך</h3>
              <p>הצוות שלנו ייצור איתך קשר בהקדם</p>
            </>)
             :       
            (<>
              <h3>Thankyou for your response</h3>
              <p>Our team will contact you shortly</p>
            </>)
      :
            (param.lang =="heb")?
             (
              <>
            <h3>תודה עבור תגובתך</h3>
            <p className='mb-3'>האם אוכל לדעת את סיבת הדחייה? אם יש לך שאלה/הצעות או אם תרצה לקבוע מחדש את הפגישה, אנא כתוב לנו באימייל. נחזור אליך בהקדם.</p>
            <a className='btn btn-pink' href='mailto:office@broomservice.co.il'>כתוב מייל</a>
             </>
             )
             :
             (<>
              <h3>Thankyou for your response</h3>
              <p className='mb-3'>May I know the reason for rejection? If you have any query / suggestions or you would like to reschedule the meeting, please write us on email. We will get back to you shortly.</p>
              <a className='btn btn-pink' href='mailto:office@broomservice.co.il'>Write email</a>
             </>
             )
        
      }
        </div>
    </div>
  )
}
