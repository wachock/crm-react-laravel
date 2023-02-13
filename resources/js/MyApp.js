import React from 'react';
import { render } from 'react-dom';
import MyRoutes from './MyRoutes';
import swal from 'sweetalert2';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

window.Swal = swal;

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en','heb'],
    fallbackLng: "en",
    detection:{
      order: ['querystring','cookie','path','htmlTag',  'localStorage', 'sessionStorage',
               'navigator',  'subdomain'],
      caches:['cookie']

    },
    backend:{
      loadPath: '/localization/{{lng}}/locale.json',
    },
    react: {useSuspense:false},
  
});

const root = document.getElementById('root');
render(
  <React.StrictMode> 
    <MyRoutes />
  </React.StrictMode>
, root);