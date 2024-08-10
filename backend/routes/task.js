const express = require("express");
const TaskModel = require("../models/task")
const UserTaskModel = require("../models/userTask")
const router = express.Router();
const mongoose = require("mongoose")

 router.get("/summary",async function(req, res){
    let TotalCount = await TaskModel.find({}).count();
    let AvailableTaskCount = await TaskModel.find({assigned:false}).count()
    let AssignedTaskCount = await TaskModel.find({assigned:true}).count();
    
    //let NotStartedCount = await TaskModel.find({status: "not_started"}).count();
    //only for admin 
    let InProgressCount = await UserTaskModel.find({status: "Inprogress"}).count();
    let CompletedCount = await UserTaskModel.find({status: "completed"}).count();
    res.send({TotalCount, InProgressCount, CompletedCount,AvailableTaskCount,AssignedTaskCount});
});

router.get("/available",async function(req,res){
    let tasks =  await TaskModel.find({assigned:{ "$ne":"true"}})
    // res.status(200).json(tasks)
    res.send(tasks)
})

router.get("/all",async function(req,res){
    let tasks =  await TaskModel.find({assigned:{ "$ne":"true"}})
    // res.status(200).json(tasks)
    res.send(tasks)
})

router.post("/create",async function(req,res){
    console.log(req.body)
    // from client if you pass data that comes as a req.body
    //const {taskName,taskDesc,status,assigned,id} = req.body
    const newTaskData = new TaskModel({...req.body,assigned:false})
    const createdTask = await newTaskData.save();
    res.send(createdTask)
})

router.delete("/:id",async function(req,res){
    console.log(req.params)
    const {id} = req.params;
    console.log(typeof(id))
    const deletedData = await TaskModel.findByIdAndDelete(id);
    res.send("data deleted successfully")
})
 router.get("/:id",async function(req,res){
    const {id} = req.params;
    let task = await TaskModel.findById(id)
    res.send(task)
 })

 router.put("/update/:id",async function(req,res){
    console.log(req.params)
    const {id} = req.params;
    const updatedTask = await TaskModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{...req.body})
    res.send(updatedTask)
})
router.get("/byStatus/:status",async function(req,res){
    const {status} = req.params;
    if(status==="All"){
        let tasks = await TaskModel.find({})
       return res.send(tasks)
    }else{
        let tasks = await TaskModel.find({status:status})
        return res.send(tasks)
    }
    
 })
module.exports = router