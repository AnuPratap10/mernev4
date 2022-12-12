// crud operations

const express = require("express")

const { TodoModle } = require("../model/Todo.Modle")
const todoRouter = express.Router();


// get req...........
todoRouter.get("/", async (req, res) => {

    const todo = await TodoModle.find()
    res.send(todo)

})


// post req...........
todoRouter.post("/create", async (req, res) => {
    const payload = req.body
    try {
        const new_todo = new TodoModle(payload)
        await new_todo.save()
        res.send({ "msgg": "Todo list created" })
    }
    catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})
// patch req...........

todoRouter.patch("/update:/:todoId", async (req, res) => {

    const todoId = req.params.todoId
    const userId = req.body.userId
    const todo = await TodoModle.findOne({ _id: todoId })
    if (userId !== todo.userId) {
        res.send({ "msg": "Not Authorized" })
    } else {
        await TodoModle.findByIdAndUpdate({ _id: todoId }, payload)
        res.send({ "msg": "todo list updated successfully" })
    }
})


// delete

todoRouter.delete("/delete/:todoId",async(req,res)=>{

    const todoId = req.params.todoId
    const userId = req.body.userId
    const todo = await TodoModle.findOne({ _id: todoId })
    if(userId!==todo.userId){
        res.send({ "msg": "Not Authorized" })
    }else{

        await TodoModle.findByIdAndDelete({_id:todoId})
    }
})


module.exports = { todoRouter }


// const todoID = req.params.noteID
//     await TodoModel.findByIdAndDelete({_id : todoID})
//     res.send({"msg" : "todo list deleted successfully"})