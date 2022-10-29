/**
 * This file will be used for writing the path
 */
const categoryController = require('../controllers/category.controller')

module.exports = (app) =>{
    app.post('/ecom/api/v1/categories', categoryController.create)
    
    app.get('/ecom/api/v1/categories', categoryController.getAll)

    app.get('/ecom/api/v1/categories/:id', categoryController.findOne)

    app.put('/ecom/api/v1/categories/:id', categoryController.update)
}