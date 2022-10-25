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
    Category.findAll().then(categories =>{
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