import { Outlet } from "react-router";
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  var user = { loggedIn: true };

  if(localStorage.getItem('token')) {
     user = { loggedIn: true };
  }

  console.log(localStorage.getItem('token'));

  return user && user.loggedIn;
}

const applicantProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate replace to="/login" />
}

export default applicantProtectedRoutes

