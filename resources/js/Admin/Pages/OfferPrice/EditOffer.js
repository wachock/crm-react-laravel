import React, { useState, useEffect } from "react";
import Sidebar from '../../Layouts/Sidebar'
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { SelectPicker } from 'rsuite';

export default function EditOffer() {

  const alert = useAlert();
  const navigate = useNavigate();
  const param = useParams();
  const [type, setType] = useState();
  const [client, setClient] = useState("");
  const [formValues, setFormValues] = useState([{
    service: "",
    name: "",
    type: "",
    freq_name: "",
    frequency: "",
    fixed_price: "",
    jobHours: "",
    rateperhour: '',
    other_title:'',
    totalamount: ''
  }])
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [AllClients, setAllClients] = useState([]);
  const [AllServices, setAllServices] = useState([]);
  const [AllFreq, setAllFreq] = useState([]);
  let handleChange = (i, e) => {

    let newFormValues = [...formValues];

    var h = e.target.parentNode.parentNode.childNodes[1].childNodes[0].value;
    var rh = e.target.parentNode.parentNode.childNodes[2].childNodes[0].value;
    if (rh != '' && h != '') {
     // e.target.parentNode.parentNode.childNodes[3].style.display = 'none';
      //e.target.parentNode.parentNode.childNodes[4].style.display = 'block';
      e.target.parentNode.parentNode.childNodes[4].childNodes[0].setAttribute('value', h * rh);
    }

    newFormValues[i][e.target.name] = e.target.value;
    if (e.target.name == 'service') {
      newFormValues[i]['name'] = e.target.options[e.target.selectedIndex].getAttribute('name');
    }
    if (e.target.name == 'frequency') {
      newFormValues[i]['freq_name'] = e.target.options[e.target.selectedIndex].getAttribute('name');
    }
    setFormValues(newFormValues);
  }
  let addFormFields = () => {
    setFormValues([...formValues, {
      service: "",
      name: "",
      type: "",
      freq_name: "",
      frequency: "",
      fixed_price: "",
      jobHours: "",
      rateperhour: '',
      other_title:'',
      totalamount: ''
    }])
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  const getClients = () => {
    axios
      .get('/api/admin/all-clients', { headers })
      .then((res) => {
        setAllClients(res.data.clients);
      })

  }
  const getServices = (lng) => {
    axios
      .post('/api/admin/all-services',{lng}, { headers })
      .then((res) => {
        setAllServices(res.data.services);
      })
  }

  const handleServiceLng = (client) =>{
    axios
    .get(`/api/admin/clients/${client}`,{headers})
    .then((res)=>{
      getServices(res.data.client.lng);
      getFrequency(res.data.client.lng);
    })
  }

  const cData = AllClients.map((c, i) => {
    return { value: c.id, label: (c.firstname + ' ' + c.lastname) };
  });

  const handleJob = (e) => {
    e.preventDefault();
    setFormValues([{
      service: "",
      name: "",
      type: "",
      freq_name: "",
      frequency: "",
      fixed_price: "",
      jobHours: "",
      rateperhour: '',
      other_title:'',
      totalamount: ''
    }]);
    let v = e.target.value;
    let th = document.querySelectorAll('.table th');
    if (v == 'hourly') {

      th[3].style.display = "none";
      th[4].style.display = "table-cell";

    } else {
      th[3].style.display = "table-cell";
      th[4].style.display = "none";
    }
  }

  const handleType = (e) => {

    let fixed_field    = e.target.parentNode.nextSibling.nextElementSibling.nextElementSibling;
    let per_hour_field = e.target.parentNode.nextSibling.nextElementSibling.nextElementSibling.nextElementSibling;
    
    if(e.target.value == 'hourly'){
        fixed_field.style.display = 'none';
        per_hour_field.style.display='block';
      } else  {
        fixed_field.style.display = 'block';
        per_hour_field.style.display='none';

      }
  }

  let handleUpdate = (event) => {

    event.preventDefault();
    let to = 0;
    let taxper = 17;

    for (let t in formValues) {

      if (formValues[t].service == '' || formValues[t].service == 0) {
        alert.error("One of the service is not selected");
        return false;
      }

      if (formValues[t].frequency == '' || formValues[t].frequency == 0) {
        alert.error("One of the frequency is not selected");
        return false;
      }
      (!formValues[t].type) ? formValues[t].type ='fixed':'';
      if (formValues[t].type == "hourly") {

        if (formValues[t].jobHours == '') {
          alert.error("One of the job hours value is missing");
          return false;
        }
        if (formValues[t].service == '') {
          alert.error("One of the rate per hour value is missing");
          return false;
        }
        formValues[t].totalamount = parseInt(formValues[t].jobHours * formValues[t].rateperhour);
        to += parseInt(formValues[t].totalamount);


      } else {
        
        if (formValues[t].fixed_price == '') {
          alert.error("One of the job price is missing");
          return false;
        }
        formValues[t].totalamount = parseInt(formValues[t].fixed_price);
        to += parseInt(formValues[t].fixed_price);
      }
      let ot = document.querySelector('#other_title'+t);
      
       if (formValues[t].service == '10' && ot != undefined) {
          if (formValues[t].other_title == '') { alert.error('Other title cannot be blank'); return false; }
          formValues[t].other_title = document.querySelector('#other_title'+t).value;
          console.log(document.querySelector('#other_title'+t).value);
      }
     

    }
    
    let tax = (taxper/100) * to;
    const data = {
      client_id: client,
      status: status,
      subtotal:to,
      total: to+tax,
      services: JSON.stringify(formValues),
      action:event.target.value,
    }
    

    event.target.setAttribute('disabled1', true);
    event.target.value = (event.target.value == 'Save') ? ('Saving..') :('Sending..');
    axios
      .put(`/api/admin/offers/${param.id}`, data, { headers })
      .then((response) => {
        if (response.data.errors) {
          for (let e in response.data.errors) {
            alert.error(response.data.errors[e]);
          }
          document.querySelector('.saveBtn').removeAttribute('disabled1');
          document.querySelector('.saveBtn').value = (event.target.value == 'Save') ? ('Save') : ('Save and Send');
        } else {
          alert.success(response.data.message);
          setTimeout(() => {
            navigate(`/admin/offered-price`);
          }, 1000);
        }
      });

  }

  const getOffer = () => {
    axios
      .get(`/api/admin/offers/${param.id}/edit`, { headers })
      .then((res) => {
        const d = res.data.offer[0];
        setClient(d.client_id);
        handleServiceLng(d.client_id);
        setDescription(d.description);
        setStatus(d.status);
        setType(d.type);
        setFormValues(JSON.parse(d.services));

      });
  }

  const getFrequency = (lng) => {
    axios
      .post('/api/admin/all-service-schedule',{lng}, { headers })
      .then((res) => {
        setAllFreq(res.data.schedules);
      })
  }
 

  useEffect(() => {
    getClients();
    getOffer();
  }, []);

  const handleOther = (e) => {
   
    let el = e.target.parentNode.lastChild;
    if (e.target.value == 10) {
     
      el.style.display = 'block'
      el.style.marginBlock = "8px";
      el.style.width="150%";
    } else {
     
      el.style.display = 'none'
    }
  }

  return (
    <div id="container">
      <Sidebar />
      <div id='content'>
        <div className="AddOffer">
          <h1 className="page-title addEmployer">Edit Offer</h1>
          <div className='card'>
            <div className='card-body'>
              <form>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className="form-group">
                        <label className="control-label">Client Name</label>
                        <SelectPicker data={cData} defaultValue={client} value={client} onChange={(value, event) => {setClient(value);handleServiceLng(value)}} size="lg" required />
                    </div>
                   

                    <div className="card card-dark">
                      <div className="card-header card-black">
                        <h3 class="card-title">Services</h3>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table class="table table-sm">
                            <thead>
                            <tr>
                                <th style={ { width: "20"  }}>Service</th>
                                <th style={ { width: "20%" }}>Type</th>
                                <th style={ { width: "20%" }}>Frequency</th>
                                <th style={ { width: "20%" }}>Job Hours</th>
                                <th style={ { width: "20%" }}>Job Price</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                              {formValues.map((element, index) => (
                                <tr key={index}>

                                  <td>
                                    <select name="service" className="form-control" value={element.service || ""} onChange={e => {handleChange(index, e); handleOther(e);}} >
                                      <option selected> -- select --</option>
                                      {AllServices && AllServices.map((s, i) => {
                                        return (
                                          <option name={s.name} value={s.id}> {s.name} </option>
                                        )
                                      })}
                                    </select>
                                    <textarea type="text" name="other_title" id={`other_title_${index}`} placeholder='Service Title'   style={(!element.other_title) ? { "display": "none" } : {marginBlock:"8px",width:"150%"}} className="form-control" value={element.other_title || ""} onChange={e => handleChange(index, e)} />
                                  </td>
                                  
                                  <td>
                                    <select name="type" className="form-control" value={element.type || ""} onChange={(e) => {handleChange(index, e);handleType(e)}} >
                                      <option selected value="fixed">Fixed</option>
                                      <option selected value="hourly">Hourly</option>
                                    </select>
                                  </td>
                                  <td>
                                    <select name="frequency" className="form-control" value={element.frequency || ""} onChange={e => handleChange(index, e)} >
                                      <option selected value={0}> -- Please select --</option>
                                      {AllFreq && AllFreq.map((s, i) => {
                                        return (
                                          <option name={s.name} value={s.id}> {s.name} </option>
                                        )
                                      })}
                                    </select>
                                  </td>
                                  <td>
                                    <input type="number" name="jobHours" value={element.jobHours || ""} onChange={e => handleChange(index, e)} className="form-control jobhr"  required placeholder="Enter job Hrs" />
                                  </td>
                                  <td style={ (element.type == 'hourly') ? { "display": "none" } : {} }>
                                    <input type="number" name="fixed_price" value={element.fixed_price || ""} onChange={e => handleChange(index, e)} className="form-control jobprice" required placeholder="Enter job price" />
                                  </td>
                                  <td style={ (element.type != 'hourly') ? { "display": "none" } : {} }>
                                    <input type="text" name="rateperhour" value={element.rateperhour || ""} onChange={e => handleChange(index, e)} className="form-control jobrate" required placeholder="Enter rate P/Hr" />
                                  </td>
                                  {/*<td>
                                  <input type="text" name="totalamount" readonly disabled className="form-control" required  placeholder="Total"/>
                                  </td>*/}
                                  <td class="text-right"><button className="ml-2 btn bg-red" onClick={() => removeFormFields(index)}><i className="fa fa-minus"></i></button></td>
                                </tr>
                              ))}

                            </tbody>

                            <tfoot>
                              <tr>
                                <td class="text-right" colSpan="6">
                                  <button type="button" class="btn bg-green" onClick={() => addFormFields()}><i class="fa fa-plus"></i></button>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                <input type="submit" value="Save" className="btn btn-success saveBtn" onClick={handleUpdate} style={{'margin-inline':'6px'}} />
                  <input type="submit" value="Save and Send" className="btn btn-pink saveBtn" onClick={handleUpdate} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
