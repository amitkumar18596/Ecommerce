/**
 * This file will contain schema definition for category
 */


 module.exports = (sequelize, Sequelize) =>{
    const Category = sequelize.define("category", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name :{
            type : Sequelize.STRING,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING
        }
    })

    return Category
 }