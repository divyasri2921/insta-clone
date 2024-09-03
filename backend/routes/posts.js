const express = require('express')
const Post = require('../models/Post')
const verifyToken = require('./verifyToken')

const router = express.Router()
//create a post
router.post('/', verifyToken,  async (req, res)=>{
    if(req.user.id || req.user.isAdmin){
        const post = new Post(req.body)
        try{
            const savedPost = await post.save()
            res.status(200).json(savedPost)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(500).json('you must be an authenticated user in order to post')
    }
})

//delete a post
router.delete('/:id', verifyToken, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(req.user.username === post.username || req.user.isAdmin){
            try{
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json('post deleted')
            }catch(err){
                res.status(400).json(err)
            }
        }
    }catch(err){
        res.status(402).json(err)
    }
})

//update a post
router.put('/:id', verifyToken, async (req, res)=>{
        try{
            const post = await Post.findById(req.params.id)
            if(req.user.username === post.username || req.user.isAdmin){
                try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                    res.status(200).json(updatedPost)
                }catch(err){
                    res.status(400).json(err)
                }
            }
        }catch(err){
            res.status(402).json(err)
        }
})

//find a post
router.get('/find/:id', async (req, res)=>{
        try{
            const post = await Post.findById(req.params.id)
            res.status(200).json(post)
        }catch(err){
            res.status(402).json(err)
        }
})

//find new posts
router.get('/', async(req, res)=>{
        const qNew = req.query.new
        try{
            let posts
            if(qNew){
                posts = await Post.find().sort({createdAt: -1})
            }else{
                posts = await Post.find()
            }
            res.status(200).json(posts)
        }catch(err){
            res.status(402).json(err)
        }
})
module.exports = router