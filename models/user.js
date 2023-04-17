const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userschema=mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      role:{type:String,enum:["User","Moderator"],default:"User"}
    });
    
  
    
    const User = mongoose.model('User', userschema);
    
    module.exports = User;