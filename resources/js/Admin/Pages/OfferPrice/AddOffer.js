import React, { useState , useEffect} from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export default function AddOffer() {

  const alert               = useAlert();
  const navigate            = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const cid = parseInt(queryParams.get("c"));
  const [client, setClient] = useState((cid != null) ? cid : "");
  const [formValues, setFormValues] = useState([{ service: "",jobHours:"",rateperhour:'',totalamount:''}])
  const [AllClients,setAllClients]   = useState([]);
  const [AllServices,setAllServices] = useState([]);
  

  let handleChange = (i, e) => {
        
        let newFormValues = [...formValues];
         
          var h = e.target.parentNode.parentNode.childNodes[1].childNodes[0].value;
          var rh = e.target.parentNode.parentNode.childNodes[2].childNodes[0].value;
          if(rh != '' && h != '')
          e.target.parentNode.parentNode.childNodes[3].childNodes[0].setAttribute('value',h*rh);
  
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
  let addFormFields = () => {
        setFormValues([...formValues, { service: "",jobHours:"",rateperhour:'',totalamount:''}])
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

  const getClients = () =>{
       axios
       .get('/api/admin/all-clients',{headers})
       .then((res)=>{
         setAllClients(res.data.clients);
       })
       
    }
    const getServices = () =>{
        axios
        .get('/api/admin/all-services',{headers})
        .then((res)=>{
          setAllServices(res.data.services);
        })
     }
     useEffect(()=>{
        getClients();
        getServices();
    },[]);

     const cData = AllClients.map((c,i)=>{
       return {value:c.id,label:(c.firstname+' '+c.lastname)}; 
    });
   
   
  let handleSubmit = (event) => { 
       
        event.preventDefault();
        let to = 0;
        for( let t in formValues){
          if(formValues[t].service == '' || formValues[t].service == '-- select --'){
             alert.error("One of the service is not selected");
             return false;
          }
          if(formValues[t].jobHours == ''){
            alert.error("One of the job hours value is missing");
            return false;
         }
         if(formValues[t].service == ''){
          alert.error("One of the rate per hour value is missing");
          return false;
          }
          formValues[t].totalamount = ( formValues[t].jobHours * formValues[t].rateperhour);
           to += parseInt(formValues[t].totalamount);
        }

         const data = {
            client_id  :client,
            status:'sent',
            total:to,
            services : JSON.stringify(formValues),
         }
        
         event.target.setAttribute('disabled',true);
         event.target.value = ('Sending..');
         axios
             .post(`/api/admin/offers`, data, { headers })
             .then((response) => {
                 if (response.data.errors) {
                   for( let e in response.data.errors){
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
  
  return (
    <div id="container">
      <Sidebar/>
      <div id='content'>
        <div className="AddOffer">
          <h1 className="page-title addEmployer">Add Offer</h1>
          <div className='card'>
            <div className='card-body'>
              <form>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className="form-group">
                      <div className="form-group">
                                <label className="control-label">Client Name</label>
                                <SelectPicker data={cData}   value={client}  onChange={(value,event)=>setClient(value)} size="lg" required/>
                            </div>
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
                                <th style={{width:"50%"}}>service</th>
                                <th style={{width:"16%"}}>Job Hours</th>
                                <th style={{width:"16%"}}>Rate Per Hour</th>
                                <th style={{width:"16%"}}>Total Amount</th>
                                <th style={{width:"6%"}}></th>
                              </tr>
                            </thead>
                            <tbody>
                              {formValues.map((element, index) => (
                              <tr key={index}>
                                
                                <td>
                                  <select name="service" className="form-control" value={element.service || "" } onChange={e => handleChange(index, e)} >
                                    <option selected> -- select --</option>
                                   { AllServices && AllServices.map((s,i)=>{
                                     return (
                                        <option value={s.id}> {s.name} </option>
                                     )
                                   })}
                                  </select>
                                </td>
                                <td>
                                  <input type="number" name="jobHours" value={element.jobHours || "" } onChange={e => handleChange(index, e)} className="form-control" required placeholder="Enter job Hrs" />
                                </td>
                                <td>
                                  <input type="text" name="rateperhour" value={element.rateperhour || ""} onChange={e => handleChange(index, e)} className="form-control" required placeholder="Enter rate P/Hr"/>
                                </td>
                                <td>
                                  <input type="text" name="totalamount" readonly disabled className="form-control" required  placeholder="Total"/>
                                </td>
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
                    <input type="submit" value="Save and Send" className="btn btn-pink saveBtn" onClick={handleSubmit}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
