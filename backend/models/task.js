const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id:String,
    taskName:String,
    taskDesc:String,
    status:String,
    assigned:{
        type:Boolean,
        required:true,
    }
})

module.exports = mongoose.model("task",TaskSchema);