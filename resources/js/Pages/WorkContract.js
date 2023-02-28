import React,{ useRef, useState, useEffect } from 'react'
import logo from "../Assets/image/logo.png";
import star from "../Assets/image/icons/blue-star.png";
import SignatureCanvas from 'react-signature-canvas'
import companySign from "../Assets/image/company-sign.png";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'moment';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function WorkContract() {

    const { t } = useTranslation();
    const [offer,setoffer]         = useState([]);
    const [services,setServices]   = useState([]);
    const [client,setClient]       = useState([]);
    const [contract,setContract]   = useState([]);
    const param = useParams();
    const sigRef = useRef();
    const sigRef2 = useRef();
    const [signature, setSignature] = useState(null);
    const [signature2, setSignature2] = useState(null);
    const [Aaddress, setAaddress]   = useState(null);
    const [ctype,setCtype]          = useState("");
    const [cname,setCname]          = useState("");
    const [cvv,setCvv]              = useState("");



    const handleAccept = (e) =>{

        if(!ctype){ swal('Please select card type','','error'); return false;}
        if(!cname){ swal('Please enter card holder name','','error'); return false;}
        if(!cvv)  { swal('Please select card cvv','','error'); return false;}
        if(!signature){ swal('Please sign the contract','','error'); return false;}
        if(!signature2){ swal('Please enter signature on the card','','error'); return false;}
        if(cvv.length < 3)  { swal('Invalid cvv','','error'); return false;}

        const data = {
            unique_hash:param.id,
            offer_id:offer[0].id,
            client_id:offer[0].client.id,
            additional_address:Aaddress,
            card_type:ctype,
            name_on_card:cname,
            cvv:cvv.substring(0,3),
            status:'un-verified',
            signature:signature,
            card_sign:signature2
        }

        axios
        .post(`/api/client/accept-contract`,data)
        .then((res)=>{
            if(res.data.error){
                swal('',res.data.error,'error');
            } else{
            swal(res.data.message,'','success')
            setTimeout(()=>{
                window.location.href="/client/login";
            },1000)
        }
        })
    }

    const handleSignatureEnd = () => {
        setSignature(sigRef.current.toDataURL());
    }
    const clearSignature = () => {
        sigRef.current.clear();
        setSignature(null);
    }

    const handleSignatureEnd2 = () => {
        setSignature2(sigRef2.current.toDataURL());
    }
    const clearSignature2 = () => {
        sigRef2.current.clear();
        setSignature2(null);
    }

    const getOffer = () =>{
        axios
        .post(`/api/client/get-offer-token`,{token:param.id})
        .then((res)=>{

            if(res.data.offer.length > 0){
               setoffer(res.data.offer);
               setServices(JSON.parse(res.data.offer[0].services));
               setClient(res.data.offer[0].client);
               setContract(res.data.contract);
               i18next.changeLanguage(res.data.offer[0].client.lng);
               if(res.data.offer[0].client.lng == 'heb'){
                document.querySelector('html').setAttribute('dir','rtl');
             }
            } else {
                setoffer([]);
                setServices([]);
                setClient([]);
                setContract([]);
            };
        })
    }

    useEffect(()=>{
        getOffer();
    },[]);

  return (

    <div className='container'>
        <div className='send-offer client-contract sendOfferRtl'>
            <div className='maxWidthControl dashBox mb-4'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <img src={logo} className='img-fluid offer-logo' alt='Broom Service' />
                    </div>
                    <div className='col-sm-6'>
                        <div className='mt-2 float-right'>
                            <input className='btn btn-pink' onClick={handleAccept} value={t('work-contract.accept_contract')} />
                        </div>
                    </div>
                </div>
                <h4 className='inHead'>{t('work-contract.inHead')}</h4>
                <div className='signed'>
                    <p>{t('work-contract.signed')} <span>{client.city ? client.city : 'NA'}</span> on <span>{Moment(contract.created_at).format('DD MMMM,Y')}</span></p>
                </div>
                <div className='between'>
                    <p>{t('work-contract.between')}</p>
                    <p>{t('work-contract.broom_service')}</p>
                    <p>{t('work-contract.from')}</p>
                </div>
                <div className='first'>
                    <h2 className='mb-4'>{t('work-contract.first_party_title')}</h2>
                    {offer && offer.map((ofr,i)=>{
                    let cl = ofr.client;

                    return (
                        <>
                    <ul className='list-inline'>
                        <li className='list-inline-item ml-2'>{t('work-contract.full_name')} <span>{ cl.firstname+" "+cl.lastname }</span></li>
                        <li className='list-inline-item'>{t('work-contract.city')} <span>{ cl.city }</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item ml-2'>{t('work-contract.street_and_number')} <span>{ cl.geo_address }</span></li>
                        <li className='list-inline-item'>{t('work-contract.floor')} <span>{ cl.floor }</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item ml-2'>{t('work-contract.apt_number')} <span>{ cl.apt_no }</span></li>
                        <li className='list-inline-item'>{t('work-contract.enterance_code')} <span>{ cl.entrence_code }</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item ml-2'>{t('work-contract.zip_code')} <span>{ cl.zipcode }</span></li>
                        <li className='list-inline-item'>{t('work-contract.dob')} <span>{ cl.dob }</span></li>
                    </ul>
                    <ul className='list-inline'>
                        <li className='list-inline-item ml-2'>{t('work-contract.telephone')} <span>{ cl.phone }</span></li>
                        <li className='list-inline-item'>{t('work-contract.email')} <span>{ cl.email }</span></li>
                    </ul>
                    </>
                    )

                    })}
                    <h2 className='mb-4'>{t('work-contract.second_party_title')}</h2>
                    <div className='whereas'>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>{t('work-contract.whereas')}</h4>
                            </div>
                            <div className='info-text'>
                                <p>{t('work-contract.whereas_info_text')}</p>
                            </div>
                        </div>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>{t('work-contract.and_whereas')}</h4>
                            </div>
                            <div className='info-text'>
                                <p>{t('work-contract.and_whereas_info_text')}</p>
                            </div>
                        </div>
                        <div className='info-list'>
                            <div className='icons'>
                                <h4>{t('work-contract.and_whereas_2')}</h4>
                            </div>
                            <div className='info-text'>
                                <p>{t('work-contract.and_whereas_2_info_text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='text-center mb-4'>{t('work-contract.parties_hereby_title')}</h2>
                <div className='shift-30'>
                    <h6>{t('work-contract.intro_subtitle')}</h6>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.intro_txt_1')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.intro_txt_2')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.intro_txt_3')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.intro_txt_4')}</p>
                        </div>
                    </div>
                    <h6 className='text-center text-underline'>{t('work-contract.service_subtitle')}</h6>
                    <div className='service-table table-responsive'>
                        <table className='table table-bordered'>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.the_service_txt')}</td>
                                <td>
                                {services && services.map((s,i)=>{
                                    return (
                                        (services.length -1) != i
                                        ? s.name +", "
                                        :s.name
                                    )
                                })}
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.location_txt')}</td>
                                <td>
                                    {offer && offer.map((ofr,i)=>{
                                        let address =  (ofr.client.city) ? (ofr.client.city)+", " : '';
                                            address += (ofr.client.street_n_no) ? (ofr.client.street_n_no)+", " : '';
                                            address += (ofr.client.zipcode) ? (ofr.client.zipcode)+", ": '';
                                        return address;
                                    })}

                                <br/> <span style={{fontWeight: "600"}} className='d-block mt-2'>{t('work-contract.other_address_txt')}</span> <br/>
                                <input type='text' name="additional_address" onChange={(e)=>setAaddress(e.target.value)} placeholder={t('work-contract.placeholder_address')} className='form-control'/></td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.service_delivery_txt')}</td>
                                <td>{t('work-contract.as_agreed_txt')} </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.frequency_txt')}</td>
                                <td>
                                {services && services.map((s,i)=>{
                                    return (
                                        (services.length -1) != i
                                        ? s.freq_name +", "
                                        :s.freq_name
                                    )
                                })}
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.consideration_txt')}</td>
                                <td>
                                {services && services.map((s,i)=>{
                                  if((services.length)-1 != i )
                                  return s.totalamount + " ILS + VAT for " + s.name + ", " + s.freq_name+", ";
                                  else
                                  return s.totalamount + " ILS + VAT for " + s.name + ", " + s.freq_name;
                                })}
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.payment_method')}</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.hereby_permit_txt')}</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.card_type')}</td>
                                <td>
                                    <select className='form-control'  onChange={(e)=>setCtype(e.target.value)}>
                                        <option>{t('work-contract.option_select')}</option>
                                        <option value={t('work-contract.option_visa')}>{t('work-contract.option_visa')}</option>
                                        <option value={t('work-contract.option_master')}>{t('work-contract.option_master')}</option>
                                        <option value={t('work-contract.option_american')}>{t('work-contract.option_american')}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.card_name')}</td>
                                <td><input type='text' name="name_on_card"  onChange={(e)=>setCname(e.target.value)} className='form-control' placeholder={t('work-contract.card_name')} /></td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.card_cvv')}</td>
                                <td><input type='text' name="cvv"  onChange={(e)=>setCvv(e.target.value)} onKeyUp={(e)=>{if(e.target.value.length >= 3) e.target.value = e.target.value.slice(0, 3); }} className='form-control' placeholder={t('work-contract.card_cvv')} /></td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.signature')}</td>
                                <td>
                                <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{className: 'sigCanvas'}}
                                    ref={sigRef2}
                                    onEnd={handleSignatureEnd2}
                                />
                                <button className='btn btn-warning' onClick={clearSignature2}>{t('work-contract.btn_warning_txt')}</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: "60%"}}>{t('work-contract.miscellaneous_txt')}</td>
                                <td>{t('work-contract.employees_txt')}</td>
                            </tr>
                        </table>
                    </div>
                    <h6 className='text-underline'>{t('work-contract.tenant_subtitle')}</h6>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_1')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_2')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_3')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_4')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_5')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_6')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_7')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.tenant_txt_8')}</p>
                        </div>
                    </div>
                    <h6 className='text-underline'>{t('work-contract.company_subtitle')}</h6>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_1')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_2')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_3')} </p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_4')} </p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_5')} </p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_6')} </p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.company_txt_7')}</p>
                        </div>
                    </div>
                    <h6 className='text-underline'>{t('work-contract.general_subtitle')}</h6>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.general_txt_1')}</p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.general_txt_2')} </p>
                        </div>
                    </div>
                    <div className='agg-list'>
                        <div className='icons'><img src={star} /></div>
                        <div className='agg-text'>
                            <p>{t('work-contract.general_txt_3')}</p>
                        </div>
                    </div>
                    <h6 className='text-center text-underline mt-3 mb-4'>{t('work-contract.signed_title')}</h6>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h5 className='mt-2 mb-4'>{t('work-contract.the_tenant_subtitle')}</h5>
                            <h6>{t('work-contract.draw_signature')}</h6>
                              <SignatureCanvas
                                    penColor="black"
                                    canvasProps={{className: 'sigCanvas'}}
                                    ref={sigRef}
                                    onEnd={handleSignatureEnd}
                                />
                                <button className='btn btn-warning' onClick={clearSignature}>{t('work-contract.btn_warning_txt')}</button>
                        </div>
                        <div className='col-sm-6'>
                            <div className='float-right'>
                                <h5 className='mt-2 mb-4'>{t('work-contract.the_company')}</h5>
                            </div>
                            <div className='float-right'>
                                <img src={companySign} className='img-fluid' alt='Company' />
                            </div>
                        </div>
                        <div className=' col-sm-12 mt-2 float-right'>
                            <input className='btn btn-pink' onClick={handleAccept} value={t('work-contract.accept_contract')} />
                        </div>

                    </div>

                    <div className='mb-4'>&nbsp;</div>
                </div>
            </div>
        </div>
    </div>

  )
}
