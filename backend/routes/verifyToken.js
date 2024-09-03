const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.secret_key, (err, user)=>{
            if(err) return res.status(403).json('token is invalid')
            req.user = user
            next()
        })
    }else{
        res.status(500).json('user is not authenticated')
    }
}

module.exports = verifyToken