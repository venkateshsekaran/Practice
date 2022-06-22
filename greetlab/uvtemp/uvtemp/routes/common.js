const CommonController = require('../controllers/commonController')
const { verifyAuthenticateToken } = require('../utils/jwt.utils');

const router = require('express').Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
      },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage}).single('file')


router.post('/saveDriver',verifyAuthenticateToken,(...args) => CommonController.driverController.saveDrivers(...args))
router.post('/getDriverList',verifyAuthenticateToken,(...args)=>CommonController.driverController.getDriverList(...args))
router.post('/updateDriverList',verifyAuthenticateToken,(...args)=>CommonController.driverController.updateDriverList(...args))
router.post('/deleteDriver',verifyAuthenticateToken,(...args)=>CommonController.driverController.deleteDriver(...args))


router.post('/saveLamp',verifyAuthenticateToken,(...args) => CommonController.lampController.saveLamp(...args))
router.post('/getLampList',verifyAuthenticateToken,(...args)=>CommonController.lampController.getLampList(...args))
router.post('/updateLampList',verifyAuthenticateToken,(...args) => CommonController.lampController.updateLampList(...args))
router.post('/deleteLamp',verifyAuthenticateToken,(...args) => CommonController.lampController.deleteLamp(...args))

router.post('/saveUvhealModel',verifyAuthenticateToken,upload,(...args) => CommonController.uvHealModel.saveUvhealModel(...args))
router.post('/getUvhealModelList',verifyAuthenticateToken,(...args)=>CommonController.uvHealModel.getUvhealModelList(...args))
router.post('/updateUvhealModelList',verifyAuthenticateToken,(...args) => CommonController.uvHealModel.updateUvhealModelList(...args))
router.post('/deleteUvhealModel',verifyAuthenticateToken,(...args) => CommonController.uvHealModel.deleteUvhealModel(...args))


router.post('/saveGateway',verifyAuthenticateToken,(...args) => CommonController.gatewayController.saveGateway(...args))
router.post('/getGatewayList',verifyAuthenticateToken,(...args)=>CommonController.gatewayController.getGateway(...args))
router.post('/updateGatewayList',verifyAuthenticateToken,(...args) => CommonController.gatewayController.updateGatewayList(...args))
router.post('/deleteGateway',verifyAuthenticateToken,(...args) => CommonController.gatewayController.deleteGatewayData(...args))
router.post('/getControllerIdBasedOnClient',verifyAuthenticateToken,(...args) => CommonController.gatewayController.getControllerIdBasedOnClient(...args))

router.post('/saveController',verifyAuthenticateToken,(...args) => CommonController.controllers.saveController(...args))
router.post('/updateControllerList',verifyAuthenticateToken,(...args) => CommonController.controllers.updateControllerList(...args))
router.post('/deleteControllerList',verifyAuthenticateToken,(...args) => CommonController.controllers.deleteControllerList(...args))
router.post('/getController',verifyAuthenticateToken,(...args)=>CommonController.controllers.getController(...args))

module.exports = router