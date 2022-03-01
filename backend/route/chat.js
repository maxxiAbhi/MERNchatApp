const express = require('express')
const { accessChat } = require('../controller/chat')
const { userAuth } = require('../middleware/middleware_user')
const route = express()

route.post('/chat',userAuth,accessChat)
// route.get('/chat',userAuth,fetchChat)
// route.post('/chat/group',userAuth,createGroupChat)
// route.put('/chat/renamegroup',userAuth,renameGroup)
// route.put('/chat/removegroup',userAuth,removeFromGroup)
// route.put('/chat/addtogroup',userAuth,addToGroup)



module.exports=route