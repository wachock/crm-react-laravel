import React from 'react'
import ClientProtectedRoutes from '../Components/Auth/PrivateClient'
// import Header from '../Layouts/Header'
// import Footer from '../Layouts/Footer'


export default function Employee() {
  return (
    <div>
        {/* <Header/> */}
            <ClientProtectedRoutes />
        {/* <Footer/> */}
    </div>
  )
}
