const db = require('../models')
const User = db.user
const ROLES = db.ROLES

console.log(typeof(User));

const checkDuplicateUsernameOrEmail = async(req, res, next) =>{
    try{
        // check username chosen is already present in database or not
        const user = await User.findOne({
            where : {
                username : req.body.username
             }
        })
        if(user){
            return res.status(400).send("Username already exist! Kindly provide a diiferent user name")
        }

        //check email id is already present in database or not
        const existedEmail = await User.findOne({
            where : {
                email : req.body.email
            }
        })
        if(existedEmail){
            return res.status(400).send("Email id already exist ! Kindly provide a different email id")
        }

        next()

    }catch(err){
        console.log("Error while validating sign up functionalities");
        res.status(500).send({
            message : "Internal server Error"
        })
    }
}

// check role provided is exist or not
const roleExisted = async(req, res, next) =>{
    try{
        

        if(req.body.roles){
            //need to iterate for all roles and check it is valid roles or not
            for (i=0; i<req.body.roles.length; i++){
                if(!ROLES.includes(req.body.roles[i])){
                    return res.status(400).send("Role does not exist")
                }
            }
        }

        next()

    }catch(err){
        console.log("Error while checking checking role functionalities", err.message);
        res.status(500).send({
            message : "Internal server Error"
        })
    }
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail : checkDuplicateUsernameOrEmail,
    roleExisted : roleExisted
}

module.exports = verifySignUp