const mongoose = require('mongoose')

const ahuSchema = new mongoose.Schema({
    floorNo :{type :String},
    clientId:{type :String},
    addressId : {type :String},
    ahuDetails : [{
        name :{type :String},
        AHUNumber : {type :String},
        CFM :{type: String},
        AHUMake : {type: String},
        AHUModel :{type : String},
        starterPanel : {type:String},
        limitSwitch :{type : String },
        UVHealSystemType:{type:String},
        coil : {type :Object},
        duct : []
        // heightOfCoil : {type:String},
        // widthOfCoil : {type :String},
       
        // controllerId : {type:String},
        // UVhealCoilModel : {type :String},
    }]
})
module.exports = mongoose.model('ahu',ahuSchema)