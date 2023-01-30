import React from 'react'
import ApplicantProtectedRoutes from '../Components/Auth/PrivateApplicant'
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'


export default function Employee() {
  return (
    <div>
        <Header/>
            <ApplicantProtectedRoutes />
        <Footer/>
    </div>
  )
}
