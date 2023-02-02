import { Outlet } from "react-router";
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  var user = { loggedIn: false };

  if(localStorage.getItem('worker-token')) {
     user = { loggedIn: true };
  }

  return user && user.loggedIn;
}

const WorkerProtectedRoutes = () => {
  const isAuth = useAuth(); 
  return isAuth ? <Outlet /> : <Navigate replace to="/worker/login" />
}

export default WorkerProtectedRoutes

