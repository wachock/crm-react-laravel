import React from 'react'
import { Link } from 'react-router-dom'
import user from '../../Assets/image/user.png'

export default function TabCandidate() {
  return (
    <div className='tab-candi box-shadow'>
        <div className='candi-list'>
            <div className='img'>
                <img src={user} className='img-fluid' alt='User' />
            </div>
            <div className='candi-text'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h5>Sohrab Khan</h5>
                        <p>C-6, Sector 7, Noida</p>
                        <span>12/02/2023</span>
                    </div>
                    <div className='col-sm-6'>
                        <div className='float-right'>
                            <h2>€10.00/hr</h2>
                            <Link to='#!' className='btn btn-secondary'>View full profile</Link>
                        </div>
                    </div>
                </div>
                <div className='description'>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                </div>
                <div className='button-group mt-4'>
                  <a href='#' className='btn btn-primary-outline'>Decline</a>
                  <a href='#' className='btn btn-primary'>Answer</a>
                </div>
            </div>
        </div>
    </div>
  )
}
