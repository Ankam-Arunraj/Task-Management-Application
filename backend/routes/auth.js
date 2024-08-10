// const express = require("express");
// const jwt = require("jsonwebtoken")
// const AuthModel = require("../models/auth")
// const mongoose = require("mongoose")
// const multer = require('multer');
// const path = require("path")
// const  authController= require("../controllers/auth")

// const router = express.Router();
// // Create a storage strategy for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     // Specify the upload directory
//     cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         console.log(file.originalname)
//     // Define the file name format
//     const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName)
//     }
// });
// // Create a multer instance with the storage strategy
// const upload = multer({ storage: storage });

// router.post("/signup", async function (req, res) {
//     // first check is user present with given email 
//     // if yes then retrun error message to frontend --user alredy exist

//     // if no-- then register or signup
//     const { fullName, email, password, rePassword } = req.body
//     let isUserExist = await AuthModel.findOne({ email: email })
//     if (isUserExist) {
//         return res.send({ message: "user already exist", success: false })
//     }
//     const newUser = new AuthModel({ ...req.body, active: true })
//     const createdUser = await newUser.save();
//     res.send({ message: "User Signup successfully", success: true })
// })

// router.post("/login",authController.login)


// function checkForToken(req,res,next){
//     console.log(req.headers)
//     if(req.headers['authorization']){
//         next()
//     }else{
//         return res.send("you dont have access for routes")
//     }
// }

// router.get("/profile/:email", checkForToken,async function (req, res) {
//     let user = await AuthModel.findOne({ email: req.params.email })
//     res.send(user)
// })

// router.get("/users", async function (req, res) {
//     let users = await AuthModel.find({})
//     res.send(users)

// })

// router.put("/changePassword", async function (req, res) {
//     // first will check is that usr email present or not 
//     // if email found then update the password 
//     // else send user forund message

//     const { email, currentPassword, newPassword } = req.body;
//     let user = await AuthModel.findOne({ email });
//     if (user) {
//         user.password = newPassword;
//         let updateduser = await user.save();
//         res.send(updateduser)
//     } else {
//         res.send({ message: "User Not Exist", success: false })
//     }
// })

// router.put("/activate_deactivate", async function (req, res) {
//     const { id, active } = req.body
//     const updatedUser = await AuthModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active })
//     res.send(updatedUser)
// })

// // file uplaod uisng express-fileupload
// // router.post("/profileupload/:email",async function (req, res) {

// //     const fileName = req.files.profile.name
// //     const fileData = req.files.profile;
// //     const uploadPath = path.join(__dirname, "../", "uploads")
// //     fileData.mv(uploadPath + "/" + fileName, async function (err) {
// //         if (err)
// //             return res.send(err)
// //         console.log(uploadPath + "/" + fileName)
// //         const updatedUser = await AuthModel.updateOne({email:req.params.email},{profilepic:fileName})
// //         res.send(updatedUser)
// //     })
// // })

// // file upload uisng multer
// router.post("/profileupload/:email", upload.single('profile'), async function (req, res) {
//     // const url = req.protocol + '://' + req.get('host')
//     const updatedUser = await AuthModel.updateOne({email:req.params.email},{profilepic:req.file.filename})
//     res.send(updatedUser)
// })


// module.exports = router





const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require("path");
const mongoose = require("mongoose");
const authController = require("../controllers/auth");
const AuthModel = require("../models/auth");

const router = express.Router();

// Create a storage strategy for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});

// Create a multer instance with the storage strategy
const upload = multer({ storage: storage });

router.post("/signup", async function (req, res) {
    const { email, password } = req.body;
    let isUserExist = await AuthModel.findOne({ email: email });

    if (isUserExist) {
        return res.status(409).send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({ ...req.body, password: hashedPassword, active: true });
    await newUser.save();
    res.status(201).send({ message: "User Signup successfully", success: true });
});

router.post("/login", authController.login);

function checkForToken(req, res, next) {
    if (req.headers['authorization']) {
        next();
    } else {
        return res.status(403).send("You don't have access to this route");
    }
}

router.get("/profile/:email", checkForToken, async function (req, res) {
    let user = await AuthModel.findOne({ email: req.params.email });
    res.status(200).send(user);
});

router.get("/users", async function (req, res) {
    let users = await AuthModel.find({});
    res.status(200).send(users);
});

router.put("/changePassword", async function (req, res) {
    const { email, currentPassword, newPassword } = req.body;
    let user = await AuthModel.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (isMatch) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            res.status(200).send({ message: "Password updated successfully", success: true });
        } else {
            res.status(401).send({ message: "Current password is incorrect", success: false });
        }
    } else {
        res.status(404).send({ message: "User Not Exist", success: false });
    }
});

router.put("/activate_deactivate", async function (req, res) {
    const { id, active } = req.body;
    const updatedUser = await AuthModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active });
    res.status(200).send(updatedUser);
});

router.post("/profileupload/:email", upload.single('profile'), async function (req, res) {
    const updatedUser = await AuthModel.updateOne({ email: req.params.email }, { profilepic: req.file.filename });
    res.status(200).send(updatedUser);
});

module.exports = router;
