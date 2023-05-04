import React, { useState, useEffect } from 'react';
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import axios from 'axios';
import Moment from 'moment';
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";

export default function AddInvoce() {

    const [amount, setAmount] = useState();
    const [dueDate, setDueDate] = useState();
    const [customer, setCustomer] = useState();
    const [job, setJob] = useState();
    const [subtotal, setSubtotal] = useState();
    const [taxper, setTaxPer] = useState();
    const [taxAmount, setTaxAmount] = useState();
    const [services, setServices] = useState();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const [clients, setClients] = useState();
    const [cjobs, setCjobs] = useState();
    const [jservices, setjServices] = useState();

    const alert = useAlert();
    const navigate = useNavigate();

    const getCustomers = () => {
        axios
            .get(`/api/admin/all-clients`, { headers })
            .then((res) => {
                setClients(res.data.clients);
            });
    }
    
    const clientJobs = (cid) => {
        axios
            .post(`/api/admin/get-client-jobs`, { cid }, { headers })
            .then((res) => {
                setCjobs(res.data.jobs);
            })
    }

    const getServices = (id) => {
        axios
            .get(`/api/admin/jobs/${id}`, { headers })
            .then((res) => {
                let r = res.data.job.jobservice;
                setjServices(r);
                setTimeout(() => {
                    document.querySelector('.subtotal').value = r[0].total;
                    document.querySelector('.total').innerHTML = r[0].total;
                    document.querySelector('.price').value = r[0].total;
                    document.querySelector('.job_hour').value = r[0].job_hour;
                    setSubtotal(r[0].total);
                }, 500);

            })
    }
    const changeTax = (tax) => {

        let sub = document.querySelector('.subtotal').value;
        document.querySelector('.total').value = 0;
        if (sub == '') { window.alert('Please enter subtotal'); return; }
        let ta = Math.ceil(((tax / 100) * sub));
        setTaxAmount(ta);
        document.querySelector('.total').innerHTML = parseFloat(ta) + parseFloat(sub);

    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
    if( customer == null ) { alert.error('Please select customer'); return;}
    if( jservices == null) { alert.error('Please select job'); return;}
    
    const sdata = [{
        'service': jservices[0].name,
        'description': $('.description').val(),
        'job_hour': $('.job_hour').val(),
        'price': $('.price').val(),
    }];
       
    const data = {
        customer: customer,
        job:job,
        services:(JSON.stringify(sdata)),
        due_date:(dueDate != undefined) ? dueDate : '',
        subtotal:parseFloat(subtotal),
        taxper:(taxper != undefined) ? taxper : 0,
        total_tax:(taxAmount != undefined) ? parseFloat(taxAmount) : 0,
        amount:parseFloat($('.total').text()),
        status:'sent'

    }
   
    axios.post(`/api/admin/add-invoice`,{ data },{ headers })
    .then((res)=>{
       alert.success('Invoice created successfully');
       setTimeout(()=>{
         navigate('/admin/invoices');
       },1000);
    })

    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="edit-customer">
                    <h1 className="page-title addEmployer">Create Invoice</h1>
                    <div className="card card-body">
                        <form>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="control-label">
                                            Customer
                                        </label>
                                        <select className='form-control' onChange={(e) => { setCustomer(e.target.value); clientJobs(e.target.value) }}>
                                            <option value={0}>-- select customer --</option>
                                            {
                                                clients && clients.map((c, i) => {
                                                    return (<option value={c.id}>{c.firstname + " " + c.lastname}</option>);
                                                })
                                            }

                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label className="control-label">
                                            Job
                                        </label>
                                        <select className='form-control' onChange={(e) => { setJob(e.target.value); getServices(e.target.value); }}>
                                            <option value={0}>-- select job --</option>
                                            {
                                                cjobs && cjobs.map((j, i) => {
                                                    return (
                                                        <option value={j.id}>{Moment(j.start_date).format('DD, MMM') + " | " + j.shifts}</option>
                                                    )
                                                })
                                            }
                                        </select>

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
                                                                value={js.name}
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
                                                                className="form-control description"
                                                                placeholder="Description"

                                                            />

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
                                                                className="form-control job_hour"
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
                                                                className="form-control price"
                                                                placeholder="Price"
                                                                required
                                                            />

                                                        </div>
                                                    </div>
                                                </div>


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
                                                                setSubtotal(e.target.value)
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
                                                                changeTax(e.target.value);
                                                            }

                                                            }
                                                            className="form-control"
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
                                            </>
                                        )
                                    })

                                }


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
        </div>
    )
}