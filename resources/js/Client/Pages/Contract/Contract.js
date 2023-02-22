import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/ClientSidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from "react-paginate";

export default function Contract() {
    
    const[contracts,setContracts] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);
    const id                        =localStorage.getItem('client-id');
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
      };
      

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .post("/api/client/contracts?page=" + currentPage,{id:id}, { headers })
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
        .post(`/api/client/contracts?q=${e.target.value}`,{id:id},{ headers })
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
          .post(`/api/client/contracts`,{id:id}, { headers })
          .then((res) => {
            setContracts(res.data.contracts.data);
          })
      }
    useEffect(()=>{
        getContract();
    },[]);

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
                                            <th scope="col">Contract ID</th>
                                            <th scope="col">Services</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        {contracts && contracts.map((c,i)=>{

                                            let services = JSON.parse(c.offer.services);

                                            return(

                                        <tr>
                                            <td>#{c.id}</td>
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
                                            <td>{ c.offer.total } ILS + VAT</td>
                                            <td>
                                            <Link to={`/client/view-contract/${c.id}/${c.unique_hash}`} className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></Link>
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

