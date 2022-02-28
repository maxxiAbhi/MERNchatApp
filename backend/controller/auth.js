const User = require('../models/user')
const bcrypt = require('bcryptjs');


exports.signup = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, pic } = req.body
        if (!name || !email || !password) {
            return res.json({ message: 'Plz Fill All Filds' })
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        const user = new User({ name: name, email: email, password: password, pic: pic })
        const userSave = await user.save();
        console.log(userSave)
        if (user) {
            return res.status(200).json({ message: 'User Register Sucessfully' })
        } else {
            return res.json({ message: 'Something Went Wrong' })
        }

    } catch (error) {
        console.log(error)
        return res.json({ message: 'Something Wrong From Our Side' })
    }
}





exports.signin = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ message: 'Plz Fill All Filds' })
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            const isMatch = await bcrypt.compare(password, checkEmail.password);
            if (isMatch) {
                const token = await checkEmail.generateAuthToken();
                res.cookie('jwtCookie', token, {
                    expires: new Date(Date.now() + 2589200000),  ////  25892000000  is  equal  to  30 day  in  millisecond
                    httpOnly: true
                })
                const user={
                    _id:checkEmail._id,
                    name:checkEmail.name,
                    pic:checkEmail.pic,
                    token:token
                }
                return res.status(200).json({ message: 'Sign in Sucessfully',user})
            } else {
                return res.status(400).json({ message: 'Something Went Wrong' })
            }
        }else{
            return res.status(400).json({ message: 'Invalid Credentials' })
        }

    } catch (error) {
        console.log(error)
        return res.json({ message: 'Something Wrong From Our Side' })
    }
}