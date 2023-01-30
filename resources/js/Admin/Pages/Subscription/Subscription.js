import axios from "axios";
import React, { useEffect, useState } from "react";
import SubscriptionFilter from "../../Components/Filter/SubscriptionFilter";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getSubscriptions = () => {
        axios.get("/api/admin/subscriptions", { headers }).then((response) => {
            if (response.data.subscriptions.data.length > 0) {
                setSubscriptions(response.data.subscriptions.data);
                setPageCount(response.data.subscriptions.last_page);
            } else {
                setLoading("No Subscription found");
            }
        });
    };

    useEffect(() => {
        getSubscriptions();
    }, []);

    const getFilteredSubscriptions = (response) => {
        if (response.data.subscriptions.data.length > 0) {
            setSubscriptions(response.data.subscriptions.data);
            setPageCount(response.data.subscriptions.last_page);
        } else {
            setSubscriptions([]);
            setPageCount(response.data.subscriptions.last_page);
            setLoading("No Subscription found");
        }
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/subscriptions?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.subscriptions.data.length > 0) {
                    setSubscriptions(response.data.subscriptions.data);
                    setPageCount(response.data.subscriptions.last_page);
                } else {
                    setLoading("No Subscription found");
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Subscription!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/subscriptions/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Subscription has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getSubscriptions();
                        }, 1000);
                    });
            }
        });
    };
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title adSubscrip">
                                Subscription
                            </h1>
                        </div>
                        <div className="col-sm-6">
                            <Link
                                to="/admin/add-subscription"
                                className="btn btn-success addButton"
                            >
                                Add Subscription
                            </Link>
                        </div>
                    </div>
                </div>
                <SubscriptionFilter
                    getFilteredSubscriptions={getFilteredSubscriptions}
                />
                <div className="boxPanel">
                {subscriptions.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table bg-white table-bordered">
                            <thead>
                                <tr>
                                    <th className="bg-dark-grey text-white">
                                        Date
                                    </th>
                                    <th className="bg-dark-grey text-white">
                                        Employer Name
                                    </th>
                                    <th className="bg-dark-grey text-white text-center">
                                        Plan
                                    </th>
                                    <th className="bg-dark-grey text-white text-center">
                                        Valid From
                                    </th>
                                    <th className="bg-dark-grey text-white text-center">
                                        Valid Upto
                                    </th>
                                    <th className="bg-dark-grey text-white text-center">
                                        Status
                                    </th>
                                    <th className="bg-dark-grey text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions &&
                                    subscriptions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.created_at}</td>
                                            <td>
                                                {item.employer.firstname}{" "}
                                                {item.employer.lastname}
                                            </td>
                                            <td className="text-center">
                                                {item.plan.name}
                                            </td>
                                            <td className="text-center">
                                                {item.valid_from}
                                            </td>
                                            <td className="text-center">
                                                {item.valid_upto}
                                            </td>
                                            <td className="text-center">
                                                {item.status == 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <Link
                                                        to={`/admin/edit-subscription/${item.id}`}
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
                    </div>
                )
                :
                (
                    <p className="text-center mt-5">{loading}</p>
                )
                }
                {subscriptions.length > 0 ? (
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
    );
}
