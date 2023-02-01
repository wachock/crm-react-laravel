import React, { useState } from "react";
export default function OfferedPriceFilter() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const handleFilter = () => {
        axios
            .get(
                "/api/admin/languages?language=" +
                language,
                { headers }
            )
            .then((response) => {
                getFilteredLanguage(response);
            });
    };
    const handleReset = () => {
        setLanguage("");        
        axios.get("/api/admin/languages", { headers }).then((response) => {
            getFilteredLanguage(response);
        });
    };
    return (
        <div className="row colFive">
            <div className="col-sm-3">
                <div className="form-group">
                    <label className="control-label">Service Name</label>
                    <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Please Select</option>
                        <option value="0">Planting</option>
                        <option value="1">Garden grass cutting</option>
                        <option value="2">Glass furnishing</option>
                        <option value="3">Door Mattings</option>
                        <option value="4">Windows Cleaning</option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label className="control-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label className="control-label">Client Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Client Name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label className="control-label">Status</label>
                    <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Please Select</option>
                        <option value="0">Enable</option>
                        <option value="1">Disable</option>
                    </select>
                </div>
            </div>           
 
            <div className="col-sm-3">
                <div className="form-group"> 
                <label className="control-label">&nbsp;</label>                 
                    <div className="d-flex">
                        <button
                            className="btn bg-purple filterBtn"
                            onClick={handleFilter}
                        >
                            <i className="fa fa-search"></i>
                        </button>
                        <button
                            className="ml-2 btn btn-danger filterBtn"
                            onClick={handleReset}
                        >
                            <i className="fa fa-undo"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}
