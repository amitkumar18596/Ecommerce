/**
 * This file will be used for initilizing models once server runs everytime
 */
//const { Category, Product, Role } = require('../models');
const db = require('./models')
const Category = db.category
const Product = db.product
const Role = db.role

exports.init = async() => {
    // Initializing categories
    var categories = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products"
        },
        {
            name: "book corner",
            description: "This category will contain all study related items"
        },
        {
            name:" MEN CLOTHES",
            description: "This category will contain description for men clothes"
        }
    ];

    const createdCategories = await Category.bulkCreate(categories)

    //Initializing products
    var products = [
        {
            name : "HP Laptop",
            description : "This product contain description of HP Laptop",
            cost : 55559,
            categoryId : 1
        },
        {
            name : "SAMSUNG 7S Mobile",
            description : "This product contain description of SAMSUNG 7S Mobile phone",
            cost : 38999,
            categoryId : 1
        },
        {
            name : "DO THE EPIC SHIT",
            description : "This product contain description of book DO THE EPIC SHIT",
            cost : 139,
            categoryId : 2
        },
        {
            name : "JEANS Pant",
            description : "This product contain description of Jeans pant for men",
            cost : 699,
            categoryId : 3
        }
    ]

    const createdProducts = await Product.bulkCreate(products)

    //initializing roles
    var roles = [{
        id : 1,
        name : "customer"
    },
    {
        id : 2,
        name : "admin"
    }]

    const createdRoles = await Role.bulkCreate(roles)

}