const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    profilePic:{
        type: String
    },
    fullName:{
        type: String,
    },
    mobileNumber:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)