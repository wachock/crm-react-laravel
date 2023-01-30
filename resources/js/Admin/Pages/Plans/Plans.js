import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Sidebar from '../../Layouts/Sidebar'

export default function Plans() {
    const [plans, setPlans] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState("Loading...");
  
    const headers = {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("admin-token"),
      };
  
      const getPlans = () => {
          axios.get("/api/admin/plans", { headers }).then((response) => {
              if (response.data.plans.data.length > 0) {
                  setPlans(response.data.plans.data);
                  setPageCount(response.data.plans.last_page);
              } else {
                  setLoading("No Plan found");
              }
          });
      };
  
      useEffect(() => {
          getPlans();
      }, []);
  
      const handlePageClick = async (data) => {
          let currentPage = data.selected + 1;
          axios
              .get("/api/admin/plans?page=" + currentPage, { headers })
              .then((response) => {
                  if (response.data.plans.data.length > 0) {
                      setPlans(response.data.plans.data);
                      setPageCount(response.data.plans.last_page);
                  } else {
                      setLoading("No Plan found");
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
              confirmButtonText: "Yes, Delete Plan!",
          }).then((result) => {
              if (result.isConfirmed) {
                  axios
                      .delete(`/api/admin/plans/${id}`, { headers })
                      .then((response) => {
                          Swal.fire(
                              "Deleted!",
                              "Plan has been deleted.",
                              "success"
                          );
                          setTimeout(() => {
                              getPlans();
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
                          <h1 className="page-title">Plans</h1>
                      </div>
                      <div className='col-sm-6'>
                          <div className='text-right'>                          
                              <Link to='/admin/add-plan' className='btn btn-success addButton'>Add Plan</Link>
                          </div>
                      </div>
                  </div>
              </div>

              <div className='boxPanel'>
                  <div className='table-responsive'>
                  {plans.length > 0 ? (
                      <table className="table bg-white table-bordered">
                          <thead>
                              <tr>
                                  <th className='text-center bg-dark-grey text-white'>Plan</th>
                                  <th className='text-center bg-dark-grey text-white'>Price</th>
                                  <th className='text-center bg-dark-grey text-white'>Billing Cycle</th>
                                  <th className='text-center bg-dark-grey text-white'>Status</th>
                                  <th className='text-center bg-dark-grey text-white text-center'>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {plans && plans.map((item, index) => (
                                  <tr key={index}>
                                      <td className='text-center'>{item.name}</td>
                                      <td className='text-center'>{item.price}</td>
                                      <td className='text-center'>{item.cycle}</td>
                                      <td className='text-center'>{item.status == 1 ? 'Enabled' : 'Disabled'}</td>
                                      <td className='text-center'>
                                          <div className="text-center">
                                              <Link
                                                  to={`/admin/edit-plan/${item.id}`}
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
                  {plans.length > 0 ? (
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