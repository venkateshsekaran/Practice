const ClientController = require('../controllers/clientController')
const { verifyAuthenticateToken } = require('../utils/jwt.utils')

const router = require('express').Router()
router.post('/getClientInfo',(...args) =>ClientController.getClientInfo(...args) )
router.post('/getControllerDetail',(...args) => ClientController.getControllerDetail(...args))

module.exports = router