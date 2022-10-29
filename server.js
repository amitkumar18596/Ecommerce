const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const serverConfig = require('./configs/server.config')
const sequelize = require('./database')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


//Code for table initialization
const db  = require('./models')
const Category = db.category

//Create the table
db.sequelize.sync().then(()=>{
    console.log("Databse connected successfully");
}).catch((err)=>{
    console.log(err.message);
})

//Routing
require('./routes/category.route')(app)
require('./routes/product.route')(app)

app.listen(serverConfig.PORT, (req, res) =>{
    console.log("App is running on port :", serverConfig.PORT);
})