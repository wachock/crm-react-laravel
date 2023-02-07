import React from 'react'
import logo from "../Assets/image/logo.png";
import star from "../Assets/image/icons/blue-star.png";

export default function WorkContract() {
  return (
    <div className='container'>
        <div className='send-offer client-contract'>
            <div className='maxWidthControl dashBox mb-4'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img src={logo} className='img-fluid offer-logo' alt='Broom Service' />
                    </div>
                    <div className='col-sm-6'>
                        <div className='mt-2 float-right'>
                            <input className='btn btn-pink' value='Accept Contract' />
                        </div>
                    </div>
                </div>
                <h4 className='inHead'>Broom Service L.M. Ltd Private Company no. 515184208 Exclusive Framework Agreement with Tenants/Clients</h4>
                <div className='signed'>
                    <p>Made and Signed in: <span>New Delhi</span> on <span>10 Feb. 2023</span></p>
                </div>
                <div className='between'>
                    <p>Between:</p>
                    <p>Broom Service L.M. Ltd Private Company no. 515184208</p>
                    <p>From 69 Jerusalem st. , Bat Yam (Hereinafter: the Company)</p>
                </div>
                <div className='first'>
                    <h2 className='mb-4'>Of the First Party</h2>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>Full Name: <span>Sohrab Khan</span></li>
                        <li className='list-inline-item'>City: <span>New Delhi</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>Street and Number: <span>Saurabh Vihar, Jaitpur, New Delhi, Delhi, India</span></li>
                        <li className='list-inline-item'>Floor: <span>2nd</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>Apt Number: <span>A-278</span></li>
                        <li className='list-inline-item'>Enterance Code: <span>1008</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>Zip code: <span>110044</span></li>
                        <li className='list-inline-item'>DOB: <span>02-06-1994</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>Telephone: <span>8090895865</span></li>
                        <li className='list-inline-item'>Email: <span>website.design1008@gmail.com</span></li>
                    </ul>
                    <h2 className='mb-4'>Of the Second Party</h2>
                    <div className='whereas'>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>Whereas:</h4>
                            </div>
                            <div className='info-text'>
                                <p>Broom Service L.M. Private Company no. 515184208 (hereinafter: the Company) is a company that provides, inter alia, services of maintenance, supply, and cleaning fortenants in various facilities across the State of Israel.</p>
                            </div>
                        </div>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>And whereas:</h4>
                            </div>
                            <div className='info-text'>
                                <p>The Tenant is interested in making an agreement with the Company in order to receive the services requested in this agreement, for the consideration specified in this agreement.</p>
                            </div>
                        </div>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>And whereas:</h4>
                            </div>
                            <div className='info-text'>
                                <p>The Tenant is aware that in order to receive the service and/or work from the Company, he/she must sign this agreement and comply with all the terms and conditions of this agreement, with no exception, in connection with the service and/or work and/or the materials and/or the products the Tenant is interested in receiving from the Company.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='text-center mb-4'>Therefore, the Parties hereby agree and declare as follows:</h2>
                <div className='shift-30'>
                    <h6>Introduction</h6>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>The introduction of this agreement is an integral part thereof and as binding as all its other provisions.</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>Any obligation of the Tenant under this agreement is an addition to any other obligation of the Tenant under other agreements and/or the quotation and/or any applicable law.</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>In any case of contrast between the provisions of this agreement and the provisions of any other agreement between the Tenant and the Company and/or the quotation the Tenant submitted to the Company, the provisions of this agreement shall prevail.</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>Headings of the sections contained in this agreement are for convenience only and shall not be interpreted to limit or otherwise affect the provisions of this agreement.</p>
                        </div>
                    </div>
                    <h6 className='text-center text-underline'>The service / work and/or products requested by the Tenant, including their scope, location and commercial terms</h6>
                    <div className='service-table table-responsive'>
                        <table className='table table-bordered'>
                            <tr>
                                <td>The service and/or work requested by the Tenant</td>
                                <td>Windows Cleaning</td>
                            </tr>
                            <tr>
                                <td>The location in which the service will be provided and/or work will be performed</td>
                                <td>Saurabh Vihar, Jaitpur, New Delhi, Delhi, India A-278 New Delhi <br/> <span style={{fontWeight: "600"}} className='d-block mt-2'>Other address if any?</span> <br/><input type='text' value='' placeholder='Any other address?' className='form-control'/></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
