const mongoose=require("mongoose")
require("dotenv").config()
const coneection=mongoose.connect(process.env.MONGOURL)



module.exports={
    coneection
}