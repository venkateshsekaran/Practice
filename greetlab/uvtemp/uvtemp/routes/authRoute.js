const router = require('express').Router() 
const AuthenticationController = require('../controllers/authenticationController')

router.post('/login',(...args) => AuthenticationController.login(...args))
router.post('/signup',(...args) => AuthenticationController.signup(...args)) 
router.post('/forgotPassword',(...args) => AuthenticationController.forgotPassword(...args)) 
router.post('/sendEmailToForgotPassword',(...args) => AuthenticationController.sendEmailToForgotPassword(...args)) 
router.post('/setPassword',(...args) => AuthenticationController.setPassword(...args)) 
// router.post('/signup',(...args) => AuthenticationController.signup(...args)) 
module.exports = router
