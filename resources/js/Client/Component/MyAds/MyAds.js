import React from 'react'
import Profileimage from '../../../Assets/image/Frontend/profileimage.png';
import { FaMapMarkerAlt } from 'react-icons/fa';
export default function MyAds() {
  return (
    <div className='MyAds'>
        <div className='profile-feature'>
            <div className='row'>
                <div className='col-sm-2'>
                <div className='profileimg text-center'>
                    <img src={Profileimage} alt='Profile' className='img-fluid' width={88} height={88} />
                </div>
                </div>
                <div className='col-sm-9'>
                    <h2>I am 2 years experienced caretaker</h2>
                    <p>consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor </p>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='d-flex'>
                                <FaMapMarkerAlt/><p>110092, 123 Laxmi nagar</p>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='weekly-available'>
                                <ul>
                                    <li className='disabled'>S</li>
                                    <li>M</li>
                                    <li>T</li>
                                    <li>W</li>
                                    <li>T</li>
                                    <li className='disabled'>F</li>
                                    <li className='disabled'>S</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div className='col-sm-1'>
                    <span><a href="#">Edit</a></span>
                </div>
            </div>
        </div>
        
        
    </div>
  )
}
