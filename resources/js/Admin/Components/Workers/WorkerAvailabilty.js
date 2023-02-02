import React,{useState,useEffect} from 'react'
import { useAlert } from "react-alert";
import { useParams,useNavigate,Link } from "react-router-dom";

export default function WorkerAvailabilty() {
    const [formValues, setFormValues] = useState([{ date: "",working:"day",status:'0'}])
    const [errors, setErrors] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { date: "",working:"day",status:'0'}])
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

     let handleSubmit = (event) => {
        event.preventDefault();
         const data = {
        "availabilty": JSON.stringify(formValues),
         }

        axios
            .put(`/api/admin/update_availability/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success("Worker Availabilty Updated Successfully");
                    setTimeout(() => {
                        navigate(`/admin/view-worker/${params.id}`);
                    }, 1000);
                }
            });
        // alert(JSON.stringify(formValues));
    }
     const getWorkerAvailabilty = () => {
        axios
            .get(`/api/admin/worker_availability/${params.id}`, { headers })
            .then((response) => {
                if(response.data.availability){
                    setFormValues(response.data.availability);
                }
            });
    };
    useEffect(() => {
        getWorkerAvailabilty();
    }, []);
  return (
    <div className="boxPanel">
        <button className="btn btn-success button add slotBtn" type="button" onClick={() => addFormFields()}>Add Availabilty</button>
          <form  onSubmit={handleSubmit}>
         <div >
              <div className='row'>
                <div className='col-sm-3'>
                  <div className="form-group">
                    <label className='control-label'>Date</label>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className="form-group">
                     <label className="control-label">Work Period</label>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className="form-group">
                     <label className="control-label">Availabilty</label>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='form-group'>
                    <label className='control-label'>Action</label>
                  </div>
                </div>
              </div>
            </div> 
         {formValues.map((element, index) => (
            <div key={index}>
              <div className='row'>
                <div className='col-sm-3'>
                  <div className="form-group">
                    <input required type="date" name="date" className='form-control' placeholder='Name of the location' value={element.date || ""} onChange={e => handleChange(index, e)} />
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className="form-group">
                                <select required className="form-control" name="working" value={element.working || ""} onChange={e => handleChange(index, e)}>
                                    <option value="day">Day 8-16 P.M </option>
                                    <option value="night">Noon</option>
                                    <option value="full">Full</option>
                                </select>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className="form-group">
                                <select required className="form-control" name="status" value={element.status || ""} onChange={e => handleChange(index, e)}>
                                    <option value="0">Not Available</option>
                                    <option value="1">Available</option>
                                </select>
                  </div>
                </div>
                <div className='col-sm-3'>
                  <div className='form-group'>
                    <label className='control-label'>&nbsp;</label>
                    {
                      index ? 
                      <button type="button"  className="btn btn-danger remove saveBtn mt-4" onClick={() => removeFormFields(index)}>Remove</button> 
                      : null
                    }
                  </div>
                </div>
              </div>
            </div> 
          ))}
          <div className="text-center mt-3">
                          <button className="btn btn-danger button submit saveBtn" type="submit">SAVE</button>
                      </div>
                    </form>
    </div>
  )
}
