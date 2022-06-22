const mongoose = require('mongoose')

const gatewaySchema = mongoose.Schema({
    controllerIds: [],
    clientId : {type:String},
    controllerConnected : {type :String},
    macAddress  :{type:String} ,
    serialNo : {type :String},
    gatewayId:{type:String},
    gatewayDescription : {type:String},
    sqsStatusUrls:{type:Array},
    sqsCommandUrls:{type : Array}
})

module.exports = mongoose.model("gateway",gatewaySchema)