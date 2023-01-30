import React, { useEffect, useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import SkillFilter from '../../Components/Filter/SkillFilter';

export default function Skills() {
  const [skill, setSkill] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState("Loading...");

  const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getSkills = () => {
        axios.get("/api/admin/skills", { headers }).then((response) => {
            if (response.data.skills.data.length > 0) {
                setSkill(response.data.skills.data);
                setPageCount(response.data.skills.last_page);
            } else {
                setLoading("No Skill found");
            }
        });
    };

    useEffect(() => {
        getSkills();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/skills?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.skills.data.length > 0) {
                    setSkill(response.data.skills.data);
                    setPageCount(response.data.skills.last_page);
                } else {
                    setLoading("No Skill found");
                }
            });
    };

    const getFilteredSkill = (response) => {
        if (response.data.skills.data.length > 0) {
            setSkill(response.data.skills.data);
            setPageCount(response.data.skills.last_page);
        } else {
            setSkill([]);
            setPageCount(response.data.skills.last_page);
            setLoading("No Skill found");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete Skill!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/skills/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Skill has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getSkills();
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
                        <h1 className="page-title">Skills</h1>
                    </div>
                    <div className='col-sm-6'>
                        <div className='text-right'>                          
                            <Link to='/admin/add-skill' className='btn btn-success addButton'>Add Skill</Link>
                        </div>
                    </div>
                </div>
            </div>
            <SkillFilter getFilteredSkill={getFilteredSkill}/>
            <div className='boxPanel'>
                <div className='table-responsive'>
                {skill.length > 0 ? (
                    <table className="table bg-white table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center bg-dark-grey text-white'>ID</th>
                                <th className='text-center bg-dark-grey text-white'>Skill</th>
                                <th className='text-center bg-dark-grey text-white'>Status</th>
                                <th className='text-center bg-dark-grey text-white text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skill && skill.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{item.id}</td>
                                    <td className='text-center'>{item.skill}</td>
                                    <td className='text-center'>{item.status == 1 ? 'Enabled' : 'Disabled'}</td>
                                    <td className='text-center'>
                                        <div className="text-center">
                                            <Link
                                                to={`/admin/edit-skill/${item.id}`}
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
                {skill.length > 0 ? (
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
