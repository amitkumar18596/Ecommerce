const cartController = require('../controllers/cart.controller')
const { authJwt } = require('../middlewares')

module.exports = (app) =>{
    app.post('/ecom/api/v1/carts', [authJwt.verifyToken], cartController.create)
}