const mongoose = require('mongoose')

const uvHealModelSchema = mongoose.Schema({
    modelId: { type: String },
    modelName : {type : String},
    lampList : {type : Array},
    driverId : {type : Array},
    noOfLamps : {type :String},
    noOfDrivers : {type : String},
    modelType : {type :String},
    // realJsReport : {type :Object}
})

module.exports = mongoose.model("uvHealModel",uvHealModelSchema)