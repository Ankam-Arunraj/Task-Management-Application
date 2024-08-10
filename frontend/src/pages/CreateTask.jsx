import { useState } from "react"
import {useNavigate} from "react-router-dom"
function CreateTask() {
    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [showAlert,setShowAlert] = useState(false)
    const [errors,setErrors] = useState({})

    const navigate = useNavigate()

    const onTaskDescChange = (e) => {
        setTaskDesc(e.target.value)
    }
    const onTaskNameChange = (e) => {
        setTaskName(e.target.value)
    }

    const validateTaskField = ()=>{
        let errors = {};
        if(!taskName){
            errors.taskName="Please enter task name"
        } if(!taskDesc){
            errors.taskDesc="Please enter task description"
        }

        return errors
    }
    const createTask = (taskData) => {
        let errors = validateTaskField()
        setErrors(errors)
        if(Object.keys(errors).length===0){
            fetch("http://localhost:7000/task/create", { method: "POST", headers: { 'Content-Type': "application/json" }, body: JSON.stringify(taskData) }).then(function (res) {
                return res.json()
            }).then(function (result) {
                if(result._id){
                    setShowAlert(true)
                }
                console.log("data saved successfully")
                navigate("/tasks")
            })
        }else{
            return;
        }
       
    }
    const saveTask = (e) => {
        e.preventDefault();
        let taskData = {
            taskName,
            taskDesc,
            status: "not_started",
            assigned: true
        }

        createTask(taskData)
    }
    return (
        <div className="container">

            <h4>Create task page</h4>
            <div class="card" style={{ width: '25rem' }}>
                <div class="card-body">
                    <form onSubmit={saveTask}>
                        <div class="form-group" style={{ padding: '15px' }}>
                            <label>Task Name</label>
                            <input type="text" class="form-control" value={taskName} onChange={onTaskNameChange} />
                        </div>
                        <p  className="error-text">{errors?.taskName}</p>
                        <div class="form-group" style={{ padding: '15px' }}>
                            <label>Task Description</label>
                            <input type="text" class="form-control" value={taskDesc} onChange={onTaskDescChange} />
                        </div>
                        <p  className="error-text">{errors?.taskDesc}</p>
                        <div style={{ padding: '15px' }}>
                            <button type="submit" class="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {showAlert &&<div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                        Task Create Successfully!!
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default CreateTask