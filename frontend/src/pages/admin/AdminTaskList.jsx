import { useState, useEffect } from "react"
import "../../App.css"
function AdminTaskList() {
    const [tasks, setTasks] = useState([])
    const [searchkey, setSearchKey] = useState("")
    const [filteredTasks, setFilteredTasks] = useState([])
    const [status, setStatus] = useState(["All", "Inprogress", "completed", "not_started"])
    const [taskSummary, setTaskSummary] = useState({ TotalCount: 0, InProgressCount: 0, CompletedCount: 0, NotStartedCount: 0,AvailableTaskCount:0,AssignedTaskCount:0 })

    const getAllTasks = () => {
        fetch("https://task-management-application-ajjn.onrender.com/task/all/").then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredTasks(result)
        })
    }
    const getAllAvailbaleTask = ()=>{
        fetch("https://task-management-application-ajjn.onrender.com/task/available").then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredTasks(result)
        })
    }
    const getTaskSummary = () => {
        fetch(`https://task-management-application-ajjn.onrender.com/task/summary`).then((res) => {
            return res.json();
        }).then((result) => {
            console.log(result)
            setTaskSummary(result)
        })
    }
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         await getAllTasks();
        //         await getTaskSummary();
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // };
        // fetchData();
        //getAllTasks();
        getAllAvailbaleTask();
        getTaskSummary();
    }, []);

    const deleteTask = (e, id) => {
        fetch("https://task-management-application-ajjn.onrender.com/task/" + id, { method: "DELETE" }).then((res) => {
            return res.text()
        }).then((result) => {
            getAllTasks();
        })
    }
    const searchTasks = (e) => {
        setSearchKey(e.target.value)
        if (e.target.value) {
            let filteredTasksData = tasks.filter((item) => {
                return item.taskName === e.target.value
            })
            setFilteredTasks(filteredTasksData)
        } else {
            setFilteredTasks(tasks)
        }
    }

    const startTask = (e, id, status) => {
        if (status === "Inprogress") {
            status = "completed"
        } else {
            status = "Inprogress"
        }
        fetch("https://task-management-application-ajjn.onrender.com/task/update/" + id, { method: "PUT", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks();
        })
    }

    const assignTaskToUser = async (taskId, status)=>{
        const user = await localStorage.getItem("loggedInUser") && JSON.parse(localStorage.getItem("loggedInUser"))
        if (status === "Inprogress") {
            status = "completed"
        } else {
            status = "Inprogress"
        }

        fetch("https://task-management-application-ajjn.onrender.com/user/task/assignTask", { method: "POST", headers: { "Content-type": 'Application/Json' }, body: JSON.stringify({ taskId:taskId,userId:user.userId,status: status }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getAllTasks();
        })
    }

    const assignTask = async (e, taskId, status) => {
       assignTaskToUser(taskId, status);
    }

    const getTasksByStatus = (status) => {
        fetch("https://task-management-application-ajjn.onrender.com/task/byStatus/" + status).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setFilteredTasks(result)
        })
    }

    const onStatusChange = (e) => {
        console.log(e.target.value)
        getTasksByStatus(e.target.value)
    }

    return (
        <div className="container">
            <div className="row mt-3">
            <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid blue' }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Tasks</h5>
                            <p className="card-text count-task">{taskSummary.TotalCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid green' }}>
                        <div className="card-body">
                            <h5 className="card-title">Available Tasks</h5>
                            <p className="card-text count-task">{taskSummary.AvailableTaskCount}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid red' }}>
                        <div className="card-body">
                            <h5 className="card-title">Assigned Task</h5>
                            <p className="card-text count-task">{taskSummary.AssignedTaskCount}</p>

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid orange' }}>
                        <div className="card-body">
                            <h5 className="card-title">Inprogress Tasks</h5>
                            <p className="card-text count-task">{taskSummary.InProgressCount}</p>

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid cyan' }}>
                        <div className="card-body">
                            <h5 className="card-title">Complted Tasks</h5>
                            <p className="card-text count-task">{taskSummary.CompletedCount}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <input type="text" className="search-bar" style={{ width: '100%' }} value={searchkey} placeholder="Search Tasks" onChange={(e) => searchTasks(e)} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="mt-3">Task List</h4>
                </div>
                <div className="col-md-3">
                    <select class="form-select" aria-label="Default select example" onChange={(e) => onStatusChange(e)}>
                        <option selected disabled value={"Filter Task By Status"}>{"Filter Task By Status"}</option>
                        {status.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            {filteredTasks.length === 0 && <h4>Currently No Tasks Available</h4>}

            <div className="row mt-3">
                {filteredTasks.map((task) => {
                    return (
                        <div className="col-md-3 mt-3">
                            <div className="card task-card" style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 4px 16px' }}>
                                {task.status === 'Inprogress' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => startTask(e, task._id, task.status)}>{'Complete'}</button>}
                                {task.status === 'not_started' && <button style={{ position: 'absolute' }} className="btn btn-info btn-sm" onClick={(e) => assignTask(e, task._id, task.status)}>{'Start'}</button>}
                                <img className="card-img-top" src="https://ionicframework.com/docs/img/demos/card-media.png" alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{task.taskName}</h5>
                                    <p className="card-text">{task.taskDesc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span class="badge bg-success">{task.status}</span>
                                        <span class="badge bg-danger" onClick={(e) => deleteTask(e, task._id)}>delete</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminTaskList