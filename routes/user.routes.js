const express=require("express")
const router=express.Router()
const bcrypt=require('bcrypt');
const User=require("../models/user")
const jwt=require("jsonwebtoken")
const {blacklist}=require("../models/blacklist")
require("dotenv").config()

router.post("/signup",async(req,res)=>{
    const {username,email,password,role}=req.body
    try {
        const userexit=await User.findOne({email})
        if(userexit){
            res.send("user already exists")
        }
        const hash=bcrypt.hashSync(password,8)
        const user =new User({username,email,password:hash,role})
        await user.save()
        res.send({user})
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            res.send("invalid email")
        }
        const passmatch=await bcrypt.compareSync(password,user.password)
        if(!passmatch){
            res.send("invalid passwort")
        }
        const token=jwt.sign({userId:user._id},process.env.tokensecretkey,{
            expiresIn:60
            
        })
        const refrestoken=jwt.sign({userId:user._id},process.env.reftokensecretkey,{
            expiresIn:180
            
        })
        res.send({token,refrestoken})
      
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})
router.get("/newtoken",(req,res)=>{
    const refres_token=req.headers.authorization.split(" ")[1]
    if(!refres_token){
        res.send("please log in first")
    }
    jwt.verify(refres_token,process.env.reftokensecretkey,(err,decoded)=>{
        if(err){
            res.send("please login again")
        }else{
            const token=jwt.sign({userId:decoded.userId},process.env.tokensecretkey,{
                expiresIn:60
                
            }) 
            res.send({token})
        }

    })
    
})
router.get("/logout",(req,res)=>{
blacklist.push(req.headers?.authorization?.split(" ")[1])
res.send("logout successful")
})
module.exports=router