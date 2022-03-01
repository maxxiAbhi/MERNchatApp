const mongoose = require('mongoose');
const User = require("../models/user")
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message" ///TABLE name
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"///TABLE name
    }
}, {
    timestamps: true
});


const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat