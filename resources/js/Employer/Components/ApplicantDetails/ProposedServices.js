import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Usericon from '../../../Assets/image/Frontend/Icons/usericon.png';

export default function ProposedServices() {
  return (
    <div>
      <div className='Proposed-Services'>
      <h4>Proposed Services</h4>
        <ListGroup className='liststyle'>
            <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Paid Companion</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}
