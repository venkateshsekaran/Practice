const mongoose = require('mongoose')

const lampSchema = mongoose.Schema({
    id :{ type: String },
    make :{ type: String },
    wattage :{ type: String },
    length:{ type: String },
    pin:{ 
        pinNo :{ type: String} ,
        description :{type: String} },
    driverId : {type : String}
})

module.exports = mongoose.model("lamp",lampSchema)