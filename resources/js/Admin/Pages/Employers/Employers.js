import React, { useState, useEffect } from "react";
import Sidebar from "../../Layouts/Sidebar";
import { Link } from "react-router-dom";
import UserFilter from "../../Components/Filter/UserFilter";
import ReactPaginate from "react-paginate";

export default function Employers() {
    const [employers, setEmployers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getEmployers = () => {
        axios.get("/api/admin/employers", { headers }).then((response) => {
            if (response.data.employers.data.length > 0) {
                setEmployers(response.data.employers.data);
                setPageCount(response.data.employers.last_page);
            } else {
                setLoading("No Employer found");
            }
        });
    };
    useEffect(() => {
        getEmployers();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/employers?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.employers.data.length > 0) {
                    setEmployers(response.data.employers.data);
                    setPageCount(response.data.employers.last_page);
                } else {
                    setLoading("No Employer found");
                }
            });
    };

    const getFilteredEmployers = (response) => {
        if (response.data.employers.data.length > 0) {
            setEmployers(response.data.employers.data);
            setPageCount(response.data.employers.last_page);
        } else {
            setEmployers([]);
            setPageCount(response.data.employers.last_page);
            setLoading("No Employer found");
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
            confirmButtonText: "Yes, Delete Employer!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/employers/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Employer has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getEmployers();
                        }, 1000);
                    });
            }
        });
    };

    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <h1 className="page-title">Employers</h1>
                <UserFilter getFilteredEmployers={getFilteredEmployers}/>
                <div className="boxPanel">
                    <div className="table-responsive">
                        {employers.length > 0 ? (
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Employer Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employers &&
                                        employers.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>
                                                    {item.firstname}{" "}
                                                    {item.lastname}
                                                </td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>
                                                {item.status == 0
                                                        ? "Inactive"
                                                        : "Active"}
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <Link
                                                            to={`/admin/edit-employer/${item.id}`}
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
                        {employers.length > 0 ? (
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
