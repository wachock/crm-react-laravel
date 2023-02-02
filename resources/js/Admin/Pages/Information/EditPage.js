import React, { useEffect, useState } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
    const [page, setPage] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState("");
    const params = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            page: page,
            content: content,
            status: status,
        };
        axios
            .put(`/api/admin/information-pages/${params.id}`, data, { headers })
            .then((response) => {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    alert.success(
                        "Information Page has been updated successfully"
                    );
                    setTimeout(() => {
                        navigate("/admin/information-pages");
                    }, 1000);
                }
            });
    };

    const getInformationPage = () => {
        axios
            .get(`/api/admin/information-pages/${params.id}/edit`, { headers })
            .then((response) => {
                setPage(response.data.page.page);
                setContent(response.data.page.content);               
                setStatus(response.data.page.status);
            });
    };
    useEffect(() => {
        getInformationPage();
    }, []);

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="user-page">
                    <h1 className="page-title addinfoPage">Edit Page</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Page</label>
                            <input
                                type="text"
                                className="form-control"
                                name="page"
                                placeholder="Page"
                                value={page}
                                onChange={(e) => setPage(e.target.value)}
                            />
                            {errors.page ? (
                                <small className="text-danger mb-1">
                                    {errors.page}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Content</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                            />
                            {errors.content ? (
                                <small className="text-danger mb-1">
                                    {errors.content}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>Please select</option>
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                            </select>
                            {errors.status ? (
                                <small className="text-danger mb-1">
                                    {errors.status}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group text-center">
                            <button
                                className="btn btn-danger saveBtn"
                                onClick={handleSubmit}
                            >
                                SAVE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}