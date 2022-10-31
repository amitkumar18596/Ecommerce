const authController = require('../controllers/auth.controller')

module.exports = (app) =>{
    // User creation
    app.post('/ecom/api/v1/auth/signup', authController.signUp)

    //User signin
    app.post('/ecom/api/v1/auth/signin', authController.signIn)
}