import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TransactionFilter from '../../Components/Filter/TransactionFilter'
import Sidebar from '../../Layouts/Sidebar'

export default function TransactionHistory() {
  const [transaction, setTransaction] = useState([]);
  function getTransaction(){
    axios.get(`http://localhost:3000/employees`).then(result => {
        setTransaction(result.data);
   })
  }
  useEffect(() => {
    getTransaction();
  })
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className='page-title tran'>Transaction History</h1>
            <TransactionFilter/>
            <div className='boxPanel'>
                <div className='table-responsive'>
                    <table className="table bg-white table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center bg-dark-grey text-white'>ID</th>
                                <th className='bg-dark-grey text-white'>Date</th>
                                <th className='bg-dark-grey text-white'>Name</th>
                                <th className='bg-dark-grey text-white'>Job title</th>
                                <th className='bg-dark-grey text-white text-center'>Commission Received</th>
                                <th className='bg-dark-grey text-white'>Stripe ID</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {transaction && transaction.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.date}</td>
                                    <td>{item.first_name} {item.last_name}</td>
                                    <td>{item.jobTitle}</td>
                                    <td className='text-center'>${item.price}</td>
                                    <td>{item.transaction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
