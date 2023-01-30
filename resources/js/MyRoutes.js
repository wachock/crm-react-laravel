import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import './Assets/css/style.css';

// Protected Routes
import AdminProtectedRoutes from './Components/Auth/PrivateAdmin';
import WorkerProtectedRoutes from './Components/Auth/PrivateWorker';
import ClientProtectedRoutes from './Components/Auth/PrivateClient';

// Website Routes

import Error404 from './Error404';

// Worker Routes


// Client Routes


// Admin Routes

TimeAgo.addDefaultLocale(en)
const options = {
   timeout: 2000,
   position: positions.TOP_RIGHT
};

export default function MyRoutes() {
   return (
      <Provider template={AlertTemplate} {...options}>
         <Router>
            <Routes>

               {/* Landing Route Start*/}
               <Route exact path='/' element={<Home />} />
              
               {/* Landing Route End*/}

               <Route element={<WorkerProtectedRoutes />}>
                  <Route path="worker" element={<Applicant />} >
                     <Route exact path="dashboard" element={<ApplicantDashboard/>} />
                  </Route>
               </Route>
               {/* Applicant Routes End  */}

               <Route element={<ClientProtectedRoutes />}>
                  <Route path="client" element={<Client/>} >
                     <Route exact path="dashboard" element={<ClientDashboard />} />
                  </Route>
               </Route>
               {/* Vendor Routes End  */}

               {/* Admin Routes Start  */}
               <Route exact path="admin/login" element={<AdminLogin />} />
               <Route element={<AdminProtectedRoutes />}>
                  <Route path="admin" element={<Admin />} >
                     <Route exact path="dashboard" element={<AdminDashboard />} />
                  </Route>
               </Route>
               {/* Admin Routes End  */}

               {/* Error 404 Page / Not Found */}

               <Route path="*" element={<Error404 />} />

            </Routes>

         </Router>
      </Provider>

   );
}
