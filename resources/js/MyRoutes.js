import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import './Assets/css/admin.css';

// Protected Routes
import AdminProtectedRoutes from './Components/Auth/PrivateAdmin';
import ClientProtectedRoutes from './Components/Auth/PrivateClient';
import WorkerProtectedRoutes from './Components/Auth/PrivateWorker';

// Client Routes
import Client from './Client/Client';
import ClientDashboard from './Client/ClientDashboard';
import ClientSchedules from './Client/Pages/Schedule/Schedule';
import ClientOffers from './Client/Pages/OfferPrice/OfferPrice';
import ClientViewOffer from './Client/Pages/OfferPrice/ViewOffer';
import ClientContracts from './Client/Pages/Contract/Contract';
import ClientViewContract from './Client/Pages/Contract/ViewContract';
// Worker Routes

import Worker from './Worker/Worker';
import WorkerDashboard from './Worker/WorkerDashboard';

// Admin Routes
import Admin from './Admin/Admin';
import AdminDashboard from './Admin/Dashboard';
import TotalJobs from './Admin/Pages/Jobs/TotalJobs';
import AddJob from './Admin/Pages/Jobs/AddJob';
import ViewJob from './Admin/Pages/Jobs/ViewJob';
import EditJob from './Admin/Pages/Jobs/EditJob'
import Clients from './Admin/Pages/Clients/Client';
import AddClient from './Admin/Pages/Clients/AddClient';
import EditClient from './Admin/Pages/Clients/EditClient';
import ViewClient from './Admin/Pages/Clients/ViewClient';
import AllWorkers from './Admin/Pages/Workers/AllWorkers';
import AddWorker from './Admin/Pages/Workers/AddWorker';
import EditWorker from './Admin/Pages/Workers/EditWorker';
import ViewWorker from './Admin/Pages/Workers/ViewWorker';
import AdminLogin from './Admin/Pages/Auth/AdminLogin';
import Setting from './Admin/Pages/Setting/Setting';
import ManageTeam from './Admin/Pages/Setting/ManageTeam';
import AddTeam from './Admin/Pages/Setting/AddTeam';
import EditTeam from './Admin/Pages/Setting/EditTeam';
import Services from './Admin/Pages/Services/Services';
import AddService from './Admin/Pages/Services/AddService';
import EditService from './Admin/Pages/Services/EditService';
import ServiceSchedule from './Admin/Pages/Services/ServiceSchedule';
import AddServiceSchedule from './Admin/Pages/Services/AddServiceSchedule';
import EditServiceSchedule from './Admin/Pages/Services/EditServiceSchedule';
import OfferPrice from './Admin/Pages/OfferPrice/OfferPrice';
import AddOffer from './Admin/Pages/OfferPrice/AddOffer';
import EditOffer from './Admin/Pages/OfferPrice/EditOffer';
import ViewOffer from './Admin/Pages/OfferPrice/ViewOffer';
import Contract from './Admin/Pages/Contract/Contract';
import AddContract from './Admin/Pages/Contract/AddContract';
import EditContract from './Admin/Pages/Contract/EditContract';
import ViewContract from './Admin/Pages/Contract/ViewContract';
import Error404 from './Error404';
import WorkerLogin from './Worker/Auth/WorkerLogin';
import ClientLogin from './Client/Auth/ClientLogin';
import Schedule from './Admin/Pages/Schedule/Schedule';
import ViewSchedule from './Admin/Pages/Schedule/ViewSchedule';
import CreateContract from './Admin/Pages/Contract/CreateContract';
import PriceOffer from './Pages/PriceOffer';
import WorkContract from './Pages/WorkContract';
import MeetingStatus from './Pages/MeetingStatus';
import CalendarTeam from './Pages/CalendarTeam';
import Thankyou from './Pages/Thankyou';
import ManageTime from './Admin/Pages/Setting/Time/ManageTime';
import AddTime from './Admin/Pages/Setting/Time/AddTime';
import EditTime from './Admin/Pages/Setting/Time/EditTime';


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
               {/* Home route  */}
               <Route exact path="/" element={<ClientLogin />} />
               <Route exact path="client/login" element={<ClientLogin />} />
               <Route exact path="worker/login" element={<WorkerLogin />} />
               <Route exact path="meeting-status/:id" element={<MeetingStatus />} />
               <Route exact path="price-offer/:id" element={<PriceOffer />} />
               <Route exact path="work-contract/:id" element={<WorkContract />} />
               <Route exact path="calendar" element={<CalendarTeam />} />
               <Route exact path="thankyou/:id/:response" element={<Thankyou />} />

               {/* Client Routes Start  */}
               
               <Route element={<ClientProtectedRoutes />}>
                  <Route path="client" element={<Client />} >
                     <Route exact path="dashboard" element={<ClientDashboard/>} />
                     <Route exact path="/client/schedule" element={<ClientSchedules/>} />
                     <Route exact path="/client/offered-price" element={<ClientOffers/>} />
                     <Route exact path="/client/view-offer/:id" element={<ClientViewOffer/>} />
                     <Route exact path="/client/contracts" element={<ClientContracts/>} />
                     <Route exact path="/client/view-contract/:id/:hash" element={<ClientViewContract/>} />
                  </Route>
               </Route>
               {/* Client Routes End  */}

                  
               {/* Worker Routes Start  */}
               <Route exact path="worker/login" element={<WorkerLogin />} />
               
               <Route path="worker" element={<Worker/>} >

               </Route>
               <Route element={<WorkerProtectedRoutes />}>
                  <Route path="worker" element={<Worker/>} >
                     <Route exact path="dashboard" element={<WorkerDashboard />} />
                  </Route>
               </Route>
               {/* Worker Routes End  */}


               {/* Admin Routes Start  */}
               <Route exact path="/admin/login" element={<AdminLogin />} />
               <Route exact path="create-contract" element={<CreateContract />} />
               <Route element={<AdminProtectedRoutes />}>
                  <Route path="admin" element={<Admin />} >
                     <Route exact path="dashboard" element={<AdminDashboard />} />
                     <Route exact path="jobs" element={<TotalJobs />} />
                     <Route exact path="add-job/:id" element={<AddJob />} />
                     <Route exact path="view-job/:id" element={<ViewJob />} />
                     <Route exact path="add-job" element={<AddJob />} />
                     <Route exact path="edit-job/:id" element={<EditJob />} />
                     <Route exact path="clients" element={<Clients />} />
                     <Route exact path="add-client" element={<AddClient />} />
                     <Route exact path="edit-client/:id" element={<EditClient />} />
                     <Route exact path="view-client/:id" element={<ViewClient />} />
                     <Route exact path="workers" element={<AllWorkers />} />
                     <Route exact path="add-worker" element={<AddWorker />} />
                     <Route exact path="edit-worker/:id" element={<EditWorker />} />
                     <Route exact path="view-worker/:id" element={<ViewWorker />} />
                     
               
                     <Route exact path="settings" element={<Setting />} />
                     <Route exact path="manage-team" element={<ManageTeam />} />
                     <Route exact path="add-team" element={<AddTeam />} />
                     <Route exact path="edit-team/:id" element={<EditTeam />} />
                     <Route exact path="services" element={<Services />} />
                     <Route exact path="add-service" element={<AddService />} />
                     <Route exact path="edit-service/:id" element={<EditService />} />
                     <Route exact path="service-schedule" element={<ServiceSchedule />} />
                     <Route exact path="add-service-schedule" element={<AddServiceSchedule />} />
                     <Route exact path="edit-service-schedule/:id" element={<EditServiceSchedule />} />
                     <Route exact path="offered-price" element={<OfferPrice />} />
                     <Route exact path="add-offer" element={<AddOffer />} />
                     <Route exact path="edit-offer/:id" element={<EditOffer />} />
                     <Route exact path="view-offer/:id" element={<ViewOffer />} />
                     <Route exact path="contracts" element={<Contract />} />
                     <Route exact path="add-contract" element={<AddContract />} />
                     <Route exact path="edit-contract" element={<EditContract />} />
                     <Route exact path="view-contract/:id/:hash" element={<ViewContract />} />
                     <Route exact path="schedule" element={<Schedule />} />
                     <Route exact path="view-schedule/:id" element={<ViewSchedule />} />
                     <Route exact path="manage-time" element={<ManageTime />} />
                     <Route exact path="add-time" element={<AddTime />} />
                     <Route exact path="edit-time/:id" element={<EditTime />} />
                     
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
