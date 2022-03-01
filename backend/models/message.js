const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
   sender:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   },
   content:{
       type:String,
       trim:true
   },
   chat:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'chat'///TABLE name
   }
}, {
    timestamps: true
});


const Message = mongoose.model('message', messageSchema);

module.exports =  Message