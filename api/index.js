const express = require('express')
const cors = require('cors')
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcryptjs')
const {default: mongoose} = require('mongoose')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const app = express()
const port = 5000
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSectret = "jgFIQtMDpxZLqTbEcWhXKvUyRAfoHrJN"
// parse request into json format
// console.log()
mongoose.connect(process.env.MONGO_URL)
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.get('/api/test', (req, res)=>{
    res.json('test Ok')
})

app.post('/api/register', async (req, res)=>{
    const {username, email, password} = req.body
    // res.json({username, email, password})
    try{

        const userData = await User.create({
            username,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userData)
    }catch(e){
        res.status(422).json(e)
    }
})

app.post('/api/login', async (req, res)=>{
    const {username, password} = req.body
    const userData = await User.findOne({username})
    if (userData){
        const passOk = bcrypt.compareSync(password, userData.password)
        if (passOk){
            jwt.sign({
                username:userData.username,
                id:userData._id
            }, jwtSectret, {}, (err, token)=>{
                if (err) throw err
                res.cookie('token', token).json(userData)
            })
        }else{
            res.status(422).json('password failed')
        }
    }else{
        res.json('Not found')
    }
})
app.get('/api/profile', (req, res) =>{
    const {token} = req.cookies
    // res.json(token)
    if (token){
        jwt.verify(token, jwtSectret, {},async  (err, userData)=>{
            if(err) throw err;
            const {username, email, _id} = await User.findById(userData.id)
            res.json({username, email, _id})
        })
    }else{
        res.json(null)
    }
})
app.post('/api/logout', (req, res)=>{
    res.cookie('token', '').json(true)

})
const uploadMiddleware = multer({dest:'uploads/'})
app.post('/api/posts',uploadMiddleware.single('file'), (req, res)=>{
    const {path, originalname} = req.file
    const part = originalname.split('.')
    const ext = part[part.length-1]
    // res.json(ext)
    const newPath = path + '.' + ext
    // res.json(newPath)
    // we use fs to rename the path
    fs.renameSync(path, newPath)
    // res.json({files:req.file})
    const {title, summary, content} = req.body
    const {token} = req.cookies
    jwt.verify(token, jwtSectret, {}, async (err, user)=>{
        if (err) throw err;
        const postData = await Post.create({
            owner:user.id,
            title,
            summary, 
            content,
            coverImage:newPath
        })
        res.json(postData)
    })
})
app.get('/api/posts', async (req,res)=>{
    res.json(await Post.find()
    .populate('owner', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    )
})
app.get('/api/posts/:id', async (req, res)=>{
    const {id} = req.params
    res.json(await Post.findById(id).populate('owner', ['username']))
})
app.put('/api/posts/:id',uploadMiddleware.single('file'), (req, res)=>{
    // res.json({files:req.file})
    const {id} = req.params
    const {title, summary, content} = req.body
    let newPath = null
    if(req.file){ 
        const {path, originalname} = req.file
        const part = originalname.split('.')
        const ext = part[part.length-1]
        // res.json(ext)
        newPath = path + '.' + ext
        // res.json(newPath)
        // we use fs to rename the path
        fs.renameSync(path, newPath)
        // res.json({files:req.file})
    }
    
    const {token} = req.cookies
    jwt.verify(token, jwtSectret, {}, async (err, userInfo)=>{
        if (err) throw err;
        
        const postData =await Post.findById(id)
        // res.json(postData)
        // console.log(postData.owner.toString())
        if (userInfo.id === postData.owner.toString()){
        postData.set({
                title,
                summary,
                content,
                coverImage:newPath ? newPath : postData.coverImage
            })
            await postData.save()
            res.json('ok')
        }
    })
})
app.delete('/api/posts/:id', async (req, res)=>{
    const {id} = req.params
        try {
            // Delete the post by ID
            const result = await Post.deleteOne({ _id: id });
            
            if (result.deletedCount === 0) {
              return res.status(404).json({ error: 'Post not found' });
            }
            
        res.json({message: 'Post deleted Successfully'})
    }catch(e){
        console.log(e)
        res.status(500).json({error: 'Internal error'})
    }
       
      })

app.listen(port)