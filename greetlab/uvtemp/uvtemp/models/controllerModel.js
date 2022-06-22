const mongoose = require('mongoose')

const controllerSchema = mongoose.Schema({
    controllerId :{type:String},
    connectedLamps  :{type :String},
    uvSensor : {type : Boolean},
    airSpeedSensor  :{type : Boolean},
    di : [{ 
      diNo : {type:String},
      type : {type  :String},
      description : {type :String}
    }]
    // UV Sensor (Yes / No)
    // Air Speed Sensor (Yes/No)
    // DI (Total DI up to 4)
    // ➢ Access Control
    // ➢ Limit Switch
    // ➢ Starter Panel
    // ➢ None with Description
    // Lamps (Total Lamps up to 8)
    // ➢ HRS
    // ➢ Switch (Power On/Off of Lamps)
    // Real time JS report (User should upload the HTML Report)
})

module.exports = mongoose.model("controller",controllerSchema)