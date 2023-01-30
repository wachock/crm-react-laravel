import React from "react";
import LogoArt from '../../Assets/image/Frontend/LogoArt.png';
export default function EmailConfirmation (){
    return(
        <div className="email-confirmation">
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div id='post-ad'>
                            <div className="text-center"><img src={LogoArt} className='img-fluid' alt='Logo' /></div>
                            <h2 className="mail-title">The confirmation email has been sent to <span>neilrick89@gmail.com</span></h2>
                            <div className="congrat">
                                <h1>Congratulation ! Your registration has been taken into account.</h1>
                                <p>A confirmation link has been sent to you by email. Please click on it to validate your account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}