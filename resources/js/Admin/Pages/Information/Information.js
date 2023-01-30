import React, { useEffect, useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export default function Information() {
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState("Loading...");

  const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getInformationPages = () => {
        axios.get("/api/admin/information-pages", { headers }).then((response) => {
            if (response.data.pages.data.length > 0) {
                setPages(response.data.pages.data);
                setPageCount(response.data.pages.last_page);
            } else {
                setLoading("No Page found");
            }
        });
    };

    useEffect(() => {
        getInformationPages();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/information-pages?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.pages.data.length > 0) {
                    setPages(response.data.pages.data);
                    setPageCount(response.data.pages.last_page);
                } else {
                    setLoading("No Page found");
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
            confirmButtonText: "Yes, Delete Information Page!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/information-pages/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Information Page has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getInformationPages();
                        }, 1000);
                    });
            }
        });
    };

  
  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <div className='titleBox customer-title'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h1 className="page-title">Information Pages</h1>
                    </div>
                    <div className='col-sm-6'>
                        <div className='text-right'>                          
                            <Link to='/admin/add-page' className='btn btn-success addButton'>Add Page</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='boxPanel'>
                <div className='table-responsive'>
                {pages.length > 0 ? (
                    <table className="table bg-white table-bordered">
                        <thead>
                            <tr>                                
                                <th className='text-center bg-dark-grey text-white'>Page</th>
                                <th className='text-center bg-dark-grey text-white'>Status</th>
                                <th className='text-center bg-dark-grey text-white text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages && pages.map((item, index) => (
                                <tr key={index}>                                   
                                    <td className='text-center'>{item.page}</td>
                                    <td className='text-center'>{item.status == 1 ? 'Enabled' : 'Disabled'}</td>
                                    <td className='text-center'>
                                        <div className="text-center">
                                            <Link
                                                to={`/admin/edit-page/${item.id}`}
                                                className="btn btn-success"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </Link>
                                            <button className="ml-2 btn btn-danger" onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                :
                (
                    <p className="text-center mt-5">{loading}</p>
                )
                }
                {pages.length > 0 ? (
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
  )
}
