const express = require('express')
const { serchUser } = require('../controller/user')
const { userAuth } = require('../middleware/middleware_user')
const route = express()

route.get('/user',userAuth,serchUser)


module.exports=route