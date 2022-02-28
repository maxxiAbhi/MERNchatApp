const express = require('express')
const { signin, signup } = require('../controller/auth')
const route = express()

   
route.post('/signin',signin)
route.post('/signup',signup)


module.exports=route