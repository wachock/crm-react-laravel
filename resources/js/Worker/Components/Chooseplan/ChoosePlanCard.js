import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Checkedicon from '../../../Assets/image/Frontend/checkedicon.png';


export default function ChoosePlanCard() {
    const navigate = useNavigate();
    const HandleSelectPlan = (e) => {
        navigate('/employer/applicant-details');
    }
  return (
    <div>
      <Card className='cardbox plancard'>
            <Card.Body>
                <Row>
                    <Col sm='4' xs='9'>
                        <div className='Plansname'>
                            <h2>Basic</h2>
                            <p>This is perhaps the single biggest obstacle that all of, This is perhaps the single biggest us</p>
                        </div>
                    </Col>
                    <Col sm='2' xs='3'>
                        <div className='plansprice'>
                            <p>
                            <span className='currency-symbol'>$</span>
                            <span className='plansamount'>19</span>
                            <span className='plansmonth'>/ month</span>
                            </p>
                        </div>
                    </Col>
                    <Col sm='3' xs='12'>
                        <div className='plansdetails'>
                            <p><span><img src={Checkedicon} alt='Checked' className='img-fluid' /></span>Where does it come from?</p>
                            <p><span><img src={Checkedicon} alt='Checked' className='img-fluid' /></span>Where does it come from?</p>
                        </div>
                    </Col>
                    <Col sm='3' xs='12'>
                        <div className='selectplan'>
                            <Button as="input" type="submit" value="SELECT PLAN" className='btn btn-primary' onClick={HandleSelectPlan} />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
    </div>
  )
}
