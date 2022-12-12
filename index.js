// remember remove nodemon   "start":"nodemon index.js", from package when deploy

const express = require("express")
const cors = require("cors")
const { connections } = require("./config/db")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModle } = require("./model/User.Model")
const {todoRouter} =require("./route/Todo.Route")
const {authentication}=require("./auth/authentication")

const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))




app.get("/", (req, res) => {
    res.send("Todo App Landing Page.........")
})

// sign up ..........................

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const userPresent = await UserModle.findOne({ email })
    if (userPresent?.email) {
        res.send("Account Already Exist, Please try to Login")
    } else {

        try {
            bcrypt.hash(password, 5, async function (err, hash) {

                const user = new UserModle({ email, password:hash })
                await user.save()
                res.send("Sign Up Successfull")
            });

        }
        catch (err) {
            res.send({ "msg": "Something wrong ,please try again" })
        }
    }

})
// signup working...........

// login ............
app.post("/login", async (req, res) => {

    const { email, password } = req.body
    try {

        const user = await UserModle.find({ email })
        if (user.length > 0) {

            const hashed_password = user[0].password
            bcrypt.compare(password, hashed_password, function (err, result) {

                if(result){
                    const token=jwt.sign({ foo: 'bar' }, 'hash');
                    res.send({"msgg":"Login Successfull","token is":token})
                }else{
                    res.send("login failed ")
                }
            });

        }else{
            res.send("login failed ")
        }
    }
    catch (err) {
        res.send({"err":"Something wrong"})
    }
})

// login working....................
// then crud operation.......
// auth middlewaer


app.use(authentication)


app.use("/todo",todoRouter)







app.listen(process.env.PORT, async () => {

    try {
        await connections;
        console.log("Connect to db Successfull")
    }
    catch (err) {
        console.log("connect to db failed")
        console.log(err)
    }


    console.log("Listing on http://localhost:8080/")
})








// ..............................................

//
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// jwt.verify(token, 'shhhhh', function(err, decoded) {
//     console.log(decoded.foo) // bar
//   });

//
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

// });
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });



// "msgg": "Login Successfull",
// "token is": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NzA4MzgxMzR9.D9JwZ1c6KUZDRCxqymgXg9nTQ3Osya4bzL_rnIekMis"

