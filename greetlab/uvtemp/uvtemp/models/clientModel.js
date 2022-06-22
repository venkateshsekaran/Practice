const { request } = require('express')
const mongoose = require('mongoose')

const clientSchema  = mongoose.Schema(
    {
        clientId : { type : String },
        userId  : {type : mongoose.Schema.Types.ObjectId},
        clientName: { type :String },
        clientEmail : { type : String },
        addresses : [{ 
            buildingNo : { type : String} ,
            address : { type : String } ,
            floors : [{
                floorNo : { type : String },
                type : { type : String },
            }],
            addressId : {type :String}
        }]
    }
)
module.exports = mongoose.model('client',clientSchema)