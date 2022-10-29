/**
 * Routing : Writing the REST APIs
 */
const productController = require('../controllers/product.controller')

module.exports = (app) =>{
    // Route for creating new product
    app.post('/ecom/api/v1/products', productController.create)

    //Route for getting all products
    app.get('/ecom/api/v1/products', productController.findAll)

    //Route for getting product by ID
    app.get('/ecom/api/v1/products/:id', productController.getProductById)

    // Route for updating a product 
    app.put('/ecom/api/v1/products/:id', productController.update)

    //Route for deleting a product
    app.delete('/ecom/api/v1/products/:id', productController.delete)
}