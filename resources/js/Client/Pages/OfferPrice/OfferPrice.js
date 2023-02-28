import React,{ useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ClientSidebar from '../../Layouts/ClientSidebar';
import axios from 'axios';
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'

export default function ClientOfferPrice() {

    const [offers,setOffers] = useState();
    const [totalOffers, setTotalOffers] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);
    const id                        = localStorage.getItem('client-id');
    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("client-token"),
    };

    const getOffers = () =>{
        axios
          .post('/api/client/offers',{id:id},{headers})
          .then((response)=>{
            if (response.data.offers.data.length > 0) {
                setTotalOffers(response.data.offers.data);
                setOffers(response.data.offers.data);
                setPageCount(response.data.offers.last_page);
            } else {
                setLoading("No offer found");
            }
            
          });
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .post("/api/client/offers?page=" + currentPage,{id:id}, { headers })
            .then((response) => {
                if (response.data.offers.data.length > 0) {
                    setTotalOffers(response.data.offers.data);
                    setOffers(response.data.offers.data);
                    setPageCount(response.data.offers.last_page);
                } else {
                    setLoading("No offer found");
                }
            });
    };

    const filterOffers = (e) =>{
        axios
        .post(`/api/client/offers?q=${e.target.value}`,{id:id}, { headers })
        .then((response)=>{
            if (response.data.offers.data.length > 0) {
                setTotalOffers(response.data.offers.data);
                setOffers(response.data.offers.data);
                setPageCount(response.data.offers.last_page);
            } else {
                setTotalOffers([]);
                setPageCount(response.data.offers.last_page);
                setLoading("No offer found");
            }
        });
    }

    
    useEffect(()=>{
        getOffers();
    },[]);
    
    return (
        <div id="container">
            <ClientSidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Offered Prices</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="form-control" onChange={filterOffers} placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="boxPanel">
                            <div className="table-responsive">

                                {totalOffers.length > 0 ? (
 
                                <Table className="table table-bordered responsiveTable">
                                    <Thead>
                                        <Tr>
                                            <Th>Offer ID</Th>
                                            <Th>Services</Th>
                                            <Th>Status</Th>
                                            <Th>Total</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>  
                                        { offers && offers.map((ofr,i)=>{

                                          let services = ofr.services ? JSON.parse(ofr.services):'';
                                           return ( 
                                           <Tr>
                                            <Td>#{ ofr.id }</Td>
                                            <Td>
                                                {services && services.map((s,i)=>{
                                                    return(
                                                        services.length-1 != i
                                                        ? s.name+" | "
                                                        :s.name
                                                    )
                                                })}

                                            </Td>
                                            <Td>{ofr.status}</Td>
                                            <Td>{ofr.total} ILS + VAT</Td>
                                            <Td>
                                               <Link to={`/client/view-offer/${ofr.id}`} className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></Link>
                                            </Td>
                                        </Tr>     
                                        )
                                        })}

                                        
                                       
                                    </Tbody>
                                </Table> 
                             ): (
                                <p className="text-center mt-5">{loading}</p>
                            )}
                            </div>

                            { totalOffers.length > 0 ?(
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
