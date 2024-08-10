// import { useState, useEffect } from "react"
// import "../App.css"
// function MyTask() {
//     const [tasks, setTasks] = useState([])
//     const [searchkey, setSearchKey] = useState("")
//     const [filteredTasks, setFilteredTasks] = useState([])
//     const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"])
//     const [taskSummary, setTaskSummary] = useState({ InProgressCount: 0, CompletedCount: 0})

//     const getMyTasks = async () => {
//         const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
//         fetch("http://localhost:7000/user/task/myTask/"+user.userId).then((res) => {
//             return res.json();
//         }).then((result) => {
//             setTasks(result)
//             setFilteredTasks(result)
//         })
//     }

//     const getTaskSummaryByUser = async ()=>{
//         const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
//         fetch("http://localhost:7000/user/task/summary/"+user.userId).then((res) => {
//             return res.json();
//         }).then((result) => {
//             setTaskSummary(result)
//         })
//     }
//     useEffect(() => {
//         // const fetchData = async () => {
//         //     try {
//         //         await getAllTasks();
//         //         await getTaskSummary();
//         //     } catch (error) {
//         //         console.error("Error fetching data:", error);
//         //     }
//         // };
//         // fetchData();
//         getMyTasks();
//         getTaskSummaryByUser();
//     }, []);

//     const completeTask = (e,id)=>{
//         fetch("http://localhost:7000/user/task/completeTask", { method: "PUT", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ id:id,status: "completed" }) }).then((res) => {
//             return res.json();
//         }).then((result) => {
//             getMyTasks();
//         })
//     }

//     const searchTasks = (e) => {
//         setSearchKey(e.target.value)
//         if (e.target.value) {
//             let filteredTasksData = tasks.filter((item) => {
//                 return item.taskName === e.target.value
//             })
//             setFilteredTasks(filteredTasksData)
//         } else {
//             setFilteredTasks(tasks)
//         }
//     }


//     const getTasksByStatus = async (status) => {
//         const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
//         fetch(`http://localhost:7000/user/task/${user.userId}/byStatus/${status}`).then((res) => {
//             return res.json();
//         }).then((result) => {
//             setTasks(result)
//             setFilteredTasks(result)
//         })
//     }

//     const onStatusChange = (e) => {
//         console.log(e.target.value)
//         getTasksByStatus(e.target.value)
//     }

//     return (
//         <div className="container">
//          <div className="row mt-3">
//                 <div className="col-md-3">
//                     <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid orange' }}>
//                         <div className="card-body">
//                             <h5 className="card-title">In Progress Tasks</h5>
//                             <p className="card-text count-task">{taskSummary.InProgressCount}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-3">
//                     <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid green' }}>
//                         <div className="card-body">
//                             <h5 className="card-title">Completed Tasks</h5>
//                             <p className="card-text count-task">{taskSummary.CompletedCount}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-12">
//                     <input type="text" className="search-bar" style={{ width: '100%' }} value={searchkey} placeholder="Search Tasks" onChange={(e) => searchTasks(e)} />
//                 </div>
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-3">
//                     <h4 className="mt-3">My Task List</h4>
//                 </div>
//                 <div className="col-md-3">
//                     <select class="form-select" aria-label="Default select example" onChange={(e) => onStatusChange(e)}>
//                         <option selected disabled value={"Filter Task By Status"}>{"Filter Task By Status"}</option>
//                         {status.map((item) => {
//                             return (
//                                 <option value={item}>{item}</option>
//                             )
//                         })}
//                     </select>
//                 </div>
//             </div>

//             {filteredTasks.length === 0 && <h4>Currently No Tasks Available</h4>}

//             <div className="row mt-3">
//                 {filteredTasks.map((task) => {
//                     return (
//                         <div className="col-md-3 mt-3">
//                             <div className="card task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
//                                 {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => completeTask(e, task._id)}>{'Complete'}</button>}
//                                 {/* {task.status === 'not_started' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => assignTask(e, task._id, task.status)}>{'Start'}</button>} */}
//                                 <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{task.taskId.taskName}</h5>
//                                     <p className="card-text">{task.taskId.taskDesc}</p>
//                                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                         <span class="badge bg-success">{task.status}</span>
//                                         {/* <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span> */}
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// export default MyTask







import { useState, useEffect } from "react";
import "../App.css";

function MyTask() {
    const [tasks, setTasks] = useState([]);
    const [searchkey, setSearchKey] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"]);
    const [taskSummary, setTaskSummary] = useState({ InProgressCount: 0, CompletedCount: 0 });

    // Helper function to get user from local storage
    const getUser = () => {
        return JSON.parse(localStorage.getItem("loggedInUser"));
    }

    // Helper function to get auth token
    const getAuthToken = () => {
        const user = getUser();
        return user?.token; // Assuming the user object has a token property
    }

    const getMyTasks = async () => {
        const user = getUser();
        const token = getAuthToken();
        fetch("http://localhost:7000/user/task/myTask/" + user?.userId, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token if required
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((result) => {
                if (Array.isArray(result)) {
                    setTasks(result);
                    setFilteredTasks(result);
                } else {
                    setTasks([]);
                    setFilteredTasks([]);
                    console.error("Expected an array, but got:", result);
                }
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
                setTasks([]);
                setFilteredTasks([]);
            });
    }

    const getTaskSummaryByUser = async () => {
        const user = getUser();
        const token = getAuthToken();
        fetch("http://localhost:7000/user/task/summary/" + user?.userId, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token if required
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((result) => {
                setTaskSummary(result);
            })
            .catch((error) => {
                console.error("Error fetching task summary:", error);
                setTaskSummary({ InProgressCount: 0, CompletedCount: 0 });
            });
    }

    useEffect(() => {
        getMyTasks();
        getTaskSummaryByUser();
    }, []);

    const completeTask = (e, id) => {
        const token = getAuthToken();
        fetch("http://localhost:7000/user/task/completeTask", {
            method: "PUT",
            headers: {
                "Content-type": 'Application/Json',
                "Authorization": `Bearer ${token}` // Include token if required
            },
            body: JSON.stringify({ id: id, status: "completed" })
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                getMyTasks();
            })
            .catch((error) => {
                console.error("Error completing task:", error);
            });
    }

    const searchTasks = (e) => {
        setSearchKey(e.target.value);
        if (e.target.value) {
            const filteredTasksData = tasks.filter((item) => {
                return item.taskId.taskName.includes(e.target.value);
            });
            setFilteredTasks(filteredTasksData);
        } else {
            setFilteredTasks(tasks);
        }
    }

    const getTasksByStatus = async (status) => {
        const user = getUser();
        const token = getAuthToken();
        fetch(`http://localhost:7000/user/task/${user?.userId}/byStatus/${status}`, {
            headers: {
                "Authorization": `Bearer ${token}` // Include token if required
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((result) => {
                if (Array.isArray(result)) {
                    setTasks(result);
                    setFilteredTasks(result);
                } else {
                    setTasks([]);
                    setFilteredTasks([]);
                    console.error("Expected an array, but got:", result);
                }
            })
            .catch((error) => {
                console.error("Error fetching tasks by status:", error);
                setTasks([]);
                setFilteredTasks([]);
            });
    }

    const onStatusChange = (e) => {
        getTasksByStatus(e.target.value);
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid orange' }}>
                        <div className="card-body">
                            <h5 className="card-title">In Progress Tasks</h5>
                            <p className="card-text count-task">{taskSummary.InProgressCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid green' }}>
                        <div className="card-body">
                            <h5 className="card-title">Completed Tasks</h5>
                            <p className="card-text count-task">{taskSummary.CompletedCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <input
                        type="text"
                        className="search-bar"
                        style={{ width: '100%' }}
                        value={searchkey}
                        placeholder="Search Tasks"
                        onChange={(e) => searchTasks(e)}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="mt-3">My Task List</h4>
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => onStatusChange(e)}
                    >
                        <option value="" disabled>{"Filter Task By Status"}</option>
                        {status.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            {Array.isArray(filteredTasks) && filteredTasks.length === 0 && <h4>Currently No Tasks Available</h4>}

            <div className="row mt-3">
                {Array.isArray(filteredTasks) && filteredTasks.map((task) => (
                    <div className="col-md-3 mt-3" key={task._id}>
                        <div className="card task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
                            {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => completeTask(e, task._id)}>{'Complete'}</button>}
                            <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{task.taskId.taskName}</h5>
                                <p className="card-text">{task.taskId.taskDesc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="badge bg-success">{task.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyTask;
