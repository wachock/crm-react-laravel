import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPaginate from "react-paginate";
import Moment from 'moment';
import Swal from 'sweetalert2';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import { useNavigate } from 'react-router-dom';

export default function Schedule() {

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();

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

  const getSchedules = () => {
    axios
      .get(`/api/admin/schedule`, { headers })
      .then((response) => {
        if (response.data.schedules.data.length > 0) {
          setSchedules(response.data.schedules.data);
          setPageCount(response.data.schedules.last_page);
        } else {
          setSchedules([]);
          setLoading("No meeting scheduled yet");
        }
      })
  }

  const filterSchedules = (e) => {
    axios
    .get(`/api/admin/schedule?q=${e.target.value}`, { headers })
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
  const handleNavigate = (e,cid,id) => {
    e.preventDefault();
    navigate(`/admin/view-schedule/${cid}?sid=${id}`);
  }
  
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
                  <Table className="table table-bordered">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Client</Th>
                        <Th>Contact</Th>
                        <Th>Address</Th>
                        <Th>Meeting Attender</Th>
                        <Th>Scheduled</Th>
                        <Th>Booking Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {schedules && schedules.map((item, index) => {

                        let address = (item.client.geo_address) ? item.client.geo_address : 'NA';
                        let cords  = (item.client.latitude && item.client.longitude) ?
                                     item.client.latitude +","+ item.client.longitude:"NA";
                        return (
                          <Tr key={index}>
                            <Td onClick={(e)=>handleNavigate(e,item.client.id,item.id)}>{item.id}</Td>
                            <Td><Link to={`/admin/view-client/${item.client.id}`}>
                              {
                                item.client
                                  ? item.client.firstname + " " + item.client.lastname
                                  : 'NA'
                              }
                            </Link></Td>
                            <Td>
                              {
                                item.client
                                  ? item.client.phone
                                  : 'NA'
                              }
                            </Td>
                            <Td><Link to={`https://maps.google.com?q=${cords}`} target="_blank">{address}</Link></Td>
                            <Td onClick={(e)=>handleNavigate(e,item.client.id,item.id)}>
                              {
                                item.team
                                  ? item.team.name
                                  : "NA"
                              }
                            </Td>

                            <Td onClick={(e)=>handleNavigate(e,item.client.id,item.id)}>
                              <span style={{ color: "blue" }}>{Moment(item.start_date).format('DD/MM/Y') + '\n'}</span>
                              <br />
                              <span style={{ color: "blue" }}>{Moment(item.start_date).format('dddd')}</span>
                              <br />
                              <span style={{ color: "green" }}>{"Start :" + item.start_time}</span>
                              <br />
                              <span style={{ color: "red" }}>{"End   :" + item.end_time}</span>
                            </Td>
                            <Td onClick={(e)=>handleNavigate(e,item.client.id,item.id)}>{item.booking_status}</Td>
                            <Td>
                              <div className="action-dropdown dropdown">
                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                  <i className="fa fa-ellipsis-vertical"></i>
                                </button>
                                <div className="dropdown-menu">
                                  <Link to={`/admin/view-schedule/${item.client.id}?sid=${item.id}`} className="dropdown-item">View</Link>
                                  <button className="dropdown-item" onClick={() => handleDelete(item.id)}
                                  >Delete</button>
                                </div>
                              </div>
                            </Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
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
