import React, { useEffect, useState } from 'react'
import ClientSidebar from '../../Layouts/ClientSidebar'
import logo from "../../../Assets/image/logo.png";
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import { useTranslation } from 'react-i18next';

export default function ClientViewOffer() {

  const [offer,setOffer] = useState([]);
  const param            = useParams();
  const {t}             = useTranslation();
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("client-token"),
  };
 
  const getOffer = () =>{
    axios
    .post(`/api/client/view-offer`,{id:param.id},{headers})
    .then((res)=>{
      let ar =[];
      ar.push(res.data.offer);
      setOffer(ar);
    });
 }
 
  useEffect(()=>{
    getOffer();
  },[]);
 
  return (
    <div id="container">
      <ClientSidebar/>
      <div id='content'>
        <div className="AddOffer">
          <h1 className="page-title addEmployer">{t('client.offer.view.title')}</h1>
          <div className='card'>
            <div className='card-body'>
              { offer && offer.map((ofr,i)=>{
                let cl = ofr.client;
                let services = (ofr.services) ? JSON.parse(ofr.services) : '';
      
             return(
              <div className='ViewOffer'>
                <img src={logo} className="img-fluid" alt="Logo" />
                <div className='row'>
                  <div className='col-sm-5'>
                    <h2>Broom Service</h2>
                    <p>4 Ashlinn House,College Squar</p>
                    <p>Florida, USA</p>
                    <p>{t('client.offer.view.phone')}: <span>0872992300</span></p>
                    <p>{t('client.offer.view.email')}: <span>info@yourcompany.com</span></p>
                  </div>
                  <div className='col-sm-4'>
                    <h2>{t('client.offer.view.to')}</h2>
                    <p>{ cl.firstname+" "+cl.lastname }</p>
                    <p>{ cl.street_n_no }</p>
                    <p>{ cl.city+", "+cl.zipcode }</p>
                    <p>{t('client.offer.view.phone')}: <span>{ cl.phone }</span></p>
                    <p>{t('client.offer.view.email')}: <span>{ cl.email }</span></p>
                  </div>
                  <div className='col-sm-3 text-right'>
                    <h2>{t('client.offer.view.ofr_price')}</h2>
                    <p><b>{t('client.offer.view.ofr_id')}: </b><span> { ofr.id }</span></p>
                    <p><b>{t('client.offer.view.date')}: </b><span> { Moment(ofr.created_at).format('MMMM DD,Y') }</span></p>
                    <div className='sent-status'>
                      <p>{ ofr.status }</p>
                    </div>
                  </div>
                </div>
                <div className="card card-dark">
                  <div className="card-header card-black">
                    <h3 class="card-title">{t('client.offer.view.services')}</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                    <Table class="table table-sm responsiveTable">
                        <Thead>
                          <Tr>
                            <Th style={{width:"30%"}}>{t('client.offer.view.service')}</Th>
                            <Th className='text-right'>{t('client.offer.view.frequency')}</Th>
                            <Th className='text-right'>{t('client.offer.view.job_hr')}</Th>
                            <Th style={ ofr.type != 'fixed'? {display:"none"} : {}} className='text-right'>{t('client.offer.view.job_price')}</Th>
                            <Th style={ ofr.type == 'fixed'? {display:"none"} : {}} className='text-right'>{t('client.offer.view.rate_ph')}</Th>
                            <Th style={ ofr.type == 'fixed'? {display:"none"} : {}} className='text-right'>{t('client.offer.view.total_amt')}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          { services && services.map((s,i)=>{
                            return(
                            <Tr>
                              <Td>{s.name}</Td>
                              <Td className='text-right'>{ s.freq_name }</Td>
                              <Td className='text-right'>{ s.jobHours } {t('client.offer.view.hour_s')}</Td>
                              {
                                (ofr.type != 'fixed' ) ?
                                <>
                                  <Td className='text-right'>{ s.rateperhour } ILS</Td>
                                  <Td className='text-right'>{ s.totalamount} ILS</Td>
                                </>
                              :
                                <>
                                  <Td className='text-right'>{ s.fixed_price } ILS</Td>
                                </>
                              }
                            </Tr>
                            )
                          })}
                         
                        </Tbody>
                      </Table>
                    </div>
                    <div className='row'>
                      <div className='col-sm-6'></div>
                      <div className='col-sm-6'>
                        <div className="table-responsive">
                        <table class="table table-sm table-bordered ">
                            <tfoot>
                              <tr>
                                <Td width="65%" class="text-right">{t('client.offer.view.total')}</Td>
                                <Td class="text-right"><span>{ofr.subtotal} </span>ILS + VAT</Td> 
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>  
           )
          })}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
