// import { useState, useEffect } from "react"
// import "../App.css"
// function TaskList() {
//     const [tasks, setTasks] = useState([])
//     const [searchkey, setSearchKey] = useState("")
//     const [filteredTasks, setFilteredTasks] = useState([])
//     const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"])
//     const [taskSummary, setTaskSummary] = useState({ TotalCount: 0, InProgressCount: 0, CompletedCount: 0, NotStartedCount: 0,AvailableTaskCount:0 })

//     const getAllTasks = () => {
//         fetch("http://localhost:7000/task/all/").then((res) => {
//             return res.json();
//         }).then((result) => {
//             setTasks(result)
//             setFilteredTasks(result)
//         })
//     }
//     const getAllAvailbaleTask = ()=>{
//         fetch("http://localhost:7000/task/available").then((res) => {
//             return res.json();
//         }).then((result) => {
//             setTasks(result)
//             setFilteredTasks(result)
//         })
//     }
//     const getTaskSummary = () => {
//         fetch(`http://localhost:7000/task/summary`).then((res) => {
//             return res.json();
//         }).then((result) => {
//             console.log(result)
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
//         //getAllTasks();
//         getAllAvailbaleTask();
//         getTaskSummary();
//     }, []);

//     const deleteTask = (e, id) => {
//         fetch("http://localhost:7000/task/" + id, { method: "DELETE" }).then((res) => {
//             return res.text()
//         }).then((result) => {
//             getAllTasks();
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

//     const startTask = (e, id, status) => {
//         if (status === "Inprogress") {
//             status = "completed"
//         } else {
//             status = "Inprogress"
//         }
//         fetch("http://localhost:7000/task/update/" + id, { method: "PUT", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ status: status }) }).then((res) => {
//             return res.json();
//         }).then((result) => {
//             getAllTasks();
//         })
//     }

//     const assignTaskToUser = async (taskId, status)=>{
//         const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
//         if (status === "Inprogress") {
//             status = "completed"
//         } else {
//             status = "Inprogress"
//         }

//         fetch("http://localhost:7000/user/task/assignTask", { method: "POST", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ taskId:taskId,userId:user.userId,status: status }) }).then((res) => {
//             return res.json();
//         }).then((result) => {
//             getAllTasks();
//         })
//     }

//     const assignTask = async (e, taskId, status) => {
//        assignTaskToUser(taskId, status);
//     }

//     const getTasksByStatus = (status) => {
//         fetch("http://localhost:7000/task/byStatus/" + status).then((res) => {
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
//             <div className="row mt-3">
//                 <div className="col-md-3">
//                     <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid blue' }}>
//                         <div className="card-body">
//                             <h5 className="card-title">Available Tasks</h5>
//                             <p className="card-text count-task">{taskSummary.AvailableTaskCount}</p>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <div className="col-md-3">
//                     <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid red' }}>
//                         <div className="card-body">
//                             <h5 className="card-title">Not Started Tasks</h5>
//                             <p className="card-text count-task">{taskSummary.NotStartedCount}</p>

//                         </div>
//                     </div>
//                 </div>
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
//                 </div> */}
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-12">
//                     <input type="text" className="search-bar" style={{ width: '100%' }} value={searchkey} placeholder="Search Tasks" onChange={(e) => searchTasks(e)} />
//                 </div>
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-3">
//                     <h4 className="mt-3">Task List</h4>
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
//                                 {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => startTask(e, task._id, task.status)}>{'Complete'}</button>}
//                                 {task.status === 'not_started' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => assignTask(e, task._id, task.status)}>{'Start'}</button>}
//                                 <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{task.taskName}</h5>
//                                     <p className="card-text">{task.taskDesc}</p>
//                                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                         <span class="badge bg-success">{task.status}</span>
//                                         <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span>
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

// export default TaskList





import { useState, useEffect } from "react";
import "../App.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [searchkey, setSearchKey] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"]);
    const [taskSummary, setTaskSummary] = useState({ TotalCount: 0, InProgressCount: 0, CompletedCount: 0, NotStartedCount: 0, AvailableTaskCount: 0 });
    const [selectedStatus, setSelectedStatus] = useState("Filter Task By Status");

    const getAllTasks = async () => {
        try {
            const response = await fetch("http://localhost:7000/task/all/");
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setTasks(result);
            setFilteredTasks(result);
        } catch (error) {
            console.error("Error fetching all tasks:", error);
        }
    };

    const getAllAvailableTask = async () => {
        try {
            const response = await fetch("http://localhost:7000/task/available");
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setTasks(result);
            setFilteredTasks(result);
        } catch (error) {
            console.error("Error fetching available tasks:", error);
        }
    };

    const getTaskSummary = async () => {
        try {
            const response = await fetch("http://localhost:7000/task/summary");
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setTaskSummary(result);
        } catch (error) {
            console.error("Error fetching task summary:", error);
        }
    };

    useEffect(() => {
        getAllAvailableTask();
        getTaskSummary();
    }, []);

    const deleteTask = async (e, id) => {
        try {
            const response = await fetch(`http://localhost:7000/task/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.text();
            getAllTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const searchTasks = (e) => {
        setSearchKey(e.target.value);
        if (e.target.value) {
            const filteredTasksData = tasks.filter((item) => item.taskName === e.target.value);
            setFilteredTasks(filteredTasksData);
        } else {
            setFilteredTasks(tasks);
        }
    };

    const startTask = async (e, id, status) => {
        const newStatus = status === "Inprogress" ? "completed" : "Inprogress";
        try {
            const response = await fetch(`http://localhost:7000/task/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "Application/Json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
            getAllTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const assignTaskToUser = async (taskId, status) => {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        const token = localStorage.getItem("authToken");
        const newStatus = status === "Inprogress" ? "completed" : "Inprogress";

        try {
            const response = await fetch("http://localhost:7000/user/task/assignTask", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/Json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ taskId, userId: user.userId, status: newStatus }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            await response.json();
            getAllTasks();
        } catch (error) {
            console.error("Error assigning task:", error);
        }
    };

    const assignTask = (e, taskId, status) => {
        assignTaskToUser(taskId, status);
    };

    const getTasksByStatus = async (status) => {
        try {
            const response = await fetch(`http://localhost:7000/task/byStatus/${status}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setTasks(result);
            setFilteredTasks(result);
        } catch (error) {
            console.error("Error fetching tasks by status:", error);
        }
    };

    const onStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        getTasksByStatus(newStatus);
    };

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid blue' }}>
                        <div className="card-body">
                            <h5 className="card-title">Available Tasks</h5>
                            <p className="card-text count-task">{taskSummary.AvailableTaskCount}</p>
                        </div>
                    </div>
                </div>
                {/* Additional summary cards */}
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <input type="text" className="search-bar" style={{ width: '100%' }} value={searchkey} placeholder="Search Tasks" onChange={searchTasks} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="mt-3">Task List</h4>
                </div>
                <div className="col-md-3">
                    <select className="form-select" aria-label="Default select example" value={selectedStatus} onChange={onStatusChange}>
                        <option disabled value="Filter Task By Status">Filter Task By Status</option>
                        {status.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredTasks.length === 0 && <h4>Currently No Tasks Available</h4>}

            <div className="row mt-3">
                {filteredTasks.map((task) => (
                    <div className="col-md-3 mt-3" key={task._id}>
                        <div className="card task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
                            {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => startTask(e, task._id, task.status)}>{'Complete'}</button>}
                            {task.status === 'not_started' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => assignTask(e, task._id, task.status)}>{'Start'}</button>}
                            <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{task.taskName}</h5>
                                <p className="card-text">{task.taskDesc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="badge bg-success">{task.status}</span>
                                    <span className="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskList;
