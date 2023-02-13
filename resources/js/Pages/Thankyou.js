import React from 'react'
import logo from "../Assets/image/logo.png";

export default function Thankyou() {
  return (
    <div className='container'>
        <div className='thankyou dashBox maxWidthControl p-4'>
            <img src={logo} alt='Broom Service' />
            <h2 style={{fontSize: "16px", fontWeight: "400", color: "red", lineHeight: "28px"}}>If accepted, show this message</h2>
            <h3>Thankyou for your response</h3>
            <p>Our team will contact you shortly</p>




            <br/> <br/>
            <h2 style={{fontSize: "16px", fontWeight: "400", color: "red", lineHeight: "28px"}}>If rejected, show this message:</h2>
            <h3>Thankyou for your response</h3>
            <p className='mb-3'>May I know the reason for rejection? If you have any query / suggestions or you would like to reschedule the meeting, please write us on email. We will get back to you shortly.</p>
            <a className='btn btn-pink' href='mailto:office@broomservice.co.il'>Write email</a>
        </div>
    </div>
  )
}
