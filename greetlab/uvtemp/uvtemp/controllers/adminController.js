const ClientModel = require("../models/clientModel");
const UserModel = require("../models/userModel");
const AHUModel = require('../models/ahuModel')
const DuctModel = require('../models/ductModel');
const Email = require('../utils/email')
const JwtUtils = require('../utils/jwt.utils');
const uvhealModel = require("../models/uvhealModel");
const controllerModel = require("../models/controllerModel");   
const driverModel = require("../models/driverModel");  
const ControllerModel = require('../models/controllerModel')
class AdminController {
    async saveClient(request, response) {
        try {
            let url
            let clientData = request.body.clientData
            if (clientData.addresses.length) {
                for (const address in clientData.addresses) {
                    if (clientData.addresses.hasOwnProperty.call(clientData.addresses, address)) {
                        const data = clientData.addresses[address];
                        let floors = await this.getSavingData(clientData, data.floors,data.address, data.buildingNo,request.userId)
                    }
                }
            }
            let saveClient = {
                email : clientData.clientEmail,
                password : null,
                userType: 'client',
                clientId : clientData.clientId,
                createdOn : new Date()
            }
            let clientInfo = await UserModel(saveClient).save();
            let userInvitationToken = await JwtUtils.generateJwtToken(clientInfo._id, 84000)

            process.env.NODE_ENV === "production" ?  url = `http://3.109.5.74/set-password?token=${userInvitationToken}` : url = `http://3.109.5.74/set-password?token=${userInvitationToken}`

            await require('../models/tokenModel')({
                userId: clientInfo._id,
                token: userInvitationToken,
                email: saveClient.email,
                expiresIn: 900
            }).save()

            Email.sendInvitationLink(saveClient.email, { url: url })
            return response.status(200).send({ code: 200, message: 'Client saved successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async getSavingData(data, values,address, buildingNo,userId) {
        try {
            let floors = []
            if (values.length) {
                for (const key in values) {
                    if (values.hasOwnProperty.call(values, key)) {
                        const val = values[key];
                        let randomValue =  Math. floor(Math. random() * 100)
                        floors.push({floorNo:val.floorNo,type:val.ahu.length ? 'AHU':'DUCT'})
                        
                        if (val.ahu.length) {
                            for (const ahuDetails of val.ahu) {
                                ahuDetails['coil'] = {
                                    uvHealCoil : ahuDetails.uvHealCoil,
                                    heightOfCoil: ahuDetails.heightOfCoil,
                                    widthOfCoil: ahuDetails.widthOfCoil,
                                    controllerId: ahuDetails.controllerId,
                                }
                            }
                            await AHUModel.updateOne({ floorNo: val.floorNo ,clientId: data.clientId}, {
                                $push: { ahuDetails: val.ahu },
                                $set: { floorNo: val.floorNo,clientId: data.clientId ,addressId:randomValue}
                            }, { upsert: true })
                        } 
                        //  if (val.duct.length) {
                        //     await DuctModel.updateOne({ floorNo: val.floorNo,clientId: data.clientId }, {
                        //         $push: { duct: val.duct },
                        //         $set: { floorNo: val.floorNo,clientId: data.clientId,addressId:randomValue }
                        //     }, { upsert: true })
                        // }
                        let clientInfo = await ClientModel.findOne({ userId:userId, clientId: data.clientId, clientEmail: data.clientEmail }) 
                        let query = null      
                        let savedObject ={ 
                            clientId: data.clientId,clientName: data.clientName,userId : userId, clientEmail: data.clientEmail,
                            addresses : [{
                                buildingNo : buildingNo,
                                addressId:randomValue,
                                floors : floors,
                                address : address
                            }]
                        }
                        let checkBuildingNo = await ClientModel.findOne({userId:userId, clientId: data.clientId, clientEmail: data.clientEmail,'addresses.buildingNo': buildingNo},{'addresses.$':1}) 
                        if(checkBuildingNo && checkBuildingNo.addresses.length) query ={$set: {clientId: data.clientId,clientName: data.clientName, clientEmail: data.clientEmail} , $push: { "addresses.$[].floors":floors }}
                       else if(clientInfo)  query = {$set: {clientId: data.clientId,clientName: data.clientName, clientEmail: data.clientEmail} , $push: { "addresses":savedObject.addresses }}
                        else query = {$set : savedObject}

                        await ClientModel.updateOne({ clientId: data.clientId, clientEmail: data.clientEmail },
                            query
                            ,{upsert : true})
                    }
                }
            }
        } catch (error) {
            console.log(error);   
        }
    }
    async updateClient (request,response) {
        try {
            let updatedObj = request.body.clientData   
            if(updatedObj) {
               for (const addresses of updatedObj.addresses) {
                   for (const floorsData of addresses.floors) {
                       await AHUModel.updateOne({clientId: updatedObj.clientId,addressId:addresses.addressId},
                        {$set : {ahuDetails : floorsData.ahu},floorNo :floorsData.floorNo.floorNo })
                   }
               }
               await ClientModel.updateOne({_id:updatedObj._id},{$set:updatedObj})
               
            }
            response.status(200).send({code:200,message : 'Client Update successfully'})
        } catch (error) { 
            console.log(error)
        }
    }
    async checkValidation(request, response) {
        try {
            let validation = request.body.validations
            let message = null
            let query = null
            if (validation.type == 'clientEmail' || validation.type == 'clientId'){
                query = { [validation.type]: { $regex: validation.values, $options: "i" } } 
                message = `${validation.type} is already exists .`
            }
            else if(validation.type == 'buildingNo'){
                query = { clientEmail:request.body.clientEmail ,clientId: request.body.clientId,'addresses.address':request.body.address,'addresses.buildingNo' :{ $regex: validation.values, $options: "i" } }
                message = 'Building No is already exists on this address.'
                // console.log(message);
            } 
            else if(validation.type == 'floors')  {
                query =  {clientEmail:request.body.clientEmail ,clientId: request.body.clientId,'addresses.address':request.body.address,
                'addresses.buildingNo' :request.body.buildingNo,'addresses.floors' :{ $in : validation.values}  }
                message = 'This floor number is already exists on this building no'
            }
            let checkValidation = await ClientModel.findOne(query)
            if(checkValidation && query) return response.status(200).send({code:500, message : message})
            if(request.body.type == 'AHU'  && (validation.type == 'name' || validation.type == 'AHUNumber' || validation.type == 'CFM')){
              let fieldName  = `ahu.${validation.type}`
                let checkValidationInAhu = await AHUModel.findOne({clientId: request.body.clientId ,floorNo : request.body.floorNo,[fieldName] : { $regex: validation.values, $options: "i" }})
              console.log(checkValidationInAhu);
                if(checkValidationInAhu) return response.status(500).send({code : 200 , message : `AHU ${validation.type} is already exists`})
            
            }else if(request.body.type == 'Duct') {
            
                let checkValidationInDuct = await DuctModel.findOne({ ductId: { $regex: validation.values, $options: "i" }})
            
                if(checkValidationInDuct) return response.status(500).send({code : 200 , message : `Duct id is already exists`})

            }
            
            
            return response.status(200).send({code:200,message : 'field does not have any error'} )
        } catch (error) {
            console.log(error);
        }
    }

    async getClientList(request,response) {
        try {
            let savedClientList = await ClientModel.find({}).lean();
            for (let i = 0; i < savedClientList.length; i++) {
                const client = savedClientList[i];
                for (let j = 0; j < client.addresses.length; j++) {
                    const address = client.addresses[j];
                    for (let k = 0; k < address.floors.length; k++) {
                        const floor = address.floors[k];
                        let ahu =await AHUModel.findOne({clientId : client.clientId, floorNo : floor.floorNo,addressId:address.addressId},{'ahuDetails':1,_id:0}) 
                        if(ahu) {
                            for (const ahuDetails of ahu.ahuDetails) { 
                                if(ahuDetails.hasOwnProperty('coil')) {
                                    ahuDetails.coil['controllerDetails'] = await ControllerModel.findOne({controllerId : ahuDetails.coil.controllerId})     
                                } 
                                if(ahuDetails.duct.length) {
                                    for (const ducts of ahuDetails.duct) {
                                        ducts['controllerDetails'] = await ControllerModel.findOne({controllerId : ducts.controllerId}) 
                                    }
                                }
                            }
                        }
                        address.floors = [{floorNo : floor,
                        ahu : ahu ? ahu.ahuDetails : []}]
                    }
                }
                
            }
            return response.status(200).send({code :200 ,responseData : savedClientList})
        } catch (error) {
            console.log(error);
        }
    }
    async deleteClient(request,response) {
        try {
            let user = await UserModel.findOne({ userType : 'Admin'})   

            let comparePassword = await JwtUtils.comparePassword(user.password, request.body.password)
            if (!comparePassword) {
                return response.send({
                    code: 403,
                    message: 'User password is not matched ! . '
                })
            }
            await ClientModel.deleteOne({clientId : request.body.clientId})
            await AHUModel.deleteOne({clientId : request.body.clientId})
            await UserModel.deleteOne({clientId : request.body.clientId})
            return response.status(200).send({code:200,message : ' You have delete sucessfully  '})
        } catch (error) {
            console.log(error)
        }
    }    
    async getUvHealCoilModelList(request,response){
        try {
            let query = request.body.searchString == null ? {modelType:request.body.type} : { modelName: { $regex: request.body.searchString, $options: "i" },modelType:request.body.type}
            let uvHealModelData  = await uvhealModel.aggregate([{$match:query}])
            return response.status(200).send({code :200,responseData : uvHealModelData})
        } catch (error) {
            console.log(error);
        }
    }
    async getControllerDataForId(request,response){
        try {
            let query = request.body.searchString == null ? {} : { controllerId: { $regex: request.body.searchString, $options: "i" } }
            
            let controllerData  = await controllerModel.aggregate([{$match:query}])
            console.log(controllerData);
            return response.status(200).send({code :200,responseData : controllerData})
        } catch (error) {
            console.log(error);
        }
    }
    async getDriverList(request,response){
        try {
            let query = request.body.searchString == null ? {} : { id: { $regex: request.body.searchString, $options: "i" } }
            let driverData  = await driverModel.aggregate([{$match:query}])
            return response.status(200).send({code :200,responseData : driverData})
        } catch (error) {
            console.log(error);
        }
    }
    async getLampList(request,response){
        try {
            let query = request.body.searchString == null ? {} : { id: { $regex: request.body.searchString, $options: "i" } }
            let lampData  = await lampModel.aggregate([{$match:query}])
            return response.status(200).send({code :200,responseData : lampData})
        } catch (error) {
            console.log(error);
        }
    }
    async searchClient(request,response) {
        try {
            let clientData = await ClientModel.aggregate([{$match : {$or:[{clientId :{ $regex: request.body.searchString, $options: "i" } },
                {clientName : { $regex: request.body.searchString, $options: "i" }}]}}])
            if(clientData.length) {
                for (const client of clientData) {
                    for (let j = 0; j < client.addresses.length; j++) {
                        const address = client.addresses[j];
                        for (let k = 0; k < address.floors.length; k++) {
                            const floor = address.floors[k];
                            let ahu =await AHUModel.findOne({clientId : client.clientId, floorNo : floor.floorNo,addressId:address.addressId},{'ahuDetails':1,_id:0}) 
                            // let  duct =await DuctModel.findOne({clientId : client.clientId, floorNo : floor},{'ahu':1,_id:0})
                            address.floors = [{floorNo : floor,
                            ahu : ahu ? ahu.ahuDetails : []}]
                        }
                    }
                }
            }
            return response.status(200).send({code:200,responseJSON:clientData})
        } catch (error) {
            console.log(error);  
        }
    }

}

module.exports = new AdminController()