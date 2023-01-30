import React from 'react'
import { Link } from 'react-router-dom'

export default function TabDashboard() {
  return (
    <div className='tab-dash box-shadow'>
        <div className='row'>
            <div className='col-sm-10'>
                <h2>Looking for a lady companion in NSW, Sydney for €120</h2>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                <span>Created at: 12/02/2023</span>
            </div>
            <div className='col-sm-2'>
                <div className='float-right ellipsis'>
                    <div className="dropdown show">
                        <Link className="dropdown-toggle" href="#!" role="button" id="ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-h"></i>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="ellipsis">
                            <Link className="dropdown-item" to="../looking-for-help">Edit</Link>
                            {/* <Link className="dropdown-item" to='#!'>Reactive</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul className='list-unstyled'>
            <li className='list-inline-item'>
                <Link to='#!'>
                    <h4>0</h4>
                    <p>Candidate</p>
                </Link> 
            </li>
            <li className='list-inline-item'>
                <Link to='#!'>
                    <h4>2</h4>
                    <p>Messages</p>
                </Link> 
            </li>
        </ul>
    </div>
  )
}
