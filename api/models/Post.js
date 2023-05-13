const { Schema, model} = require('mongoose')

const PostSchema = new Schema({
    owner: {type:Schema.Types.ObjectId, ref:'User'},
    title:{type:String, required:true, unique:true},
    summary:{type:String, required:true},
    content:{type:String, required:true},
    coverImage:{type:String, required:true},
},{
    timestamps:true
})

const PostModel = model('Post', PostSchema)
module.exports = PostModel