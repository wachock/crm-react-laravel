import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import ReviewFilter from "../../Components/Filter/ReviewFilter";
import ReactPaginate from "react-paginate";

export default function Review() {
    const [reviews, setReviews] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getReviews = () => {
        axios.get("/api/admin/reviews", { headers }).then((response) => {
            if (response.data.reviews.data.length > 0) {
                setReviews(response.data.reviews.data);
                setPageCount(response.data.reviews.last_page);
            } else {
                setLoading("No Review found");
            }
        });
    };
    useEffect(() => {
        getReviews();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/reviews?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.reviews.data.length > 0) {
                    setReviews(response.data.reviews.data);
                    setPageCount(response.data.reviews.last_page);
                } else {
                    setLoading("No Review found");
                }
            });
    };

    const getFilteredReviews = (response) => {
        if (response.data.reviews.data.length > 0) {
            setReviews(response.data.reviews.data);
            setPageCount(response.data.reviews.last_page);
        } else {
            setReviews([]);
            setPageCount(response.data.reviews.last_page);
            setLoading("No Review found");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Review!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/reviews/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Review has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getReviews();
                        }, 1000);
                    });
            }
        });
    };

    return (
        <div id="container">
            <Sidebar />
            <div id="content" className="review-page">
                <div className="titleBox">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title revTitle">Reviews</h1>
                        </div>
                        <div className="col-sm-6">
                            <Link
                                to="/admin/add-review"
                                className="btn btn-success addButton"
                            >
                                Add Review
                            </Link>
                        </div>
                    </div>
                </div>
                <ReviewFilter getFilteredReviews={getFilteredReviews} />
                <div className="boxPanel">
                    <div className="table-responsive">
                        {reviews.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Author</th>
                                        <th className="text-center" scope="col">
                                            Rating
                                        </th>
                                        <th scope="col">Date Added</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviews &&
                                        reviews.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.job.title}</td>
                                                <td>{item.author}</td>
                                                <td className="text-center">
                                                    {item.rating} Star
                                                </td>
                                                <td>{item.date}</td>
                                                <td>{item.status == 1 ? 'Enabled' : 'Disabled'}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link
                                                            to={`/admin/edit-review/${item.id}`}
                                                            className="btn btn-success"
                                                        >
                                                            <i className="fa fa-pencil"></i>
                                                        </Link>
                                                        <button
                                                            className="ml-2 btn btn-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center mt-5">{loading}</p>
                        )}
                        {reviews.length > 0 ? (
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={
                                    "pagination justify-content-end mt-3"
                                }
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
