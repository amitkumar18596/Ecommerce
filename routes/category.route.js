/**
 * This file will be used for writing the path
 */
const categoryController = require('../controllers/category.controller')
const {requestValidator, authJwt} = require('../middlewares')

module.exports = (app) =>{
    app.post('/ecom/api/v1/categories', [authJwt.verifyToken, requestValidator.validateCategoryBody], categoryController.create)
    
    app.get('/ecom/api/v1/categories', categoryController.getAll)

    app.get('/ecom/api/v1/categories/:id', categoryController.findOne)

    app.put('/ecom/api/v1/categories/:id', [requestValidator.validateCategoryBody], categoryController.update)
}