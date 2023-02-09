import React, { useState,useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Moment from 'moment';
import Swal from 'sweetalert2';

export default function Schedule() {

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [pageCount, setPageCount] = useState(0);

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("admin-token"),
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    axios
        .get("/api/admin/schedule?page=" + currentPage, { headers })
        .then((response) => {
            if (response.data.schedules.data.length > 0) {
                setSchedules(response.data.schedules.data);
                setPageCount(response.data.schedules.last_page);
            } else {
                setLoading("No meeting scheduled yet");
            }
        });
  };

  const getSchedules = () =>{
     axios
     .get(`/api/admin/schedule`,{ headers })
     .then((response)=>{
      if (response.data.schedules.data.length > 0) {
        setSchedules(response.data.schedules.data);
        setPageCount(response.data.schedules.last_page);
    } else {
        setLoading("No meeting scheduled yet");
    }
     })
  }

  useEffect(()=>{
    getSchedules();
  },[]);

  const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete Meeting!",
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete(`/api/admin/schedule/${id}`, { headers })
                .then((response) => {
                    Swal.fire(
                        "Deleted!",
                        "Meeting has been deleted.",
                        "success"
                    );
                    setTimeout(() => {
                        getSchedules();
                    }, 1000);
                });
        }
    });
};

  return (
    <div id="container">
        <Sidebar/>
        <div id="content">
            <h1 className="page-title">Schedule meetings</h1>
            <div className='dashBox p-4'>
              <div className="table-responsive">
              { schedules.length > 0 ?(
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Meeting Attender</th>
                      <th scope="col">Scheduled</th>
                      <th scope="col">Booking Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules && schedules.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          {
                          item.team
                          ? item.team.name
                          :"NA"
                          }  
                          </td>
                        <td>
                          {Moment(item.start_date).format('DD/MM/Y')+'\n'}
                          <br/>
                          {Moment(item.start_date).format('dddd')}
                          <br/>
                          { "Start :"+item.start_time}
                          <br/>
                          { "End   :"+item.end_time}
                          </td>
                        <td>{item.booking_status}</td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/admin/view-schedule/${item.client.id}?sid=${item.id}`} className="ml-2 btn btn-warning">
                                <i className="fa fa-eye"></i>
                            </Link>
                            <div className="text-center">
                                <button className="ml-2 btn btn-danger" onClick={()=>handleDelete(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ):(
                <p className="text-center mt-5">{loading}</p>
              )}
              </div>
              { schedules.length > 0 ?(
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
                  ): '' }
            </div>
        </div>
    </div>
  )
}
