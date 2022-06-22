const ahuModel = require('../models/ahuModel');
const ductModel = require('../models/ductModel');

class ClientController {

    async getClientInfo(request,response) {
        try {
            let clientInfo= await require('../models/clientModel').findOne({clientId:request.body.clientId}).lean()
            if(clientInfo) {
                for (let j = 0; j < clientInfo.addresses.length; j++) {
                    const address = clientInfo.addresses[j];
                    for (let k = 0; k < address.floors.length; k++) {
                        const floor = address.floors[k];
                        let ahu =await ahuModel.findOne({clientId : clientInfo.clientId, floorNo : floor},{'ahu':1,_id:0}) 
                        let  duct =await ductModel.findOne({clientId : clientInfo.clientId, floorNo : floor},{'ahu':1,_id:0})
                        address.floors = [{floorNo : floor,
                        ahu : ahu ? ahu.ahu : [],duct :duct ? duct.duct :[]}]
                    }
                }
            }
            return response.status(200).send({code:200,responseData : clientInfo}) 
        } catch (error) {
            console.log(error);
        }
    }
    async getControllerDetail(request,response) {
        try {
        let controllerData = await require('../models/controllerModel').findOne({controllerId:request.body.controllerId})
        return response.status(200).send({code:200,responseData : controllerData})
    } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ClientController()