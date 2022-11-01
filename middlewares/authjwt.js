// logic to validate jwt token
const jwt = require('jsonwebtoken')
const config = require('../configs/secret.config')
const { ROLES } = require('../models')
const db = require('../models')
const User = db.user

const verifyToken = async (req, res, next) => {
    // Read the token value from header
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send("no token provided")
    }

    //check the validity of thr token
    jwt.verify(token, config.secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send("Unauthorized")
        }

        req.userId = decodedToken.id //reading from user from token and setting it in req object

        next()
    })
}

//check user is admin or not
const isAdmin = async (req, res, next) => {
    // in previous middleware we got user id as token
    //using that user id i will be fetching from db and check the user type

    try {
        const user = await User.findByPk(req.userId)
       
        //
        if (user) {
            const roles = await user.getRoles()
            console.log(roles.length);
            for (i = 0; i < roles.length; i++) {
                console.log(roles[i].name);
                if (roles[i].name === "admin") {
                    
                    next()
                    return
                } else {
                    return res.status(403).send("Admin is only authorized to do this action")
                }
            }
        }
    } catch (err) {
        console.log("Error while authenticating as admin ", err.message);
        res.status(500).send("Internal server error")
    }
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt