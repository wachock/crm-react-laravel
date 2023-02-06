import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../../Assets/image/logo.png";
import star from "../../../Assets/image/icons/blue-star.png";
import packageEn from "../../../Assets/image/packageEn.jpg";
import footer from "../../../Assets/image/bg-bottom-footer.png";


export default function SendOffer() {
  return (
    <>
    <div className='boiler-heading'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6'><h2>Price Offer</h2></div>
                <div className='col-sm-6'>
                    <ul className='list-inline'>
                        <li className='list-inline-item'>
                            <Link className='btn btn-default' to='/admin/offered-price'>Back to Admin</Link>
                            <button className='btn btn-pink'>Send to client</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className='container'>
        <div className='send-offer'>
            <div className='maxWidthControl dashBox mb-4'>
                <img src={logo} className='img-fluid offer-logo' alt='Broom Service' />
                <div className='row'>
                    <div className='col-sm-6'>
                        <h1>Price Offer No. <span style={{color: "#16a6ef"}}>#1</span></h1>
                    </div>
                    <div className='col-sm-6'>
                        <p className='date'>Date: <span style={{color: "#16a6ef"}}>2023-02-06</span></p>
                    </div>
                </div>
                
                <div className='grey-bd'>
                    <p>In Honor Of: <span style={{color: "#3da7ef", fontWeight: "700"}}>Sohrab Khan</span> </p>
                    <p>Company Name: <span>Broom Service</span> </p>
                    <p>Address: <span>Saurabh Vihar, Jaitpur, New Delhi, Delhi, India , 2nd , 12, New Delhi</span></p>
                </div>
                <div className='abt'>
                    <h2>About us</h2>
                    <p>Broom Service was founder by Lidor Mamou on 2013 The company employs a team of professionals in a wide variety of house cleaning and maintenance jobs. Our staff are regular and experienced employees Our staff are regular and experienced employees who receive a fair and proper reward and all the beneﬁts they receive according to the law Our clients are accustomed and well acquainted with the high standard of service used in the best luxury and boutique hotels in Israel and worldwide and we strive to meet this high quality standard. Our customer satisfaction, high level of service, attention to detail and personal attitude are the foundations on which we base our services.
The company is registered as a legal cleaning company in the Ministry of Industry. License number: 4569 </p>
                </div>
                <div className='services'>
                    <h3 class="card-title">Services</h3>
                    <div className="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                <th style={{width:"30%"}}>Service</th>
                                <th style={{width:"22%"}}>Frequency of Services</th>
                                <th style={{width:"14%"}}>Job Hours</th>
                                <th style={{width:"14%"}}>Hourly Rate</th>
                                <th style={{width:"14%"}}>Amount</th>
                                <th style={{width:"6%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>   
                                    <td>
                                        <select name="service" className="form-control">
                                        <option>Window Cleaning</option>
                                        <option>Door Matting</option>
                                        <option>Glass Furnishing</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="service" className="form-control">
                                        <option>Once</option>
                                        <option>Everyday</option>
                                        <option>Once in a week</option>
                                        <option>Twice in a week</option>
                                        <option>Once in a month</option>
                                        <option>Twice in a month</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" name="jobHours" className="form-control" required placeholder="Job Hrs" />
                                    </td>
                                    <td>
                                        <input type="text" name="rateperhour" className="form-control" required placeholder="Rate/Hr"/>
                                    </td>
                                    <td>
                                        <input type="text" name="totalamount" readonly disabled className="form-control" required  placeholder="Total"/>
                                    </td>
                                    <td class="text-right">
                                        <button className="ml-2 btn bg-red"><i className="fa fa-minus"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td class="text-right" colSpan="6">
                                        <button type="button" class="btn bg-green"><i class="fa fa-plus"></i></button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className='total-amount'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <h5>Total Amount</h5>
                                </div>
                                <div className='col-sm-6'>
                                    <p className='float-right'>$120.00</p>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='we-have'>
                    <h3>What Do We Have To Offer?</h3>
                    <div className='shift-20'>
                        <h4>1. Room Service On A Regular Basis Customized To Your Requirements:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Service on a regular basis by the same professional staff</li>
                            <li><img src={star} /> Employing a legal and regulated employee</li>
                            <li><img src={star} /> Strict sorting of staff including reliability tests</li>
                            <li><img src={star} /> Use of advanced cleaning materials and equipment at our expense</li>
                            <li><img src={star} /> Tight supervision by a regional supervisor</li>
                        </ul>
                        <h4 className='mt-4'>2. Our packages- Regular Room Service</h4>
                        <img src={packageEn} className='img-fluid' alt='Room Services' />
                        <h4 className='mt-4'>3. Cleaning Inside And Outside Windows At Any Height:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Professional cleaning of windows, blinds, rails, frames on a regular basis or on demand.</li>
                            <li><img src={star} />  Cleaning all types of windows at all heights. </li>
                            <li><img src={star} /> Nano coating option after cleaning the windows for clean windows over time.</li>
                            <li><img src={star} /> Use of advanced cleaning materials and equipment at our expense.</li>
                            <li><img src={star} /> Cleaning in rappelling by a professional team.</li>
                        </ul>
                        <h4 className='mt-4'>4. Laundry Services, Fabric Cleaning And Upholstery:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Pick up on order day and return up to 48 hours</li>
                            <li><img src={star} /> Laundry services </li>
                            <li><img src={star} /> Dry Cleaning</li>
                            <li><img src={star} /> Ironing services</li>
                            <li><img src={star} /> Cleaning of sofas, carpets and curtains</li>
                        </ul>
                    </div>
                    <h3 className='mt-4'>Our Services Here, And On Our Website: <a href='https://www.broomservice.co.il' target='_blank'>www.broomservice.co.il</a></h3>
                    <div className='shift-20'>
                        <h4 className='mt-4'>1. Polishing & Renovating Floors & Surfaces:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Floor polishing services of all kinds</li>
                            <li><img src={star} /> Polishing and crystal polishing </li>
                            <li><img src={star} /> Renew and renovation of old and damaged tiles </li>
                            <li><img src={star} /> Riﬂe, opening slots, ﬁlling holes</li>
                            <li><img src={star} /> Remove stains </li>
                            <li><img src={star} /> Renovation of stairwells </li>
                            <li><img src={star} /> Fine polishing and lubrication and wood surfaces</li>
                            <li><img src={star} /> Renovation of wooden furniture, of all kinds </li>
                        </ul>
                        <h4 className='mt-4'>2. Professional Cabinet Organization / Packing & Unpacking Services.</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Creating maximum order and organization.</li>
                            <li><img src={star} /> Sorting your items in a professional way to maximize your storage space </li>
                            <li><img src={star} /> Re-storage using creative storage solutions that preserve order over time. </li>
                            <li><img src={star} /> Professional and agile arrangement, sorting clothes by seasons etc.</li>
                            <li><img src={star} /> Professional packing before moving</li>
                            <li><img src={star} /> Unpacking the contents and arranging cabinets after passage </li>
                        </ul>
                        <h4 className='mt-4'>3. Home Accommodation Services:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Basic or deep cleaning before - after or while hosting at your home</li>
                            <li><img src={star} /> Waiters to serve your guests</li>
                            <li><img src={star} /> Chef for small and large events</li>
                            <li><img src={star} /> Help with cutting and preparing groceries</li>
                        </ul>
                        <h4 className='mt-4'>4. One-time Cleaning Service Afer Renovation / Pre-occupation / Passover Cleaning And Holidays</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> One-time general cleaning services - moving to a new apartment? Planning a renovation? Passover in the doorway? we are here!</li>
                            <li><img src={star} /> Cleaning services at various levels tailored to you and your needs </li>
                            <li><img src={star} /> Service by legally insured professional workers </li>
                            <li><img src={star} /> Detergents and the most advanced equipment at our expense - without acids and dangerous </li>
                            <li><img src={star} /> A supervisor who will make sure that the work is to your satisfaction and up to our standards</li>
                        </ul>
                        <h4 className='mt-4'>5. Full Moving Services From The Packaging Stage To The Coffee With The New Neighbors</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> Deep general cleaning services before moving</li>
                            <li><img src={star} /> Cleaning windows at any height (even in rappelling)</li>
                            <li><img src={star} /> Polishing and renovating all types of ﬂoors and wood (including renovation of parquet, deck and furniture renewal of all types)</li>
                            <li><img src={star} /> Packaging and sorting services from the old house (including crates and packaging products) </li>
                            <li><img src={star} /> Freight services including dismantling assembly and warranty from the cutting plant (possibility of crane service at any height) Polishing and polishing</li>
                            <li><img src={star} /> Storage services for crates and furniture until the move</li>
                            <li><img src={star} /> Professional unpacking and arranging services in your home cabinets</li>
                            <li><img src={star} /> Handyman services: installations, hangings, electrical work of the highest and most professional level</li>
                            <li><img src={star} /> Pest control services: license by the Ministry of Health</li>
                        </ul>
                        <h4 className='mt-4'>6. Short-term Service Asset Management Quietly:</h4>
                        <ul className='list-unstyled'>
                            <li><img src={star} /> we offer short term airbnb services through Bell boy app for more details and registration:</li>
                            <li><img src={star} /> <a href='https://www.bell-boy.com/' target='_blank'>https://www.bell-boy.com/</a> </li>
                        </ul>
                    </div>
                </div>
                <div className='text-center mt-3 mb-3'>
                    <input className='btn btn-pink' value='Send to client' />
                </div>
                <footer className='mt-4'>
                    <img src={footer} className='img-fluid' alt='Footer' />
                </footer>
            </div>
        </div>
    </div>
    </>
  )
}
