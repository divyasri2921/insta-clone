const express = require('express')
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const router = express.Router()
//register user
router.post('/register', async (req, res)=>{
    const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.secret_key).toString()
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullname,
        mobileNumber: req.body.mobile,
        username: req.body.username,
        profilePic: req.body.profilePic
    })

    try{
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    }catch(err){
        res.status(501).json(err)
    }
})

router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(401).json('username or email incorrect')

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.secret_key)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
        if(originalPassword !== req.body.password) return res.status(401).json('password incorrect')

        const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.secret_key, { expiresIn: '3d'})

        const { password, ...others} = user._doc
        res.status(200).json({ ...others, token})

    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router