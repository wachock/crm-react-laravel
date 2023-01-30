import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";

export default function General() {
    const [title, setTitle] = useState("");
    const [facebook, setFacebook] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [file, setFile] = useState("");
    const [logo, setLogo] = useState("");
    const [errors, setErrors] = useState([]);
    const alert = useAlert();

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setLogo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("logo", logo);
        formData.append("facebook", facebook);
        formData.append("twitter", twitter);
        formData.append("instagram", instagram);
        formData.append("linkedin", linkedin);             
        axios
            .post(`/api/admin/general-settings`, formData, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success(
                        "General settings has been updated successfully"
                    );
                }
            });
    };

    const getSetting = () => {
        axios.get("/api/admin/general-settings", { headers }).then((response) => {           
                setTitle(response.data.setting.title);
                setFile(response.data.setting.logo);   
                setFacebook(response.data.setting.facebook);           
                setTwitter(response.data.setting.twitter);     
                setInstagram(response.data.setting.instagram);     
                setLinkedin(response.data.setting.linkedin);     
        });
    };
    useEffect(() => {
        getSetting();
    }, []);

    return (
        <form>
            <div className="form-group">
                <label className="control-label">Site Title</label>
                <input
                    type="text"
                    className="form-control"                    
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Site Title"
                />
                {errors.title ? (
                    <small className="text-danger mb-1">{errors.title}</small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group">
                <label className="control-label" style={{ display: "block" }}>
                    Upload Logo
                </label>
                <input
                    type="file"
                    onChange={handleChange}
                    style={{
                        display: "block",
                        height: "unset",
                        border: "none",
                    }}
                />
                <img
                    src={file}
                    className="img-fluid mt-2"
                    style={{ maxWidth: "200px" }}
                />
            </div>
            <div className="form-group">
                <label className="control-label">Social Media</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="Facebook"
                />
                {errors.facebook ? (
                    <small className="text-danger mb-1">
                        Please enter facebook link.
                    </small>
                ) : (
                    ""
                )}
                <input
                    type="text"
                    className="form-control mb-2"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="Twitter"
                />
                {errors.twitter ? (
                    <small className="text-danger mb-1"> Please enter twitter link.</small>
                ) : (
                    ""
                )}
                <input
                    type="text"
                    className="form-control mb-2"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Instagram"
                />
                {errors.instagram ? (
                    <small className="text-danger mb-1">
                        Please enter instagram link.
                    </small>
                ) : (
                    ""
                )}
                <input
                    type="text"
                    className="form-control"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="Linkedin"
                />
                {errors.linkedin ? (
                    <small className="text-danger mb-1">
                         Please enter linkedin link.
                    </small>
                ) : (
                    ""
                )}
            </div>
            <div className="form-group text-center">
                <input
                    type="submit"
                    value="UPDATE"
                    onClick={handleSubmit}
                    className="btn btn-danger saveBtn"
                />
            </div>
        </form>
    );
}
