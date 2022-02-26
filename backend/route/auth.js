const express = require('express')
const { signin, signup } = require('../controller/auth')
const route = express()
const multer=require('multer')
const path=require('path')
const { nanoid } = require('nanoid')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +nanoid(10)+'-'+file.originalname)
    }
  })
  const upload=multer({storage})
   


route.post('/signin',signin)
route.post('/signup',upload.single('userimages'),signup)


module.exports=route