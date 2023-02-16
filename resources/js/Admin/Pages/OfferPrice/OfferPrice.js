import React,{ useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Sidebar from '../../Layouts/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function OfferPrice() {

    const [offers,setOffers] = useState();
    const [totalOffers, setTotalOffers] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [pageCount, setPageCount] = useState(0);

    const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getOffers = () =>{
        axios
          .get('/api/admin/offers',{headers})
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
            .get("/api/admin/offers?page=" + currentPage, { headers })
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
        .get(`/api/admin/offers?q=${e.target.value}`,{ headers })
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


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Offer!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/offers/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Offer has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getOffers();
                        }, 1000);
                    });
            }
        });
    };

    
    useEffect(()=>{
        getOffers();
    },[]);
    
    return (
        <div id="container">
            <Sidebar />
            <div id="content">
                <div className="titleBox customer-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1 className="page-title">Offered Prices</h1>
                        </div>
                        <div className="col-sm-6">
                            <div className="search-data">
                                <input type='text' className="form-control" onChange={filterOffers} placeholder="Search" />
                                <Link to="/admin/add-offer" className="btn btn-pink addButton"><i class="btn-icon fas fa-plus-circle"></i>Add New</Link>
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
                                            <th scope="col">Client</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        { offers && offers.map((ofr,i)=>{

                                            var address = (ofr.client.geo_address) ? ofr.client.geo_address : 'NA';
                                            var cords   = (ofr.client.latitude && ofr.client.longitude)
                                                           ? ofr.client.latitude+","+ofr.client.longitude : 'NA';
                                           return ( 
                                           <tr>
                                            <td><Link to={`/admin/view-client/${ofr.client.id}`}>
                                                {
                                                  ofr.client 
                                                  ? ofr.client.firstname
                                                  + " "+ofr.client.lastname
                                                  :"NA"
                                                }
                                                </Link>
                                            </td>
                                            <td>{ofr.client.email}</td>
                                            <td><Link to={`https://maps.google.com?q=${cords}`}>{address}</Link></td>
                                            <td>{ ofr.client.phone }</td>
                                            <td>{ ofr.status }</td>
                                            <td>{ ofr.total } $</td>
                                            <td>
                                                <div className="action-dropdown dropdown">
                                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/admin/edit-offer/${ofr.id}`} className="dropdown-item">Edit</Link>
                                                        <Link to={`/admin/view-offer/${ofr.id}`} className="dropdown-item">View</Link>
                                                        <button className="dropdown-item" onClick={() => handleDelete(ofr.id)}
                                                        >Delete</button>
                                                    </div>
                                                </div>
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
