


import { Outlet } from "react-router"; 
import { Navigate } from 'react-router-dom';

const useVendorAuth = () => {
  var vendor = { VendorloggedIn: false };

  if(localStorage.getItem('tokenkey')) {

    getWithExpiry('tokenkey');

    vendor = { VendorloggedIn: true };
  } else {
    vendor = { VendorloggedIn: true };
  }

  return vendor && vendor.VendorloggedIn;
}

const WorkerProtectedRoutes = () => {
  const isAuth = useVendorAuth();
  return isAuth ? <Outlet /> : <Navigate replace to="/login" />
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  try {
    const item = JSON.parse(itemStr)

    const now = new Date()


    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value

  } catch(err) {
      localStorage.removeItem('tokenkey');
  }





}

export default WorkerProtectedRoutes


