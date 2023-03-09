import React, { useState, useEffect } from 'react'
import logo from "../Assets/image/logo.png";
import star from "../Assets/image/icons/blue-star.png";
import footer from "../Assets/image/bg-bottom-footer.png";
import { useParams, useNavigate } from 'react-router-dom';
import Moment from 'moment';
import swal from 'sweetalert'
import axios from 'axios';
import { useTranslation } from "react-i18next";
import i18next from 'i18next';

export default function PriceOffer() {

    const { t } = useTranslation();
    const param = useParams();
    const navigate = useNavigate();
    const [offer, setOffer] = useState([]);
    const [services, setServices] = useState([]);
    const [client, setClient] = useState([]);
    const [template, setTemplate] = useState([]);
    const [allTemplates, setAllTemplates] = useState([]);

    const getOffer = () => {

        axios
            .post(`/api/client/get-offer`, { id: param.id })
            .then((res) => {
                setOffer(res.data.offer[0]);
                setServices(JSON.parse(res.data.offer[0].services));
                setClient(res.data.offer[0].client);
                i18next.changeLanguage(res.data.offer[0].client.lng);

                if(res.data.offer[0].client.lng == 'heb') {
                import ('../Assets/css/rtl.css')
                document.querySelector('html').setAttribute('dir','rtl')
                }
                else
                 document.querySelector('html').removeAttribute('dir');

                let serv = JSON.parse(res.data.offer[0].services);
                let tm = [];
                serv && serv.map(async (s, i) => {
                    const d = await axiosTemplate(s.service);
                    tm[i] = d.data.template.template;
                    tm = tm.filter((v, i, a) => { return a.indexOf(v) === i });
                    setAllTemplates(tm);
                });


            })

    }

    const axiosTemplate = async (id) => {
        return await axios.post(`/api/client/get-service-template`, { id: id });
    }




    const handleOffer = (e, id) => {
        e.preventDefault();
        let btn = document.querySelectorAll('.acpt');
        btn[0].setAttribute('disabled', true);
        btn[0].value = ('Please Wait..');
        btn[1].setAttribute('disabled', true);
        btn[1].value = ('Please Wait..');
        axios
            .post(`/api/client/accept-offer`, { id: id })
            .then((res) => {
                if (res.data.errors) {
                    for (let e in res.data.errors) {
                        alert.error(res.data.errors[e]);
                    }
                    btn[0].removeAttribute('disabled');
                    btn[0].value = ('Accept Offer');
                    btn[1].removeAttribute('disabled');
                    btn[1].value = ('Accept Offer');
                } else {
                    btn[0].remove();
                    btn[1].remove();
                    let msg = 'Thank you for accepting the offer, Please check our next email for contract and fill  all the necessary details';
                    swal(msg, '', 'success');
                }
            })

    };

    const RejectOffer = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject this offer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`/api/client/reject-offer`,{id:id})
                    .then((response) => {
                        Swal.fire(
                            "Reject",
                            "Offer has been rejected",
                            "success"
                        );
                        setTimeout(() => {
                           navigate('/client/login');
                        }, 1000);
                    });
            }
        });
    };



    useEffect(() => {
        getOffer();

    }, []);

    return (
        <>

            <div className='container'>
                <div className='send-offer sendOfferRtl'>
                    <div className='maxWidthControl dashBox mb-4'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <img src={logo} className='img-fluid offer-logo' alt='Broom Service' />
                            </div>
                            <div className='col-sm-6'>
                                <div className='mt-2 float-right'>
                                    <input className='btn btn-pink acpt' onClick={(e) => handleOffer(e, offer.id)} value={t('price_offer.button')} />
                                    <div>
                                        <a href="javascript:void(0)" style={{marginTop: "10px", minWidth: "204px"}} className='btn btn-danger' onClick={(e) => RejectOffer(offer.id)}>{t('price_offer.button')}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h1>{t('price_offer.title')}. <span style={{ color: "#16a6ef" }}>#{offer.id}</span></h1>
                            </div>
                            <div className='col-sm-6'>
                                <p className='date'>{t('price_offer.dateTxt')}: <span style={{ color: "#16a6ef" }}>{Moment(offer.created_at).format('Y-MM-DD')}</span></p>
                            </div>
                        </div>

                        <div className='grey-bd'>
                            <p>{t('price_offer.honour_of')}: <span style={{ color: "#3da7ef", fontWeight: "700" }}>{client.firstname + " " + client.lastname}</span> </p>

                            <p>{t('price_offer.address_text')}: <span>Bnei Dan St, Tel Aviv-Yafo, Israel</span></p>

                        </div>
                        <div className='abt'>
                            <h2>{t('price_offer.about_title')}</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{t('price_offer.about')}</p>
                        </div>

                        <div className='we-have'>
                            <h3>{t('price_offer.offer_title')}</h3>

                            {
                                (allTemplates.includes('regular')) ?
                                    <>

                                        <div className='shift-20'>
                                            <h5 className='text-center ofrTitle p-2 m-3'>Regular services</h5>
                                            <h4>1. {t('price_offer.regular_services.rs1')}</h4>
                                            <ul className='list-unstyled'>
                                                <li><img src={star} /> {t('price_offer.regular_services.rs1_p1')}</li>
                                                <li><img src={star} /> {t('price_offer.regular_services.rs1_p2')}</li>
                                                <li><img src={star} /> {t('price_offer.regular_services.rs1_p3')}</li>
                                                <li><img src={star} /> {t('price_offer.regular_services.rs1_p4')}</li>
                                                <li><img src={star} /> {t('price_offer.regular_services.rs1_p5')}</li>
                                            </ul>
                                            <h4 className='mt-4'>2. {t('price_offer.regular_services.rs2')}</h4>
                                            <img src={t('price_offer.regular_services.rs2_img')} className='img-fluid' alt='Room Services' />

                                        </div>

                                    </> : ''

                            }

                            {
                                (allTemplates.includes('thorough_cleaning')) ?
                                    <>
                                        <div className='shift-20'>
                                            <h5 className='text-center ofrTitle p-2 m-3'>Thorough Cleaning</h5>
                                            <h4>1. {t('price_offer.thorough_cleaning.premium')}</h4>
                                            <ul className='list-unstyled'>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_1')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_2')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_3_ebasic')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_4')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_5_ebasic')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_6')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_7')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_8')} </li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_9')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_10_estandard')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_11')} </li>
                                            </ul>
                                            <h4 className='mt-4'>2. {t('price_offer.thorough_cleaning.standard')}</h4>
                                            <ul className='list-unstyled'>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_1')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_2')} </li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_3_ebasic')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_4')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s2_5r')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_6')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_7')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s2_8r')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_9')} </li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_11')} </li>
                                            </ul>
                                            <h4 className='mt-4'>3. {t('price_offer.thorough_cleaning.basic')}</h4>
                                            <ul className='list-unstyled'>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_1')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_2')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_4')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_6')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_7')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s3_8r')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_9')}</li>
                                                <li><img src={star} /> {t('price_offer.thorough_cleaning.s1_11')}</li>
                                            </ul>

                                        </div>
                                    </> : ''
                            }


                            {
                                (allTemplates.includes('office_cleaning')) ?
                                    <>
                                        <div className='shift-20'>
                                            <h5 className='text-center ofrTitle p-2 m-3'>Office Cleaning</h5>

                                            {(allTemplates.includes('office_cleaning') && !allTemplates.includes('regular')) ?
                                                <>
                                                    <h4>1. {t('price_offer.office_cleaning.oc1')}</h4>
                                                    <ul className='list-unstyled'>
                                                        <li><img src={star} /> {t('price_offer.office_cleaning.oc1_p1')}</li>
                                                        <li><img src={star} /> {t('price_offer.office_cleaning.oc1_p2')}</li>
                                                        <li><img src={star} /> {t('price_offer.office_cleaning.oc1_p3')}</li>
                                                        <li><img src={star} /> {t('price_offer.office_cleaning.oc1_p4')}</li>
                                                        <li><img src={star} /> {t('price_offer.office_cleaning.oc1_p5')}</li>
                                                    </ul>
                                                    <h4 className='mt-4'>2. {t('price_offer.office_cleaning.oc2')}</h4>
                                                </>
                                                :
                                                <>
                                                    <h4 className='mt-4'>1. {t('price_offer.office_cleaning.oc2')}</h4>
                                                </>
                                            }
                                            <img src={t('price_offer.office_cleaning.oc2_img')} className='img-fluid' alt='Room Services' />

                                        </div>
                                    </> : ''
                            }

                            {
                                (allTemplates.includes('after_renovation')) ?
                                    <>
                                        <div className='shift-20'>
                                            <h5 className='text-center ofrTitle p-2 m-3'>Cleaning After Renovation</h5>
                                            <h4>1. {t('price_offer.renovation.rn1')}</h4>
                                            <ul className='list-unstyled'>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p1')}</li>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p2')}</li>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p3')}</li>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p4')}</li>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p5')}</li>
                                                <li><img src={star} /> {t('price_offer.renovation.rn1_p6')}</li>

                                            </ul>
                                            <h4 className='mt-4'>2. {t('price_offer.renovation.rn2')}</h4>
                                            <img src={t('price_offer.renovation.rn2_img')} className='img-fluid' alt='Room Services' />

                                        </div>
                                    </> : ''
                            }



                            {
                                allTemplates.includes('others') ?
                                    <>
                                        <div className='shift-20'>

                                            {services && services.map((s, i) => {

                                                if (s.service == 10) {

                                                    return (<>
                                                        <h5 className='text-center ofrTitle p-2 m-3'>{s.other_title}</h5>
                                                        <h4 className='mt-4'>1.  {t('price_offer.others.title')} {s.other_title}</h4>

                                                        <ul className='list-unstyled'>
                                                            <li><img src={star} /> {t('price_offer.regular_services.rs1_p1')}</li>
                                                            <li><img src={star} /> {t('price_offer.regular_services.rs1_p2')}</li>
                                                            <li><img src={star} /> {t('price_offer.regular_services.rs1_p3')}</li>
                                                            <li><img src={star} /> {t('price_offer.regular_services.rs1_p4')}</li>
                                                            <li><img src={star} /> {t('price_offer.regular_services.rs1_p5')}</li>
                                                        </ul>
                                                        <h4 className='mt-4'>2. {t('price_offer.others.o2_title')} {s.other_title}</h4>
                                                        <img src={t('price_offer.regular_services.rs2_img')} className='img-fluid' alt='Other Services' />
                                                    </>)
                                                }

                                            })}


                                        </div>
                                    </>
                                    : ''
                            }
                            <div className='shift-20'>
                                <h5 className='text-center ofrTitle p-2 m-3'>Window Cleaning</h5>
                                <h4 className='mt-4'>{t('price_offer.room_service.title')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.room_service.p1')}</li>
                                    <li><img src={star} /> {t('price_offer.room_service.p2')} </li>
                                    <li><img src={star} /> {t('price_offer.room_service.p3')}</li>
                                    <li><img src={star} /> {t('price_offer.room_service.p4')}</li>
                                    <li><img src={star} /> {t('price_offer.room_service.p5')}</li>
                                </ul>
                                <h4 className='mt-4'>{t('price_offer.room_service.s1')}</h4>
                                <h4 className='mt-4'>2. {t('price_offer.window_any_height.title')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.window_any_height.p1')}</li>
                                    <li><img src={star} /> {t('price_offer.window_any_height.p2')} </li>
                                    <li><img src={star} /> {t('price_offer.window_any_height.p3')}</li>
                                    <li><img src={star} /> {t('price_offer.window_any_height.p4')}</li>
                                    <li><img src={star} /> {t('price_offer.window_any_height.p5')}</li>
                                </ul>
                                <h5 className='text-center ofrTitle p-2 m-3'>Laundary Service</h5>
                                <h4 className='mt-4'>3. {t('price_offer.laundary.title')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.laundary.p1')}</li>
                                    <li><img src={star} /> {t('price_offer.laundary.p2')}</li>
                                    <li><img src={star} /> {t('price_offer.laundary.p3')}</li>
                                    <li><img src={star} /> {t('price_offer.laundary.p4')}</li>
                                    <li><img src={star} /> {t('price_offer.laundary.p5')}</li>
                                </ul>
                            </div>

                            <div className='services shift-20'>
                                <h3 class="card-title">{t('price_offer.service_title')}</h3>
                                <div className="table-responsive">
                                    <table class="table table-sm table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "20%" }}>{t('price_offer.service_txt')}</th>
                                                <th style={{ width: "20%" }}>{t('price_offer.type')}</th>
                                                <th style={{ width: "22%" }}>{t('price_offer.freq_s_txt')}</th>
                                                <th style={{ width: "16%" }}>{t('price_offer.job_h_txt')}</th>
                                                <th >{t('price_offer.hourly_rate')}</th>
                                                <th >{t('price_offer.amount_txt')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services && services.map((s, i) => {
                                                return (<tr>
                                                    <td>{s.name}</td>
                                                    <td>{s.type}</td>
                                                    <td>{s.freq_name}</td>
                                                    <td>{s.jobHours} {t('price_offer.hours')}</td>
                                                    <td>{s.rateperhour ? s.rateperhour + " ILS" : '--'}</td>
                                                    <td>{s.totalamount} ILS</td>


                                                </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <h3 className='mt-4'>{t('price_offer.our_services.heading')} <a href='https://www.broomservice.co.il' target='_blank'>www.broomservice.co.il</a></h3>
                            <div className='shift-20'>
                                <h4 className='mt-4'>1. {t('price_offer.our_services.s1')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p1')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p2')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p3')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p4')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p5')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p6')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p7')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s1_p8')}</li>
                                </ul>
                                <h4 className='mt-4'>2. {t('price_offer.our_services.s2')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p1')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p2')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p3')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p4')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p5')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p6')}</li>
                                </ul>
                                <h4 className='mt-4'>3. {t('price_offer.our_services.s3')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s3_p1')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p2')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p3')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s2_p4')}</li>
                                </ul>
                                <h4 className='mt-4'>4. {t('price_offer.our_services.s4')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p1')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p2')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p3')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p4')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p5')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s4_p6')}</li>
                                </ul>
                                <h4 className='mt-4'>5. {t('price_offer.our_services.s5')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p1')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p2')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p3')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p4')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p5')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p6')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p7')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p8')}</li>
                                    <li><img src={star} /> {t('price_offer.our_services.s5_p9')}</li>
                                </ul>
                                <h4 className='mt-4'>6. {t('price_offer.our_services.s6')}</h4>
                                <ul className='list-unstyled'>
                                    <li><img src={star} /> {t('price_offer.our_services.s6_p1')}</li>
                                    <li><img src={star} /> <a href='https://www.bell-boy.com/' target='_blank'>{t('price_offer.our_services.s6_p2')}</a> </li>
                                </ul>
                            </div>
                        </div>
                        <div className='text-center mt-3 mb-3'>
                            <input className='btn btn-pink acpt' onClick={(e) => handleOffer(e, offer.id)} value={t('price_offer.button')} />
                        </div>
                        <footer className='mt-4'>
                            <img src={footer} className='img-fluid' alt='Footer' />
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
