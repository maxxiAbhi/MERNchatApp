const Chat = require("../models/chat")
const User = require("../models/user")

exports.accessChat = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.rootUser._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")   ////populate use for connect to another table like forign keyy "users" users fild represent the user is table  "-password" "-"use for not include "-password" use for not include the password
        .populate("latestMessage");////populate use for connect to another table like forign keyy "latestMessage" latestMessage fild represent the message is table  

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.rootUser._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );////populate use for connect to another table like forign keyy "users" users fild represent the user is table  "-password" "-"use for not include "-password" use for not include the password
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
}