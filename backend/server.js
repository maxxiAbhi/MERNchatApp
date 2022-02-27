const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/dumyData')
const path=require('path')

dotenv.config({ path: './config.env' })
require('./database/connection')



const PORT = process.env.PORT
const app = express()

//accept json 
app.use(express.json());
//static path
app.use('/static', express.static(path.join(__dirname, 'public')))


const auth=require('./route/auth')

app.use('/api',auth)


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/api/chat', function (req, res) {
    res.send(chats)
})

app.get('/api/chat/:id', function (req, res) {
    
    const data= chats.find((c)=>{
        return c._id===req.params.id
    })
    res.send(data)
})

app.listen(PORT, () => {
    console.log('server started .......', PORT)
})