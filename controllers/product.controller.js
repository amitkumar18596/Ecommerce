/**
 * This file contain the logic for controller
 */
const db = require('../models')
const Product = db.product

// Create Products
exports.create = async(req, res) =>{
    const product   = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }

    try{
        const createdProduct = await Product.create(product)
        res.status(201).send(createdProduct)
    }catch(err){
        console.log("Error while creating Product", err.message);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

// Get all products
exports.findAll = async(req, res) =>{
    try{
        const productName = req.query.name
        if (productName){
            const findAllProducts = await Product.findAll({
                where : {
                    name : productName
                }
            })
            return res.status(200).send(findAllProducts)
        }else{
            const findAllProducts = await Product.findAll()
            return res.status(200).send(findAllProducts)
        }
    }catch(err){
        console.log("Error while fetching product", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// get product based on Id
exports.getProductById = async(req, res) =>{
    const productId = req.params.id
    try{
        const product = await Product.findByPk(productId)
        if(product){
            return res.status(200).send(product)
        }else{
            return res.status(422).send("There is no such product with productID : ", productId)
        }
    }catch(err){
        console.log("Error while fetching product by ID", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// update product
exports.update = async(req, res) =>{
    const productId = req.params.id
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }
    try{
        const updatedProduct = await Product.update(product,{
            where : {
                id : productId
            },
            returning : true
        })

    //Return the product
    const returnProduct = await Product.findByPk(productId)
    if(returnProduct){
        return res.status(200).send(returnProduct)
    }
         
    }catch(err){
        console.log("Error while update a product based on it's id", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// delete products
exports.delete = async(req, res) =>{
    try{
        const product = await Product.destroy(

            {where : {id : req.params.id}}
        )
        res.status(200).send("Successfully deleted the product")

    }catch(err){
        console.log("Error while update a product based on it's id", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}