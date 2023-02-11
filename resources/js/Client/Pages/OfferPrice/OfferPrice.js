import React,{ useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ClientSidebar from '../../Layouts/ClientSidebar';
import axios from 'axios';

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
 
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Offer ID</th>
                                            <th scope="col">Services</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        { offers && offers.map((ofr,i)=>{

                                          let services = ofr.services ? JSON.parse(ofr.services):'';
                                           return ( 
                                           <tr>
                                            <td>#{ ofr.id }</td>
                                            <td>
                                                {services && services.map((s,i)=>{
                                                    return(
                                                        services.length-1 != i
                                                        ? s.name+" | "
                                                        :s.name
                                                    )
                                                })}

                                            </td>
                                            <td>{ofr.status}</td>
                                            <td>{ofr.total}$</td>
                                            <td>
                                               <Link to={`/client/view-offer/${ofr.id}`} className="ml-2 btn bg-yellow"><i className="fa fa-eye"></i></Link>
                                            </td>
                                        </tr>     
                                        )
                                        })}

                                        
                                       
                                    </tbody>
                                </table> 
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
