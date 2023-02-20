import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layouts/ClientSidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Moment from 'moment';
import Swal from 'sweetalert2';

export default function Schedule() {

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [pageCount, setPageCount] = useState(0);
  const id                        = localStorage.getItem('client-id'); 
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: `Bearer ` + localStorage.getItem("client-token"),
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    axios
      .post("/api/client/schedule?page=" + currentPage,{id:id} ,{ headers })
      .then((response) => {
        if (response.data.schedules.data.length > 0) {
          setSchedules(response.data.schedules.data);
          setPageCount(response.data.schedules.last_page);
        } else {
          setLoading("No meeting scheduled yet");
        }
      });
  };

  const getSchedules = () => {
    axios
      .post(`/api/client/schedule`,{id:id}, { headers })
      .then((response) => {
        if (response.data.schedules.data.length > 0) {
          setSchedules(response.data.schedules.data);
          setPageCount(response.data.schedules.last_page);
        } else {
          setLoading("No meeting scheduled yet");
        }
      })
  }

  const filterSchedules = (e) => {
    axios
    .post(`/api/client/schedule?q=${e.target.value}`,{id:id}, { headers })
    .then((response) => {
      if (response.data.schedules.data.length > 0) {
        setSchedules(response.data.schedules.data);
        setPageCount(response.data.schedules.last_page);
      } else {
        setSchedules([]);
        setPageCount(response.data.schedules.last_page);
        setLoading("No meeting found");
      }
    })
  }

  useEffect(() => {
    getSchedules();
  }, []);

 
  return (
    <div id="container">
      <Sidebar />
      <div id="content">
        <div className="titleBox customer-title">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="page-title">Schedule meetings</h1>
            </div>
            <div className="col-sm-6">
              <div className="search-data">
                <input type='text' className="form-control" onChange={filterSchedules} placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="boxPanel">
              <div className="table-responsive">
                {schedules.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Meeting Attender</th>
                        <th scope="col">Scheduled</th>
                        <th scope="col">Booking Status</th>
                        <th scope="col">Files</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {schedules && schedules.map((item, index) => {

                        return (
                          <tr key={index}>
                            <td>#{item.id}</td>
                            
                            <td>
                              {
                                item.team
                                  ? item.team.name
                                  : "NA"
                              }
                            </td>

                            <td>
                              <span style={{ color: "blue" }}>{Moment(item.start_date).format('DD/MM/Y') + '\n'}</span>
                              <br />
                              <span style={{ color: "blue" }}>{Moment(item.start_date).format('dddd')}</span>
                              <br />
                              <span style={{ color: "green" }}>{"Start :" + item.start_time}</span>
                              <br />
                              <span style={{ color: "red" }}>{"End   :" + item.end_time}</span>
                            </td>
                            <td>{item.booking_status}</td>
                            <td><a href={`/client/files/${item.id}`}><i className='fa fa-image' style={{"font-size":"36px"}}></i></a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center mt-5">{loading}</p>
                )}
              </div>
              {schedules.length > 0 ? (
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
              ) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
