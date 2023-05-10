const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username:{type:String, require:true, min:4, unique:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
}) 

const UserModel = model('User', UserSchema)

module.exports = UserModel