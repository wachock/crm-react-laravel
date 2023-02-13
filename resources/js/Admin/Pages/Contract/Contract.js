import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";

export default function Contract() {
    
    const[contracts,setContracts] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
      };
      const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Contract!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/contract/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Contract has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            window.location.reload(true);
                        }, 1000);
                    });
            }
        });
    };

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/contract?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.contracts.data.length > 0) {
                    setContracts(response.data.contracts.data);
                    setPageCount(response.data.contracts.last_page);
                } else {
                    setLoading("No contract found");
                }
            });
    };

    const filterContracts = (e) =>{
        axios
        .get(`/api/admin/contract?q=${e.target.value}`,{ headers })
        .then((response)=>{
            if (response.data.contracts.data.length > 0) {
                setContracts(response.data.contracts.data);
                setPageCount(response.data.contracts.last_page);
            } else {
                setContracts([]);
                setPageCount(response.data.contracts.last_page);
                setLoading("No contract found");
            }
        });
    }


    const getContract = () => {
        axios
          .get(`/api/admin/contract`, { headers })
          .then((res) => {
            setContracts(res.data.contracts.data);
          })
      }
    useEffect(()=>{
        getContract();
    },[]);

    console.log(contracts);
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Contracts</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="mr-0 form-control" onChange={filterContracts} placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">
                                { contracts.length > 0 ?(
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Client</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Service Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        {contracts && contracts.map((c,i)=>{

                                            let address = c.client ? c.client.city+", " :'';
                                            address += c.client ? c.client.street_n_no+", " :'';
                                            address += c.client ? c.client.zipcode+" " :'';

                                            let services = JSON.parse(c.offer.services);

                                            return(

                                        <tr>
                                            <td><Link to={`/admin/view-client/${c.client.id}`}>
                                            {
                                                c.client
                                                ?c.client.firstname+" "+c.client.lastname
                                                :''
                                            }
                                            </Link></td>
                                            <td>{c.client.email}</td>
                                            <td><Link to={`https://maps.google.com?q=${address}`}>

                                                {address}

                                            </Link></td>
                                            <td>{ c.client.phone }</td>
                                            <td>
                                            {services && services.map((s,j)=>{
                               
                                                return(
                                                    (services.length-1 != j) ?
                                                    s.name+" | "
                                                    : s.name
                                                )
                                            })}
                                            </td>
                                            <td>{ c.status }</td>
                                            <td>{ c.offer.total }</td>
                                            <td>
                                                <div className="action-dropdown dropdown">
                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/admin/view-contract/${c.id}/${c.hash}`} className="dropdown-item">View</Link>
                                                        <button className="dropdown-item" onClick={() => handleDelete(c.id)}
                                                        >Delete</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>   

                                            )
                                        })}
                                          
                                    </tbody>
                                </table> 
                                ):(
                                    <div className='form-control text-center'>{loading}</div>
                                )
                            }
                            </div>
                            { contracts.length > 0 ?(
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
                
            </div>
        </div>
    );
}

