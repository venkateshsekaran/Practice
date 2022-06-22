const ClientModel = require('../models/clientModel')
const AhuModel = require('../models/ahuModel');
const DuctModel = require('../models/ductModel');
class AdminDashBoard {
    async getAllClientList(request,response){
        try {
        let clientDetails = await ClientModel.find({},{clientName:1,clientId:1,clientEmail:1})
        // console.log(clientDetails);
        return response.status(200).send({code : 200, responseJson : clientDetails})
        } catch (error) {
            console.log(error);
        }
    }
    async getSingleClientDetails(request,response) {
        try {
            let clientData = await ClientModel.findOne({clientId : request.body.clientId},{'addresses':1})
            return response.status(200).send({code : 200,responseJson:clientData})
        } catch (error) {   
            console.log(error);          
        }
    }
    async getFloorListForBuildingNo(request,response){
        try {        
            let clientFloorData = await ClientModel.findOne({clientId : request.body.clientId,'addresses.addressId':request.body.addressId,'addresses.buildingNo':request.body.buildingNo},{'addresses.$':1})
            if(clientFloorData && clientFloorData.addresses.length) clientFloorData = clientFloorData.addresses[0].floors
            return response.status(200).send({code :200 , responseJson:clientFloorData})
        } catch (error) {
            console.log(error)
        }
    }
    async getAhuOrDuctList(request,response){
        try {
            // console.log("hello")
            // console.log(request.body);
               let ahusData =await AhuModel.findOne({clientId : request.body.clientId,floorNo : request.body.floorNo,
        addressId:request.body.addressId})
         return response.status(200).send({code:200,responseJson:ahusData})
                
        } catch (error) {
            console.log(error)
        }
    }
    async getControllerIdsForAhu(request,response) {
        try {
            let controllerIds  = []
            console.log(request.body);
            let ahusData =await AhuModel.findOne({clientId : request.body.clientId,floorNo : request.body.floorNo,
                addressId:request.body.addressId,'ahuDetails.AHUNumber':request.body.AHUNumber},{'ahuDetails.$':1})
                // console.log(ahusData);
            if(ahusData && ahusData.ahuDetails.length) {
                if(ahusData.ahuDetails[ahusData.ahuDetails.length-1] && ahusData.ahuDetails[ahusData.ahuDetails.length-1].coil) { 
                    if(controllerIds.indexOf(ahusData.ahuDetails[0].coil.controllerId) == -1) {
                        
                        controllerIds.push(ahusData.ahuDetails[0].coil.controllerId) 
                    }
                }
                if(ahusData.ahuDetails[0] && ahusData.ahuDetails[0].duct.length) {
                    for (const duct of ahusData.ahuDetails[0].duct) {
                        if(controllerIds.indexOf(duct.controllerId) == -1) {
                        controllerIds.push(duct.controllerId)   
                    }
                    }
                }
            }
            console.log(controllerIds,'the');
            return response.status(200).send({code : 200,responseJson : controllerIds})
            } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new AdminDashBoard();