/**
 * This file will have the logic for category
 */
const { category } = require('../models');
const db = require('../models')
const Category = db.category

//create a new category
exports.create = (req, res) =>{
    //create the category objects
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    // store into database
    Category.create(category).then(category =>{
        console.log(`category ${category.name} got inserted into db`);
        res.status(201).send(category)
    }).catch(err =>{
        console.log(`Error while creating db ${err.message}`);
        res.status(500).send({
            message : "Internal server error"
        })
    })
}

//get all categories
exports.getAll = (req, res) =>{
    let promise 
    //Implement query parama
    const categoryName = req.query.name
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        })
    }else {
        promise = Category.findAll()
    }
    promise.then(categories =>{
        res.status(200).send(categories)
    }).catch(err =>{
        console.log("Internal server error");
        res.status.send({
            message : "Error while finding all categories"
        })
    })
}

//get a category based on categoryId
exports.findOne = async(req, res) =>{
    const categoryId = req.params.id

    try{
        const category = await Category.findByPk(categoryId)
        if(category){
             res.status(200).send(category)
             //console.log(category);
        }else{
            return res.status(404).send({
                message : "There is no such category exist with this category Id :"
            })
        }

    }catch(err){
        console.log("Error while fetching the category based on CategoryId");
        res.status(500).send({
            message : "Internal server error"
        })
    }

}

//Update the category
exports.update = async(req, res) =>{
    try{
        // need to parse the request body
        const category = {
            name : req.body.name,
            description : req.body.description
        }

        // need to know which category has to be updated
        const categoryId = req.params.id

        //update the category
        const updatedCategory = await Category.update(category, {
            where : {id : categoryId},
            returning : true
        })

        //res.status(200).send(updatedCategory)

        //Return the updated category
        const returnCategory = await Category.findByPk(categoryId)
        if(returnCategory){
             res.status(200).send(returnCategory)
             //console.log(category);
        }else{
            return res.status(404).send({
                message : "There is no such category exist with this category Id :"
            })
        }

    }catch(err){
        console.log("Error while updating the category based on CategoryId", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}