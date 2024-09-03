const express = require('express')
const User = require('../models/User')
const verifyToken = require('./verifyToken')
const CryptoJs = require('crypto-js')

const router = express.Router()

//delete a post
router.delete('/:id', verifyToken, async (req, res)=>{
    if(req.params.id === req.user.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user deleted')
        }catch(err){
            res.status(402).json(err)
        }
    }else{
        return res.status(500).json('you are not allowed to perform this action')
    }
})

//update a user
router.put('/:id', verifyToken, async (req, res)=>{
    if(req.params.id === req.user.id){
        if(req.body.password){
            return CryptoJS.AES.encrypt(req.body.password, process.env.secret_key).toString()
        }
        try{
            const updatedPost = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json(updatedPost)
        }catch(err){
            res.status(402).json(err)
        }
    }else{
        return res.status(500).json('you are not allowed to perform this action')
    }
})
//find a user
router.get('/find/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        res.status(402).json(err)
    }
})

//get all users
router.get('/', async(req, res)=>{
        const qNew = req.query.new
        try{
            let users
            if(qNew){
                users = await User.find().sort({createdAt: -1})
            }else{
                users = await User.find()
            }
            res.status(200).json(users)
        }catch(err){
            res.status(402).json(err)
        }
})

module.exports = router