const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    id: { type: String },
    make: { type: String },
    size: { type: String },
    wattage: { type: String }
})

module.exports = mongoose.model("driver",driverSchema)