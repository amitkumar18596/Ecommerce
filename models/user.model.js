/** This file will contain schema for user */

module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define("user", {
        email : {
            type : Sequelize.STRING
        },
        username : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        }
    })

    return User
}