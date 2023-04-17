const mongoose=require("mongoose")

const blogschema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    clas:{type:Number,required:true},
    city:{type:String,required:true},
})
const Blogs=mongoose.model("blog",blogschema)
module.exports=Blogs