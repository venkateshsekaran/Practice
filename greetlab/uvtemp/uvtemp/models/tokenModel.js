const mongoose = require('mongoose')


const tokenSchema  = new mongoose.Schema({
    email : {type :String},
    token : {type : String}, 
    expiresIn  : {type : String},
    userId : {type: mongoose.Schema.Types.ObjectId}
})
module.exports = mongoose.model('token',tokenSchema)