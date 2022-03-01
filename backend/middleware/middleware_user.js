var jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.userAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const verfyToken = jwt.verify(token, process.env.JWT_SERECT_KEY);
            const rootUser = await User.findOne({ _id: verfyToken._id })
            if (!rootUser) {
                // throw new Error('User not found')
                res.status(400).json({ message: 'Login First' })
                return;
            }
            req.rootUser = rootUser
            req.userId = rootUser._id
        } else {
            res.status(400).json({ message: 'Login First' })
        }
        next()
    } catch (error) {
        res.status(400).json({ message: 'unauthorised token' })
    }

}
