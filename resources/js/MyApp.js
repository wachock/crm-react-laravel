import React from 'react';
import { render } from 'react-dom';
import MyRoutes from './MyRoutes';
import swal from 'sweetalert2';
window.Swal = swal;

const root = document.getElementById('root');
render(
  <React.StrictMode> 
    <MyRoutes />
  </React.StrictMode>
, root);