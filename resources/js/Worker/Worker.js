import React from 'react'
import WorkerProtectedRoutes from '../Components/Auth/PrivateWorker'
// import Header from '../Layouts/Header'
// import Footer from '../Layouts/Footer'


export default function Worker() {
  return (
    <div>
        {/* <Header/> */}
            <WorkerProtectedRoutes />
        {/* <Footer/> */}
    </div>
  )
}
