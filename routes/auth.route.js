const authController = require('../controllers/auth.controller')
const {verifySignUp } = require('../middlewares')

module.exports = (app) =>{
    // User creation
    app.post('/ecom/api/v1/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.roleExisted], authController.signUp)

    //User signin
    app.post('/ecom/api/v1/auth/signin', authController.signIn)
}