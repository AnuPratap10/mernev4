
const mongoose=require("mongoose")


const userSchema=mongoose.Schema({

    email:String,
    password:String,
    name:String
})

const UserModle=mongoose.model("todo",userSchema)

module.exports={UserModle}