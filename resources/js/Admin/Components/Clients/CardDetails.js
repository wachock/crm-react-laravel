import React, { useState, useEffect } from 'react'

export default function CardDetails({latestContract, client}) {
    const cardType = (latestContract) ? latestContract.card_type : '';
    const nameOnCard = (latestContract) ? latestContract.name_on_card : '';
    const or_cvv = (latestContract) ? latestContract.cvv : '';
    const [cvv,setCvv] = useState(null);
    const [show,setShow] = useState('');
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };
    const viewPass = () => {
        
        if (!passVal) { window.alert('Please enter your password'); return; }
        axios
            .post(`/api/admin/viewpass`, { id: localStorage.getItem('admin-id'), pass: passVal }, { headers })
            .then((res) => {
                if (res.data.response == false) {
                    window.alert('Wrong password!');
                } else {
                   
                    (show == 'password') ?
                    setPass(passcode)
                    :setCvv(or_cvv);
                    document.querySelector('.closeb1').click();
                }
            })
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            if(client.latest_contract != 0 && client.latest_contract != undefined){
                let bookBtn = document.querySelector('#bookBtn');
                bookBtn.style.display = 'block';
            }
        },200)
    },[client]);
  return (
    <div className='form-group'>
        <ul className='list-unstyled'>
            <li><strong>Card Type: </strong>{cardType}</li>
            <li><strong>Name on card: </strong>{nameOnCard}</li>
            <li><strong>Cvv: </strong>
            { 
            cvv == null && or_cvv != null? 
            <span onClick={(e)=>setShow('cvv')} style={{ cursor: 'pointer' }} data-toggle="modal" data-target="#exampleModalPass">*** &#128274;</span>
            :
            <span>{cvv}</span>
            }</li>
            {/* <li><strong>Signature: </strong>{signature}</li> */}
        </ul>
    </div>
  )
}
