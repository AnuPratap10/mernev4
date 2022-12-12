
const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    taskname: String,
    status: Boolean,
    tag: [],
    UserId:String
})

const TodoModle = mongoose.model("usertodo", todoSchema)

module.exports = { TodoModle }