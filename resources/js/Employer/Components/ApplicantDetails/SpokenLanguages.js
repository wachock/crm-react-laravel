import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Usericon from '../../../Assets/image/Frontend/Icons/usericon.png';

export default function SpokenLanguages() {
  return (
    <div>
        <div className='Spoken-Languages'>
            <h4>Spoken Languages</h4>
            <ListGroup className='liststyle'>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> French</ListGroup.Item>
            </ListGroup>
        </div>
    </div>
  )
}
