const mongoose = require('mongoose')

const controllerSqsData = mongoose.Schema({
    controllerId : {type :String} ,
    lamps :{type :Array} ,
    uvSensorValue : {type :String} ,
    airSpeedValue : {type : String} ,
    scaleFactor:{type:String},
    di : {type :Array},
    mode : {type:String},
    createdSqsDate:{type:Date}
    // Controller Id
    // Lamps (Multiple Lamps Status)
    // ➢ Lamp 1 Status
    // UV Sensor Value
    // Air Speed Sensor Value
    // Scale Factor (Decimal Number)
    // DI (DI Multiple Status Data)
    // Mode
})

module.exports = mongoose.model("controllerSqsData",controllerSqsData)