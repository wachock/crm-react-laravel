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
      e.target.parentNode.parentNode.childNodes[3].style.display = 'none';
      e.target.parentNode.parentNode.childNodes[4].style.display = 'block';
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
  const getServices = () => {
    axios
      .get('/api/admin/all-services', { headers })
      .then((res) => {
        setAllServices(res.data.services);
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
      totalamount: ''
    }]);
    let v = e.target.value;
    let th = document.querySelectorAll('.table th');
    if (v == 'hourly') {
      th[0].style.width = "30%";
      th[2].style.display = "none";
      th[3].style.display = "table-cell";
      th[4].style.display = "table-cell";

    } else {
      th[0].style.width = "50%";
      th[2].style.display = "table-cell";
      th[3].style.display = "none";
      th[4].style.display = "none";
    }
  }

  let handleUpdate = (event) => {

    event.preventDefault();
    let to = 0;
    let ty = document.querySelector('.type').value;

    for (let t in formValues) {

      if (formValues[t].service == '' || formValues[t].service == 0) {
        alert.error("One of the service is not selected");
        return false;
      }
      if (formValues[t].frequency == '' || formValues[t].frequency == 0) {
        alert.error("One of the frequency is not selected");
        return false;
      }
      formValues[t].type = ty;
      if (ty == "hourly") {

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

    }

    const data = {
      client_id: client,
      status: status,
      total: to,
      services: JSON.stringify(formValues),
    }

    event.target.setAttribute('disabled', true);
    event.target.value = ('Sending..');
    axios
      .put(`/api/admin/offers/${param.id}`, data, { headers })
      .then((response) => {
        if (response.data.errors) {
          for (let e in response.data.errors) {
            alert.error(response.data.errors[e]);
          }
          document.querySelector('.saveBtn').removeAttribute('disabled');
          document.querySelector('.saveBtn').value = ('Save and Send');
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
        setDescription(d.description);
        setStatus(d.status);
        setType(d.type);
        setFormValues(JSON.parse(d.services));

      });
  }

  const getFrequency = () => {
    axios
      .get('/api/admin/all-service-schedule', { headers })
      .then((res) => {
        setAllFreq(res.data.schedules);
      })
  }

  useEffect(() => {
    getClients();
    getServices();
    getOffer();
    getFrequency();
  }, []);

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
                        <SelectPicker data={cData} defaultValue={client} value={client} onChange={(value, event) => setClient(value)} size="lg" required />
                    </div>
                    <div className="form-group">
                      <label className="control-label">Job Type</label>
                      <select value={type} onChange={e => { setType(e.target.value); handleJob(e) }} className="form-control type">
                        <option value="fixed" selected={type == "fixed"}>Fixed</option>
                        <option value="hourly" selected={type == "hourly"}>Hourly</option>
                      </select>
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
                                <th style={ type =='fixed' ? { width: "50%" }: { width:"30%"}}>Service</th>
                                <th style={ { width: "30%" }}>Frequency</th>
                                <th style={ type =='fixed' ? { width: "25%" } :{ display: "none" } }>Job Price</th>
                                <th style={ type =='fixed' ? { width: "16%", display: "none" } : { width: "16%"}}>Job Hours</th>
                                <th style={ type =='fixed' ? { width: "16%", display: "none" } : { width: "16%"} }>Rate Per Hour</th>
                            </tr>
                            </thead>
                            <tbody>
                              {formValues.map((element, index) => (
                                <tr key={index}>

                                  <td>
                                    <select name="service" className="form-control" value={element.service || ""} onChange={e => handleChange(index, e)} >
                                      <option selected> -- select --</option>
                                      {AllServices && AllServices.map((s, i) => {
                                        return (
                                          <option name={s.name} value={s.id}> {s.name} </option>
                                        )
                                      })}
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
                                  <td style={ (type == 'hourly') ? { "display": "none" } : {} }>
                                    <input type="number" name="fixed_price" value={element.fixed_price || ""} onChange={e => handleChange(index, e)} className="form-control jobprice" required placeholder="Enter job price" />
                                  </td>
                                  <td style={ (type != 'hourly') ? { "display": "none" } : {} }>
                                    <input type="number" name="jobHours" value={element.jobHours || ""} onChange={e => handleChange(index, e)} className="form-control jobhr"  required placeholder="Enter job Hrs" />
                                  </td>
                                  <td style={ (type != 'hourly') ? { "display": "none" } : {} }>
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
