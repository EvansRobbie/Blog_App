const express = require('express')
const cors = require('cors')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const {default: mongoose} = require('mongoose')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
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

app.listen(port)