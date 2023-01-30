import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Usericon from '../../../Assets/image/Frontend/Icons/usericon.png';

export default function AchievableTask() {
  return (
    <div>
        <div className='Achievable-Task'>
            <h4>Achievable Task</h4>
            <ListGroup className='liststyle'>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Mail management</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> APA application file</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Follow-up of Social Security reimbursements</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Classification of documents</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Aids for various activities</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Household help</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Wash laundry (sort, wash, hang up)</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Kitchen (meal preparation)</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Accompaniment for outdoor outings</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Grocery & Pharmacy</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Meal assistance</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Help with taking medication</ListGroup.Item>
                <ListGroup.Item><img src={Usericon} alt='User' className='img-fluid' width={16} height={16} /> Day and night care</ListGroup.Item>
            </ListGroup>
        </div>

    </div>
  )
}
