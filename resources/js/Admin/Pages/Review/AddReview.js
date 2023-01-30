import React, { useEffect, useState } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { SelectPicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

export default function AddReview() {
    const [author, setAuthor] = useState("");
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
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
            author: author,
            job_id: job,
            review: review,
            rating: rating,
            date: date,
            status: status,
        };
        axios.post(`/api/admin/reviews`, data, { headers }).then((response) => {
            if (response.data.errors) {
                setErrors(response.data.errors);
            } else {
                alert.success("Review has been created successfully");
                setTimeout(() => {
                    navigate("/admin/reviews");
                }, 1000);
            }
        });
    };

    const getJobs = () => {
        axios.get("/api/admin/reviews/create", { headers }).then((response) => {
            if (response.data.jobs.length > 0) {
                setJobs(response.data.jobs);
            } else {
                setJobs([]);
            }
        });
    };
    useEffect(() => {
        getJobs();
    }, []);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="vendor-page">
                    <h1 className="page-title addReview">Add Review</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Author *</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                className="form-control"
                                name="name"
                                placeholder="Author Name"
                            />
                            {errors.author ? (
                                <small className="text-danger mb-1">
                                    {errors.author}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Choose Job *
                            </label>
                            <SelectPicker
                                data={
                                    jobs &&
                                    jobs.map((item) => ({
                                        label: item.title,
                                        value: item.id,
                                    }))
                                }
                                onChange={(e) => setJob(e)}
                                value={job ? job : ""}
                            />
                            {errors.job_id ? (
                                <small className="text-danger mb-1">
                                    {errors.job_id}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Review Text</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review"
                            ></textarea>
                            {errors.review ? (
                                <small className="text-danger mb-1">
                                    {errors.review}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Rating *</label>
                            <div id="input-rating">
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="1"
                                        id="input-rating-1"
                                        onClick={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="form-check-input"
                                        defaultChecked={
                                            rating === "1" ? true : false
                                        }
                                    />
                                    <label
                                        htmlFor="input-rating-1"
                                        className="form-check-label"
                                    >
                                        1
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="2"
                                        id="input-rating-2"
                                        onClick={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="form-check-input"
                                        defaultChecked={
                                            rating === "2" ? true : false
                                        }
                                    />
                                    <label
                                        htmlFor="input-rating-2"
                                        className="form-check-label"
                                    >
                                        2
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="3"
                                        id="input-rating-3"
                                        onClick={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="form-check-input"
                                        defaultChecked={
                                            rating === "3" ? true : false
                                        }
                                    />
                                    <label
                                        htmlFor="input-rating-3"
                                        className="form-check-label"
                                    >
                                        3
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="4"
                                        id="input-rating-4"
                                        onClick={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="form-check-input"
                                        defaultChecked={
                                            rating === "4" ? true : false
                                        }
                                    />
                                    <label
                                        htmlFor="input-rating-4"
                                        className="form-check-label"
                                    >
                                        4
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="5"
                                        id="input-rating-5"
                                        onClick={(e) =>
                                            setRating(e.target.value)
                                        }
                                        className="form-check-input"
                                        defaultChecked={
                                            rating === "5" ? true : false
                                        }
                                    />
                                    <label
                                        htmlFor="input-rating-5"
                                        className="form-check-label"
                                    >
                                        5
                                    </label>
                                </div>
                            </div>
                            {errors.rating ? (
                                <small className="text-danger mb-1">
                                    {errors.rating}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Date Added</label>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Date Added"
                                id="input-date-added"
                                className="form-control datetime"
                            />
                            {errors.date ? (
                                <small className="text-danger mb-1">
                                    {errors.date}
                                </small>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Please select</option>
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
