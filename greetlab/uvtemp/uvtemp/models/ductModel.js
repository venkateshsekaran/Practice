const mongoose = require('mongoose')

const ductSchema = new mongoose.Schema({
    floorNo : {type : String},
    clientId : {type:String},
    addressId:{type:String},
    duct : [{
        ductId :{type : String},
        ductHeight : {type : String},
        ductLength : {type :String},
        ductMaterial : {type :String},
        floorNo : { type : String },  
        CFM : { type :String},
        UVhealDuctModel : { type :String}
    }]
   
})
module.exports = mongoose.model('duct',ductSchema)