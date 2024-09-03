const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const userRoute = require('./routes/users')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
dotenv.config()
const app = express()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('database connected')
})
.catch((err)=>{
    console.log(err)
})

app.use(cors())


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})
app.post('/api/upload', upload.single('file'), (req, res)=>{
    res.status(200).json('file uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)
app.listen(process.env.PORT || 5000, ()=>{
    console.log('backend server running')
})