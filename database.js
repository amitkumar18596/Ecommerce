const Sequelize = require('sequelize')
const mysql = require('mysql2')

const sequelize = new Sequelize('sequelize_demo', 'root', 'Amit@54321', {
    dialect : "mysql",
    host : "localhost"
})

module.exports =sequelize