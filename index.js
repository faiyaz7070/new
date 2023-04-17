const express=require("express")
const {connection}=require("./config/db")
const loginrouter=require("./routes/user.routes")
const blogrouter=require("./routes/blog.routes")
const app=express()
app.use(express.json())


app.use(blogrouter)
app.use(loginrouter)

app.get("/",(req,res)=>{
    res.send("home page")
})

app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("listening on port 4500");
})