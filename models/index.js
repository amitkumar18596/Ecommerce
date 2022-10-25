const Sequelize  = require('sequelize')
const config = require('../configs/db.config')

//create the db connection

const sequelize = new Sequelize (
    config.DB,
    config.USER,
    config.PASSWORD , {
        host : config.HOST,
        dialect : config.dialect,
        pool :{
            max  : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }

)

// expose the sequelize and catagory model
var db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.category = require('./category.model')(sequelize, Sequelize)

module.exports = db