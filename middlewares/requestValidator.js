/**
 * File will contain logic  for validating request body
 */

const { category } = require("../models")
const db = require('../models')
const Category = db.category

// Validate request body for categories
const validateCategoryBody = (req, res, next) =>{
    if (!req.body.name){
        return res.status(400).send("Name of the category is not provided")
    }

    if(!req.body.description){
        return res.status(400).send("Description is not provided")
    }

    next()
}

//validate request body for products
const validateProductBody = async(req, res, next) =>{
    if (!req.body.name){
        return res.status(400).send("Name of the product is not provided")
    }

    if(!req.body.description){
        return res.status(400).send("Description is not provided")
    }

    if(req.body.cost <= 0){
        return res.status(400).send("Cost of product is not provided / correct")
    }

    if(req.body.categoryId){
        // Check if categoryId provided is valid or not
        try{
            const category = await Category.findByPk(req.body.categoryId)
            if(!category){
                return res.status(400).send("CategoryID is not correct")
            }else {
                next()
            }
        }catch(err){
            console.log("Error ", err.message);
            res.status(500).send("Internal server error")
        }
    }else {
        return res.status(400).send("CategoryID is not provided")
    }

    
}

module.exports = {
    validateCategoryBody : validateCategoryBody,
    validateProductBody : validateProductBody
}