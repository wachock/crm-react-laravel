import React, { useEffect, useState } from 'react'
import Sidebar from '../../Layouts/Sidebar'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import TaskFilter from '../../Components/Filter/TaskFilter';

export default function Tasks() {
  const [task, setTask] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState("Loading...");

  const headers = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ` + localStorage.getItem("admin-token"),
    };

    const getTasks = () => {
        axios.get("/api/admin/tasks", { headers }).then((response) => {
            if (response.data.tasks.data.length > 0) {
                setTask(response.data.tasks.data);
                setPageCount(response.data.tasks.last_page);
            } else {
                setLoading("No Task found");
            }
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        axios
            .get("/api/admin/tasks?page=" + currentPage, { headers })
            .then((response) => {
                if (response.data.tasks.data.length > 0) {
                    setTask(response.data.tasks.data);
                    setPageCount(response.data.tasks.last_page);
                } else {
                    setLoading("No Task found");
                }
            });
    };

    const getFilteredTask = (response) => {
        if (response.data.tasks.data.length > 0) {
            setTask(response.data.tasks.data);
            setPageCount(response.data.tasks.last_page);
        } else {
            setTask([]);
            setPageCount(response.data.tasks.last_page);
            setLoading("No Task found");
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
            confirmButtonText: "Yes, Delete Task!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/api/admin/tasks/${id}`, { headers })
                    .then((response) => {
                        Swal.fire(
                            "Deleted!",
                            "Task has been deleted.",
                            "success"
                        );
                        setTimeout(() => {
                            getTasks();
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
                        <h1 className="page-title">Tasks</h1>
                    </div>
                    <div className='col-sm-6'>
                        <div className='text-right'>                          
                            <Link to='/admin/add-task' className='btn btn-success addButton'>Add Task</Link>
                        </div>
                    </div>
                </div>
            </div>
            <TaskFilter getFilteredTask={getFilteredTask}/>
            <div className='boxPanel'>
                <div className='table-responsive'>
                {task.length > 0 ? (
                    <table className="table bg-white table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center bg-dark-grey text-white'>ID</th>
                                <th className='text-center bg-dark-grey text-white'>Task</th>
                                <th className='text-center bg-dark-grey text-white'>Status</th>
                                <th className='text-center bg-dark-grey text-white text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {task && task.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{item.id}</td>
                                    <td className='text-center'>{item.task}</td>
                                    <td className='text-center'>{item.status == 1 ? 'Enabled' : 'Disabled'}</td>
                                    <td className='text-center'>
                                        <div className="text-center">
                                            <Link
                                                to={`/admin/edit-task/${item.id}`}
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
                {task.length > 0 ? (
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
