const express = require('express')
const app = express()
const port = 5000

app.get('/api/test', (req, res)=>{
    res.json('test Ok')
})
//password yyKcRyvjnz1BuMua

app.listen(port)