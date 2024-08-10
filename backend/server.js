const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const filUpload = require("express-fileupload")
const taskRoutes = require("./routes/task")
const authRoutes = require("./routes/auth")
const userTaskRoutes = require("./routes/userTask")

mongoose.connect("mongodb://localhost:27017/task-app")

const app = express();
app.use(express.json())
app.use(cors())
// for now commenting it because of multer 
//app.use(filUpload())

function checkPaidOrNot(req,res,next){
    let userPaid = true
    if(!userPaid){
        res.send("you didnt pay the amount so cant watch movies")
    }else{
        next()
    }
}
app.use("/uploads",express.static('uploads'))


app.use("/task",taskRoutes);
app.use("/auth",authRoutes);



app.use(function(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    }
    next();
});
  
app.use("/user/task",userTaskRoutes)



app.get("/",function(req,res){
    res.send("hello world")
})



app.listen(7000,()=>{
    console.log("server is running at 7000")
})