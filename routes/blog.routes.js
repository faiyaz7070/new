const express=require("express")
const router=express.Router()
const Blogs=require("../models/blogs")
const authMiddleware=require("../middlewares/authentication")
const { authorise }=require("../middlewares/authorise")


// })
router.get("/blogs", authMiddleware,authorise(["User"]),async(req,res)=>{
    const payload=req.query
    try {
       const user=await Blogs.find(payload)
       res.send(user)
        
    } catch (error) {
        console.log(error);
        
    }
})
router.post("/create", authMiddleware,authorise(["User","Moderator"]),async(req,res)=>{
    const {name,age,clas,city}=req.body
    try {
        const x=new Blogs({name,age,clas,city})
        await  x.save()
    } catch (error) {
        console.log(error);
    }
})

router.patch("/edit/:id", authMiddleware,authorise(["User","Moderator"]),async(req,res)=>{
    const Id=req.params.id
    const body=req.body
    try {
      await Blogs.findByIdAndUpdate({_id:Id},body)
      res.send("data has been edited")
    } catch (error) {
        console.log(error);
    }
})
router.delete("/delete/:id", authMiddleware,authorise(["User","Moderator"]),async(req,res)=>{
    const Id=req.params.id
 
    try {
     await Blogs.findByIdAndUpdate({_id:Id})
      res.send("data has been deleted")
    } catch (error) {
        console.log(error);
    }
})




module.exports=router