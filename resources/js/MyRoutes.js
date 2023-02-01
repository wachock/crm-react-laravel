import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import './Assets/css/admin.css';
// import './Assets/css/yeliko.css';
// import './Assets/css/style.css';
// import './Assets/css/applicant.css';

// Protected Routes
import AdminProtectedRoutes from './Components/Auth/PrivateAdmin';
import ClientProtectedRoutes from './Components/Auth/PrivateClient';
import EmployerProtectedRoutes from './Components/Auth/PrivateEmployer';

// Website Routes
import Home from './Pages/Home'
import About from './Pages/About';
import HowItWork from './Pages/HowItWork';
import Help from './Pages/Help';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import ClientLogin from './Pages/ClientLogin';
import Register from './Pages/Register';
import Error404 from './Error404';

// Applicant Routes
import Client from './Client/Client';
import ClientDashboard from './Client/ClientDashboard';
import ProfileSetup from './Client/Auth/ProfileSetup';
import EmailConfirmation from './Client/Auth/EmailConfirmation';

// Employer Routes
import Employer from './Employer/Employer';
import EmployerDashboard from './Employer/Dashboard';
import LookingForHelp from './Employer/LookingForHelp';
import ApplicantList from './Employer/ApplicantList';
import ChoosePlan from './Employer/ChoosePlan';
import ApplicantDetails from './Employer/ApplicantDetails';
import Inbox from './Employer/Inbox';

// Admin Routes
import Admin from './Admin/Admin';
import AdminDashboard from './Admin/Dashboard';
import TotalJobs from './Admin/Pages/Jobs/TotalJobs';
import ViewJob from './Admin/Pages/Jobs/ViewJob';
import Clients from './Admin/Pages/Clients/Client';
import AddClient from './Admin/Pages/Clients/AddClient';
import EditClient from './Admin/Pages/Clients/EditClient';
import ViewClient from './Admin/Pages/Clients/ViewClient';
import Workers from './Admin/Pages/Workers/Worker';
import AddWorker from './Admin/Pages/Workers/AddWorker';
import EditWorker from './Admin/Pages/Workers/EditWorker';
import ViewWorker from './Admin/Pages/Workers/ViewWorker';
import Review from './Admin/Pages/Review/Reviews';
import AddReview from './Admin/Pages/Review/AddReview';
import EditReview from './Admin/Pages/Review/EditReview';
import AdminLogin from './Admin/Pages/Auth/AdminLogin';
import TransactionHistory from './Admin/Pages/Transaction/TransactionHistory';
import Information from './Admin/Pages/Information/Information';
import AddPage from './Admin/Pages/Information/AddPage';
import EditPage from './Admin/Pages/Information/EditPage';
import Subscription from './Admin/Pages/Subscription/Subscription';
import Skills from './Admin/Pages/JobAssets/Skills';
import AddSkill from './Admin/Pages/JobAssets/AddSkill';
import EditSkill from './Admin/Pages/JobAssets/EditSkill';
import Tasks from './Admin/Pages/JobAssets/Tasks';
import AddTask from './Admin/Pages/JobAssets/AddTask';
import EditTask from './Admin/Pages/JobAssets/EditTask';
import JobProfile from './Admin/Pages/JobAssets/JobProfile';
import AddJobProfile from './Admin/Pages/JobAssets/AddJobProfile';
import EditJobProfile from './Admin/Pages/JobAssets/EditJobProfile';
import Language from './Admin/Pages/JobAssets/Language';
import Addlanguage from './Admin/Pages/JobAssets/AddLanguage';
import Editlanguage from './Admin/Pages/JobAssets/EditLanguage';
import Nationality from './Admin/Pages/JobAssets/Nationality';
import AddNationality from './Admin/Pages/JobAssets/AddNationality';
import EditNationality from './Admin/Pages/JobAssets/EditNationality';
import Plans from './Admin/Pages/Plans/Plans';
import AddPlan from './Admin/Pages/Plans/AddPlan';
import EditPlan from './Admin/Pages/Plans/EditPlan';
import AddSubscription from './Admin/Pages/Subscription/AddSubscription';
import EditSubscription from './Admin/Pages/Subscription/EditSubscription';
import Setting from './Admin/Pages/Setting/Setting';
import Services from './Admin/Pages/Services/Services';
import AddService from './Admin/Pages/Services/AddService';
import EditService from './Admin/Pages/Services/EditService';
import ServiceSchedule from './Admin/Pages/Services/ServiceSchedule';
import AddServiceSchedule from './Admin/Pages/Services/AddServiceSchedule';
import EditServiceSchedule from './Admin/Pages/Services/EditServiceSchedule';


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
               <Route exact path='about-us' element={<About />} />
               <Route exact path='how-it-work' element={<HowItWork />} />
               <Route exact path='help' element={<Help />} />
               <Route exact path='contact-us' element={<Contact />} />
               <Route exact path="login" element={<Login />} />
               <Route exact path="client/login" element={<ClientLogin />} />
               <Route exact path="register" element={<Register />} />
               <Route exact path="privacy-policy" element={<Privacy />} />
               <Route exact path="terms-and-conditions" element={<Terms />} />
               {/* Landing Route End*/}

               {/* Applicant Routes Start  */}
               <Route path="client" element={<Client/>} >
                  <Route exact path="setup-profile" element={<ProfileSetup />} />
                  <Route exact path="email-confirmation" element={<EmailConfirmation />} />
               </Route>
               <Route element={<ClientProtectedRoutes />}>
                  <Route path="client" element={<Client />} >
                     <Route exact path="dashboard" element={<ClientDashboard/>} />
                  </Route>
               </Route>
               {/* Applicant Routes End  */}

               {/* Vendor Routes Start  */}
               <Route path="employer" element={<Employer/>} >
                  <Route exact path="looking-for-help" element={<LookingForHelp/>} />
                  <Route exact path="all-applicants" element={<ApplicantList/>} />
                  <Route exact path="choose-plan" element={<ChoosePlan/>} />
                  <Route exact path="applicant-details" element={<ApplicantDetails/>} />
                  <Route exact path="inbox" element={<Inbox/>} />
               </Route>
               <Route element={<EmployerProtectedRoutes />}>
                  <Route path="employer" element={<Employer/>} >
                     <Route exact path="dashboard" element={<EmployerDashboard />} />
                  </Route>
               </Route>
               {/* Vendor Routes End  */}


               {/* Admin Routes Start  */}
               <Route exact path="admin/login" element={<AdminLogin />} />
               <Route element={<AdminProtectedRoutes />}>
                  <Route path="admin" element={<Admin />} >
                     <Route exact path="dashboard" element={<AdminDashboard />} />
                     <Route exact path="jobs-posted" element={<TotalJobs />} />
                     <Route exact path="view-job/:id" element={<ViewJob />} />
                     <Route exact path="clients" element={<Clients />} />
                     <Route exact path="add-client" element={<AddClient />} />
                     <Route exact path="edit-client/:id" element={<EditClient />} />
                     <Route exact path="view-client/:id" element={<ViewClient />} />
                     <Route exact path="workers" element={<Workers />} />
                     <Route exact path="add-worker" element={<AddWorker />} />
                     <Route exact path="edit-worker/:id" element={<EditWorker />} />
                     <Route exact path="view-worker/:id" element={<ViewWorker />} />
                     <Route exact path="reviews" element={<Review />} />
                     <Route exact path="add-review" element={<AddReview />} />
                     <Route exact path="edit-review/:id" element={<EditReview />} />
                     <Route exact path="transaction-history" element={<TransactionHistory />} />
                     <Route exact path="information-pages" element={<Information />} />
                     <Route exact path="add-page" element={<AddPage />} />
                     <Route exact path="edit-page/:id" element={<EditPage />} />
                     <Route exact path="subscription" element={<Subscription />} />
                     <Route exact path="add-subscription" element={<AddSubscription />} />
                     <Route exact path="edit-subscription/:id" element={<EditSubscription />} />
                     <Route exact path="skills" element={<Skills />} />
                     <Route exact path="add-skill" element={<AddSkill />} />
                     <Route exact path="edit-skill/:id" element={<EditSkill />} />
                     <Route exact path="tasks" element={<Tasks />} />
                     <Route exact path="add-task" element={<AddTask />} />
                     <Route exact path="edit-task/:id" element={<EditTask />} />
                     <Route exact path="job-profiles" element={<JobProfile />} />
                     <Route exact path="add-profile" element={<AddJobProfile />} />
                     <Route exact path="edit-profile/:id" element={<EditJobProfile />} />
                     <Route exact path="language" element={<Language />} />
                     <Route exact path="add-language" element={<Addlanguage />} />
                     <Route exact path="edit-language/:id" element={<Editlanguage />} />
                     <Route exact path="nationality" element={<Nationality />} />
                     <Route exact path="add-nationality" element={<AddNationality />} />
                     <Route exact path="edit-nationality/:id" element={<EditNationality />} />
                     <Route exact path="plans" element={<Plans />} />
                     <Route exact path="add-plan" element={<AddPlan />} />
                     <Route exact path="edit-plan/:id" element={<EditPlan />} />
                     <Route exact path="settings" element={<Setting />} />
                     <Route exact path="services" element={<Services />} />
                     <Route exact path="add-service" element={<AddService />} />
                     <Route exact path="edit-service/:id" element={<EditService />} />
                     <Route exact path="service-schedule" element={<ServiceSchedule />} />
                     <Route exact path="add-service-schedule" element={<AddServiceSchedule />} />
                     <Route exact path="edit-service-schedule/:id" element={<EditServiceSchedule />} />
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
