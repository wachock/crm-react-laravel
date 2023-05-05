import React, { useState, useEffect } from 'react';
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';
import Moment from 'moment';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function EditInvoce() {

    const [invoice,setInvoice] = useState([]);

    const [amount, setAmount] = useState();
    const [dueDate, setDueDate] = useState();
    const [customer, setCustomer] = useState();
    const [job, setJob] = useState();
    const [subtotal, setSubtotal] = useState();
    const [taxper, setTaxPer] = useState();
    const [taxAmount, setTaxAmount] = useState();
    const [services, setServices] = useState();
    const [selectedJobs, setSelectedJobs] = useState(null);
    const [lng,setLng] = useState();

    const [paidAmount,setPaidAmount] = useState();
    const [mode,setMode] = useState();
    const [txn,setTxn] = useState();
    
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const [clients, setClients] = useState();
    const [cjobs, setCjobs] = useState();
    const [jservices, setjServices] = useState();

    const alert = useAlert();
    const param = useParams();
    const navigate = useNavigate();

    const getCustomers = () => {
        axios
            .get(`/api/admin/all-clients`, { headers })
            .then((res) => {
                setClients(res.data.clients);
            });
    }
    
   
    const clientJobs = (cid) => {
        setSelectedJobs(null);
        setCjobs([]);
        axios
            .post(`/api/admin/get-client-jobs`, { cid }, { headers })
            .then((res) => {
                let jar = [];
                const j = res.data.jobs;

                if (j.length > 0) {
                    for (let i in j) {
                        let n = Moment(j[i].start_date).format('DD - MMM') + " | " + j[i].shifts;
                        jar.push(
                            { name: n, code: j[i].id },
                        );
                    }
                    setCjobs(jar);
                    
                }
              
            })
    }
    
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }


    const getServices = (sel) => {


        let r_code = [];
        sel && sel.map((s, i) => {
            r_code.push(s.code);
        })
        let codes = r_code.filter(onlyUnique);
       
        axios
            .post(`/api/admin/invoice-jobs`, { codes }, { headers })
            .then((res) => {

                let resp = res.data.services;
                if (resp.length > 0) {
                    setjServices(resp);
                    setTimeout(()=>{
                        let st = 0;
                        for(let r in resp){
                            $('.job_hour'+r).val(resp[r].job_hour);
                            $('.price'+r).val(resp[r].total);
                            st += parseFloat(resp[r].total);
                        }
                        $('.subtotal').val(st);
                        document.querySelector('.total').innerHTML = (st);
                    },500);
                }

            })

    }

    const changePrice = (e) => {

        setTimeout(()=>{

            let pa = document.querySelectorAll('input[name="price"]');
            let st = 0;
            pa.forEach((e,i)=>{
              if( e.value == null ){ e.value = 0 }
              st += parseFloat(e.value);
            });
            $('.subtotal').val(st);
            document.querySelector('.total').innerHTML = (st);
            let t = $('.taxper').val();
            let tx = (t != undefined) ? t: 0; 
            changeTax(tx);

        },200);
    }


    const loadService = (r) => {
       
        const rs = JSON.parse(r.services);
        setjServices(rs); 

        if(rs.length > 0 ){
        setTimeout(() => {
        rs.forEach((e,i)=>{
            document.querySelector('.price'+i).value = e.price;
            document.querySelector('.description'+i).innerText = e.description;
            document.querySelector('.job_hour'+i).value = e.job_hour;
        })

        document.querySelector('.subtotal').value = r.subtotal;
        document.querySelector('.tax_per').value = r.taxper;
        document.querySelector('.total').innerHTML = r.amount;
        document.querySelector('input[name="dueDate"]').value = r.due_date;
        setSubtotal(r.subtotal);
        setSelectedJobs(JSON.parse(r.job));
        setTaxAmount(r.total_tax);
        setPaidAmount(r.paid_amount);
        setMode(r.mode);
        setTxn(r.txn_id);
        setAmount(r.amount);
       
        },500);
    }
    }

    const changeTax = () => {

        let sub = document.querySelector('.subtotal').value;
        let tax = document.querySelector('.tax_per').value;
        document.querySelector('.total').value = 0;
        if (sub == '') { alert.error('Please enter subtotal'); return; }
        let ta = Math.ceil(((tax / 100) * sub));
        setTaxAmount(ta);
        setSubtotal(sub);
        document.querySelector('.total').innerHTML = parseFloat(ta) + parseFloat(sub);

    }
   
  
    const handleSubmit = (e) => {
        e.preventDefault();
       
        if(lng == undefined) { window.alert('client language is not set!'); return; }

        const sdata = [];
        jservices.forEach((js,i)=>{
            
          sdata.push(
            {
                'service': ( js.name != undefined ) ? ( ( lng == 'en') ? js.name : js.heb_name) : js.service,
                'description': $('.description'+i).val(),
                'job_hour': $('.job_hour'+i).val(),
                'price': $('.price'+i).val(),
            }
          )
        });
     
    const data = {

        customer: customer,
        job:JSON.stringify(selectedJobs),
        services:(JSON.stringify(sdata)),
        due_date:(dueDate != undefined) ? dueDate : '',
        subtotal: parseFloat(  $('.subtotal').val() ),
        taxper: $('.tax_per').val(),
        total_tax:(taxAmount != undefined) ? parseFloat(taxAmount) : 0,
        amount:parseFloat($('.total').text()),
        status:'sent'

    }
   
    axios.post(`/api/admin/update-invoice/${invoice.id}`,{ data },{ headers })
    .then((res)=>{
       alert.success(res.data.msg);
       setTimeout(()=>{
         navigate('/admin/invoices');
       },1000);
    })

  
    }

    const getInvoice = () =>{
        axios
        .get(`/api/admin/get-invoice/${param.id}`,{ headers })
        .then((res)=>{
            const r = res.data.invoice;
            setInvoice(r);
            clientJobs(r.customer);
            loadService(r);
        })
    }

    const handlePayment = () =>{
        if(paidAmount == null ){ window.alert('Please enter amount'); return; }

        const m = document.querySelector('.mode').value;
        const stat = (parseInt(paidAmount) >= parseInt(amount)) ? 'paid' : 'partially paid';
      
        const data = {
            'paid_amount':paidAmount,
            'mode':m,
            'txn_id':txn,
            'status':stat
        }
        axios.post(`/api/admin/update-invoice/${invoice.id}`,{ data },{ headers })
        .then((res)=>{
            document.querySelector('.closeb1').click();
           setTimeout(()=>{
            alert.success(res.data.msg);
           },1000);
        })
      
    }

    useEffect(() => {
        getCustomers();
        getInvoice();
        setTimeout(()=>{
         const cus = $('.cus').val();
         axios.get(`/api/admin/clients/${1}`,{ headers }).then((res)=>{ setLng(res.data.client.lng )});
        },1000);
        
    }, []);

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
            <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Edit Invoices</h1>
                        </div>
                        <div className="col-sm-6">
                            <button
                                 data-toggle="modal" data-target="#exampleModal"
                                className="ml-2 btn btn-success addButton">
                                <i className="btn-icon fas fa-plus-circle"></i>
                                Payment
                            </button>
                        </div>
                    </div>
                    <div className="card card-body">
                        <form>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Customer
                                        </label>
                                       
                                        <select className='form-control cus' onChange={(e) => { setCustomer(e.target.value); clientJobs(e.target.value) }}>
                                            <option value={0}>-- select customer --</option>
                                            {
                                                clients && clients.map((c, i) => {
                                                    return (<option value={c.id} selected={ invoice.customer == c.id}>{c.firstname + " " + c.lastname}</option>);
                                                })
                                            }

                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">
                                            Job
                                        </label>
                                        <MultiSelect
                                            value={selectedJobs}
                                            onChange={(e) => { setSelectedJobs(e.value); getServices(e.target.value); }}
                                            options={cjobs}
                                            optionLabel="name"
                                            placeholder="Select Jobs"
                                            maxSelectedLabels={3}
                                            className="w-full md:w-20rem form-control"
                                        />
                                        {/*<select className='form-control' onChange={(e) => { setJob(e.target.value); getServices(e.target.value); }}>
                                            <option value={0}>-- select job --</option>
                                            {
                                                cjobs && cjobs.map((j, i) => {
                                                    return (
                                                        <option value={j.id} selected={ invoice.job == j.id}>{Moment(j.start_date).format('DD, MMM') + " | " + j.shifts}</option>
                                                    )
                                                })
                                            }
                                        </select>*/}

                                    </div>
                                </div>

                                {
                                    jservices && jservices.map((js, i) => {
                                      
                                        return (
                                            <>
                                                <div className="row col-sm-12">
                                                    <div className='col-sm-3'>
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Service
                                                            </label>
                                                            <input
                                                                type="text"
                                                                readOnly
                                                                name="service"
                                                                value={(js.service != undefined) ? js.service : js.name }
                                                                className="form-control"
                                                                placeholder="Service"
                                                                required
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Description
                                                            </label>
                                                            <textarea
                                                                name="description"
                                                                className={`form-control description`+i}
                                                                placeholder="Description"

                                                            ></textarea>

                                                        </div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Job Hours
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="hours"
                                                                className={`form-control job_hour`+i}
                                                                placeholder="Job Hours"
                                                                required
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className='col-sm-3'>
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Price
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                onChange={e=>changePrice(e)}
                                                                className={`form-control price`+i}
                                                                placeholder="Price"
                                                                required
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                                )
                                    })

                                }


                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">
                                                            Due Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            onChange={(e) =>
                                                                setDueDate(e.target.value)
                                                            }
                                                            name="dueDate"
                                                            className="form-control"
                                                            placeholder="Enter cycle count"
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">
                                                            Subtotal
                                                        </label>
                                                        <input
                                                            type="number"
                                                            onChange={(e) =>
                                                                {
                                                                setSubtotal(e.target.value);
                                                                changeTax();}
                                                            }
                                                            className="form-control subtotal"
                                                            placeholder="Subtotal"
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label className="control-label">
                                                            Tax percentage
                                                        </label>
                                                        <input
                                                            type="number"
                                                            onChange={(e) => {
                                                                setTaxPer(e.target.value);
                                                                changeTax();
                                                            }

                                                            }
                                                            className="form-control tax_per taxper"
                                                            placeholder="Tax %"
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        
                                                            <h5>Total Payable Amount : <span className="total"></span></h5>
                                                        
                                                    </div>
                                                </div>                                    


                                <div className="form-group text-center col-sm-12">
                                    <input
                                        type="submit"
                                        value="SAVE"
                                        onClick={handleSubmit}
                                        className="btn btn-pink saveBtn"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModal">Add Payment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                             value={paidAmount}
                                                onChange={(e) =>
                                                    setPaidAmount(e.target.value)
                                                }
                                            className="form-control"
                                            required
                                            placeholder="Enter Amount"
                                        ></input>

                                    </div>
                                </div>
                                    
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                        Payment Mode
                                        </label>
                                        <select   name='mode' className='form-control mode'>
                                         <option  value='mt'     selected={ mode == 'mt' }>Bank Transfer</option>
                                         <option  value='cash'   selected={ mode == 'cash' }>By Cash</option>
                                         <option  value='cc'     selected={ mode == 'cc' }>Credit Card</option>
                                         <option  value='cheque' selected={ mode == 'cheque' }>By Cheque</option>
                                        </select>

                                    </div>
                                </div>
                                    
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Transaction / Refrence ID
                                        </label>
                                        <input
                                            type="text"
                                             value={txn}
                                            onChange={(e) =>
                                                setTxn(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            placeholder="Enter Transaction / Refrence ID"
                                        ></input>

                                    </div>
                                </div>
                                    
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary closeb1" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handlePayment} className="btn btn-primary">Save Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}