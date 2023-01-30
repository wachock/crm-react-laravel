import React from 'react'
import EmployerProtectedRoutes from '../Components/Auth/PrivateEmployer'
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'


export default function Employer() {
  return (
    <div>
        <Header/>
            <EmployerProtectedRoutes />
        <Footer/>
    </div>
  )
}
