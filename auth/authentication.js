
const jwt = require('jsonwebtoken');


const authentication = (req, res, next) => {

    const token = req.headers?.Authorization?.split(" ")[1]
    console.log(token)

    if (token) {

        var decoded = jwt.verify(token, 'hush');
        if (decoded) {
            const userId = decoded.userId
            req.body.userId = userId
            next()
        } else {
            res.send("please login")
        }

    } else {
        res.send("please login")
    }
}

module.exports={authentication}