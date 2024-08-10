// async function login (req, res) {
//     // first check user exist or not
//     // if user present with given email
//     // check entred password is equal to stored password 
//     //otherwise send error message that password is wrong
//     // if user is not present then send error user not exist  
//     const { fullName, email, password, rePassword } = req.body
//     let isUserExist = await AuthModel.findOne({ email: email })
//     if (isUserExist) {
//         if (password === isUserExist.password) {
//             // token generation line and pass to client
//             if (isUserExist.active === false) {
//                 return res.send({ message: "Your account has been Deactivated", success: false })
//             } else {
//                 let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey")
//                 return res.send({ message: "User Logged in Successfully", success: true, token: token, email: isUserExist.email, userId: isUserExist._id, role: isUserExist.role })
//             }

//         } else {
//             return res.send({ message: "Invalid credentials", success: false })
//         }

//     } else {
//         return res.send({ message: "User Not Exist", success: false })
//     }
// }

// module.exports={
//     login
// }





const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AuthModel = require("../models/auth");

async function login(req, res) {
    const { email, password } = req.body;
    let isUserExist = await AuthModel.findOne({ email: email });

    if (isUserExist) {
        const isMatch = await bcrypt.compare(password, isUserExist.password);
        if (isMatch) {
            if (isUserExist.active === false) {
                return res.status(403).send({ message: "Your account has been Deactivated", success: false });
            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey", { expiresIn: '1h' });
                return res.status(200).send({ 
                    message: "User Logged in Successfully", 
                    success: true, 
                    token: token, 
                    email: isUserExist.email, 
                    userId: isUserExist._id, 
                    role: isUserExist.role 
                });
            }
        } else {
            return res.status(401).send({ message: "Invalid credentials", success: false });
        }
    } else {
        return res.status(404).send({ message: "User Not Exist", success: false });
    }
}

module.exports = {
    login
};
