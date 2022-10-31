/**
 * Logic for authentication 
 */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const { User, Role, Sequelize } = require('../models')
const db = require('../models')
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op //Operations

const secretKey = require('../configs/secret.config')

//Handle for sign up
exports.signUp = async(req, res) =>{
    // Read the request body and create user object
    const userObj = {
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 8),
        email : req.body.email
    }

    //create the user obj in database
    try{
        const userCreated = await User.create(userObj)
        res.status(201).send("User created")

        // Need to provide correct role to the user
        if(req.body.roles){
            // need to create roles in the system 

            //need to check if desird role match with supported roles
            const roles = await Role.findAll({
                where : {
                    name : {
                        // where name i {1, 2, 3} or where nrole =1, or role=2 like this it is written in below format
                        [Op.or] : req.body.roles // It will return array
                    }
                }
            })

            // set the roles
            await userCreated.setRoles(roles)
            console.log("Registartion completed");
            res.status(201).send("User successfully registered")
        }else{
            /**
             * 2 options
             * one option is i fetch role object by running query
             * 
             
            await Role.findOne({
                where : {
                    name : "customer"
                }
            })

            await User.setRoles()
            res.status(201).send("User successfully registered")

            */
           await userCreated.setRoles([1]) // default role will be customer if user has not provided any role hence id=1 is put here
           res.status(201).send("User successfully registered")
        }

    }catch(err){
        console.log("error while user creation ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

//Handle for signin
exports.signIn = async(req, res) => {
    try{
        const user = await User.findOne({
            where : {
                "username" : req.body.username
            }
        })

        if(!user){
            return res.status(404).send("User not found")
        }

        //verify the password
        const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
        if(!isValidPassword){
            return res.status(401).send("Invalid password")
        }
        
        // Generate the token
        const token = jwt.sign({id : user.id}, secretKey.secret, {expiresIn : 1000})

        //I want to get the roles provided to users
        var authorities = []
        const roles = await user.getRoles()

        for (i = 0; i<roles.length; i++){
            authorities.push("ROLE_"+roles[i].name.toUpperCase())
        }

        res.status(200).send({
            id : user.id,
            username : user.username,
            email : user.email,
            accessToken : token
        })

    }catch(err){
        console.log("Error while user signin", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}