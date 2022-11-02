const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const serverConfig = require('./configs/server.config')
const sequelize = require('./database')
const init = require('./init')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//Code for table initialization
const db  = require('./models')
const Category = db.category
const Product = db.product

//set the relation between tables
Category.hasMany(Product)

//Create the table
db.sequelize.sync().then(()=>{
    //init.init()
    console.log("Databse connected successfully");
}).catch((err)=>{
    console.log(err.message);
})



//Routing
require('./routes/category.route')(app)
require('./routes/product.route')(app)
require('./routes/auth.route')(app)
require('./routes/cart.route')(app)

app.listen(serverConfig.PORT, (req, res) =>{
    console.log("App is running on port :", serverConfig.PORT);
})