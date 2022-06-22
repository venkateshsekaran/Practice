const ClientController = require('../controllers/adminController');
const AdminDashBoard = require('../controllers/adminDashboardController')
const ControllerSqsController = require('../controllers/controllerSqsController')
const { verifyAuthenticateToken } = require('../utils/jwt.utils');

const router = require('express').Router();

   

router.post('/saveClient',verifyAuthenticateToken,(...args) => ClientController.saveClient(...args))
router.post('/updateClient',verifyAuthenticateToken,(...args) => ClientController.updateClient(...args))

router.post('/deleteClient',verifyAuthenticateToken,(...args) => ClientController.deleteClient(...args))
router.post('/checkValidation',verifyAuthenticateToken,(...args)=>ClientController.checkValidation(...args))
router.get('/getClientList',verifyAuthenticateToken,(...args)=>ClientController.getClientList(...args)  )

router.post('/getUvHealCoilModelList',verifyAuthenticateToken,(...args) => ClientController.getUvHealCoilModelList(...args))
router.post('/getControllerDataForId',verifyAuthenticateToken,(...args) => ClientController.getControllerDataForId(...args))
router.post('/getDriverList',verifyAuthenticateToken,(...args) => ClientController.getDriverList(...args))
router.post('/getLampList',verifyAuthenticateToken,(...args) => ClientController.getLampList(...args))

router.post('/getAllClientList',verifyAuthenticateToken,(...args) => AdminDashBoard.getAllClientList(...args))
router.post('/getSingleClientDetails',verifyAuthenticateToken,(...args) => AdminDashBoard.getSingleClientDetails(...args))
router.post('/getFloorListForBuildingNo',verifyAuthenticateToken,(...args) => AdminDashBoard.getFloorListForBuildingNo(...args))
router.post('/getAhuOrDuctList',verifyAuthenticateToken,(...args) => AdminDashBoard.getAhuOrDuctList(...args))
router.post('/getControllerIdsForAhu',verifyAuthenticateToken,(...args) => AdminDashBoard.getControllerIdsForAhu(...args))

router.post('/getRealTimeReportUrlForControllerId',verifyAuthenticateToken,(...args) => ControllerSqsController.getRealTimeReportUrlForControllerId(...args))
router.post('/sendCommandsOfLamps',verifyAuthenticateToken,(...args) => ControllerSqsController.sendCommandsOfLamps(...args))
router.post('/resetTheLamps',verifyAuthenticateToken,(...args) => ControllerSqsController.resetTheLamps(...args))
router.post('/getLampAndDi',verifyAuthenticateToken,(...args) => ControllerSqsController.getLampAndDi(...args))

router.post('/searchClient',verifyAuthenticateToken,(...args)=> ClientController.searchClient(...args))

module.exports = router