const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
    isEmailVerified : {type:Boolean , default : false},
    email : {type : String} ,
    password :{ type : String },
    clientId:{type :String},
    userType : {type : String} ,
    createdOn : {type : Date}
    }
)
module.exports = mongoose.model('user',userSchema)