const DriverModel = require('../models/driverModel')
const LampModel = require('../models/lampModel')
const UvhealModel = require('../models/uvhealModel')
const GatewayModel = require('../models/gatewayModel')
const ControllerModel = require('../models/controllerModel')
const AhuModel = require('../models/ahuModel')
const DuctModel = require('../models/ductModel')
const { updateOne } = require('../models/gatewayModel')

class driverController {
    async saveDrivers(request, response) {
        try {
            let driver = request.body.driver
            let checkDriverIds = await DriverModel.findOne({ id: driver.id })
            if (checkDriverIds) return response.status(409).send({ code: 409, message: 'Driver is already exists' })
            await DriverModel(driver).save();
            return response.status(200).send({ code: 200, message: 'Driver saved successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getDriverList(request, response) {
        try {
            let driverDetail = await DriverModel.find({})
            return response.status(200).send({ code: 200, responseData: driverDetail })
        } catch (error) {
            console.log(error);
        }
    }
    async updateDriverList(request, response) {
        try {
            let driverData = request.body.driverData
            await DriverModel.updateOne({ _id: driverData._id }, { $set: driverData })
            return response.status(200).send({ code: 200, message: 'Driver update successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteDriver(request, response) {
        try {
            await DriverModel.deleteOne({ id: request.body.driverId })
            return response.status(200).send({ code: 200, message: 'Driver delete successfully' })
        } catch (error) {
            console.log(error);
        }
    }
}
class lampController {
    async saveLamp(request, response) {
        try {
            let lamp = request.body.lamp
            let checkLampIds = await LampModel.findOne({ id: lamp.id })
            if (checkLampIds) return response.status(409).send({ code: 409, message: 'lamp is already exists' })
            await LampModel(lamp).save();
            return response.status(200).send({ code: 200, message: 'lamp saved successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getLampList(request, response) {
        try {
            let lampDetail = await LampModel.find({})
            if (lampDetail.length)
                for (const lamp of lampDetail) {
                    lamp['driverDetail'] = await DriverModel.findOne({ id: lamp.id })
                }
            return response.status(200).send({ code: 200, responseData: lampDetail })
        } catch (error) {
            console.log(error);
        }
    }
    async updateLampList(request, response) {
        try {
            let lamp = request.body.lamp
            await LampModel.updateOne({ _id: lamp._id }, { $set: lamp })
            return response.status(200).send({ code: 200, message: 'Lamp update successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteLamp(request, response) {
        try {
            await LampModel.deleteOne({ _id: request.body.lampId })
            return response.status(200).send({ code: 200, message: 'Lamp delete successfully' })
        } catch (error) {
            console.log(error);
        }
    }
}

class uvHealController {
    async saveUvhealModel(request, response) {
        try {
            let uvHeal = JSON.parse(request.body.uvHeal)
            let checkLampIds = await UvhealModel.findOne({ modelId: uvHeal.modelId })
            // if(request.file) uvHeal['realJsReport'] = {fileName : request.file.originalName,path:request.file.path}
            if (checkLampIds) return response.status(409).send({ code: 409, message: 'Uvheal Model is already exists' })
            await UvhealModel(uvHeal).save();
            return response.status(200).send({ code: 200, message: 'Uvheal Model saved successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getUvhealModelList(request, response) {
        try {
            let uvhealModel = await UvhealModel.find({})
            if (uvhealModel.length)
                for (const uvheal of uvhealModel) {
                    uvheal['driverDetail'] = await DriverModel.findOne({ id: uvheal.driver })
                    uvheal['lampType'] = await LampModel.findOne({ id: uvheal.lampType }).select("id")
                }
            return response.status(200).send({ code: 200, responseData: uvhealModel })
        } catch (error) {
            console.log(error);
        }
    }
    async updateUvhealModelList(request, response) {
        try {
            let uvHeal = request.body.uvHeal
            await UvhealModel.updateOne({ _id: uvHeal._id }, { $set: uvHeal })
            return response.status(200).send({ code: 200, message: 'Uvheal model update successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteUvhealModel(request, response) {
        try {
            await UvhealModel.deleteOne({ _id: request.body.uvHealId })
            return response.status(200).send({ code: 200, message: 'Uvheal model delete successfully' })
        } catch (error) {
            console.log(error);
        }
    }
}
class gatewayController {
    async saveGateway(request, response) {
        try {
            let gateway = request.body.gateway
            console.log(gateway, request.body);
            if (gateway.length) {
                for (const gatewayData of gateway) {
                    let gatewayDetail = await GatewayModel.findOne({ clientId: gatewayData.clientId }).lean()
                    if (gatewayDetail) {
                        let sqsStatusUrl = gatewayDetail.sqsStatusUrls.find(p => p == gatewayData.sqsStatusUrl)
                        let sqsCommandUrl = gatewayDetail.sqsCommandUrls.find(p => p == gatewayData.sqsCommandUrl)
                        if (sqsStatusUrl || sqsCommandUrl) return response.status(500).send({ code: 500, message: `${sqsStatusUrl ? 'Sqs status url ' : 'Sqs command url '} already assigned to clientId ${gatewayData.clientId}` })
                    }
                    let splitQueueurl = gatewayData.sqsCommandUrl.split('/')
                    let queueName = splitQueueurl[splitQueueurl.length - 1]
                    let controllers = []
                    for (let i = 0; i < gatewayData.controllerIds.length; i++) {
                        let controllerId = gatewayData.controllerIds[i];
                        if (gatewayDetail) {
                            let count = gatewayDetail.controllerIds.filter(p => p.queueName == queueName)
                            if (count.length > 32) return response.status(500).send({ code: 500, message: `The controller Id upto 32 assigned on one gateway ${gatewayData.sqsStatusUrl}` })
                            if (gatewayDetail.controllerIds.find(p => p.controllerId == controllerId)) return response.status(500).send({ code: 500, message: `${controllerId} controllerId  is already assigned to this sqsUrls ` })
                            gatewayDetail.controllerIds.push({ controllerId: controllerId, queueName: queueName })
                            controllers = gatewayDetail.controllerIds

                        }
                        else if (!gatewayDetail) controllers.push({ controllerId: controllerId, queueName: queueName })
                    }
                    gatewayData.controllerIds = controllers
                    await GatewayModel.updateOne({ clientId: gatewayData.clientId }, { $set: gatewayData, $push: { sqsStatusUrls: gatewayData.sqsStatusUrl, sqsCommandUrls: gatewayData.sqsCommandUrl } }, { upsert: true })
                }
            }
            return response.status(200).send({ code: 200, message: 'Gateway saved successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getGateway(request, response) {
        try {
            let gateway = await GatewayModel.find({})
            return response.status(200).send({ code: 200, responseData: gateway })
        } catch (error) {
            console.log(error);
        }
    }
    async updateGatewayList(request, response) {
        try {
            let gateway = request.body.gateway
            let updateGatewayObject = {
                clientId: gateway.clientId,
                gatewayDescription: gateway.gatewayDescription,
                gatewayId: gateway.gatewayId,
                macAddress: gateway.macAddress,
                serialNo: gateway.serialNo,
                sqsCommandUrls: [gateway.sqsCommandUrl],
                sqsStatusUrls: [gateway.sqsStatusUrl]
            }
            await GatewayModel.updateOne({ _id: gateway._id }, { $set: updateGatewayObject })
            return response.status(200).send({ code: 200, message: 'Gateway update successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteGatewayData(request, response) {
        try {
            await GatewayModel.deleteOne({ _id: request.body.gatewayId })
            return response.status(200).send({ code: 200, message: 'Gateway delete successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getControllerIdBasedOnClient(request, response) {
        try {
            let controllerIds = []
            let clientAhuData = await AhuModel.findOne({ clientId: request.body.clientId })
            if (clientAhuData.ahuDetails.length) {
                for (const ahus of clientAhuData.ahuDetails) {
                    console.log(ahus.duct.length);
                    if (ahus.coil) {
                        if (controllerIds.indexOf(ahus.coil.controllerId) == -1) {
                            controllerIds.push({ id: ahus.coil.controllerId })
                        }

                    }
                    if (ahus.duct.length > 0) {
                        console.log(ahus.duct);
                        for (const ductControllerId of ahus.duct) {
                            console.log(ductControllerId.controllerId);
                            if (controllerIds.indexOf(ductControllerId.controllerId) == -1) {
                                controllerIds.push({ id: ductControllerId.controllerId })
                            }

                        }
                    }
                }
            }
            console.log(controllerIds);
            return response.status(200).send({ code: 200, responseJson: controllerIds })

        } catch (error) {
            console.log(error)
        }
    }
}
class controllers {
    async saveController(request, response) {
        try {
            let controller = request.body.controller
            let checksController = await ControllerModel.findOne({ controllerId: controller.controllerId })
            if (checksController) return response.status(409).send({ code: 409, message: 'Controller is already exists' })
            await ControllerModel(controller).save();
            // await ControllerModel.updateOne({controllerId : controller.controllerId},{$set:controller},{upsert:true})
            return response.status(200).send({ code: 200, message: 'Controller Model saved successfully' })
        } catch (error) {

        }
    }
    async getController(request, response) {
        try {
            let controller = await ControllerModel.find({})
            console.log(controller);
            return response.status(200).send({ code: 200, responseData: controller })
        } catch (error) {
            console.log(error);
        }
    }
    async updateControllerList(request, response) {
        try {
            let controller = request.body.controller
            console.log(controller);
            await ControllerModel.updateOne({ controllerId: controller.controllerId }, { $set: controller })
            return response.status(200).send({ code: 200, message: 'Controller Model update successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async deleteControllerList(request, response) {
        try {
            await ControllerModel.deleteOne({ controllerId: request.body.controllerId })
            return response.status(200).send({ code: 200, message: 'Controller Model delete successfully' })
        } catch (error) {
            console.log(error);
        }
    }
}
class CommonController {
    constructor() {
        this.driverController = new driverController(),
            this.lampController = new lampController(),
            this.gatewayController = new gatewayController(),
            this.controllers = new controllers(),
            this.uvHealModel = new uvHealController()
    }
}
module.exports = new CommonController()