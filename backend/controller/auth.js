const User = require('../models/user')
const bcrypt = require('bcryptjs');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let userImage = ''
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Plz Fill All Filds' })
        }
        if (req.file) {
            userImage = req.file.filename
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(422).json({ error: 'Email already exist' })
        }
        if (userImage == '') {
            const user = new User({ name: name, email: email, password: password })
            const userSave = await user.save();
            console.log(userSave)
            if (user) {
                return res.status(200).json({ message: 'User Register Sucessfully' })
            } else {
                return res.status(422).json({ message: 'Something Went Wrong' })
            }
        } else {
            const user = new User({ name: name, email: email, password: password, pic: userImage })
            const userSave = await user.save();
            console.log(userSave)
            if (user) {
                return res.status(200).json({ message: 'User Register Sucessfully' })
            } else {
                return res.status(422).json({ message: 'Something Went Wrong' })
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something Wrong From Our Side' })
    }
}





exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Plz Fill All Filds' })
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            const isMatch = await bcrypt.compare(password, checkEmail.password);
            if (isMatch) {
                const token=await checkEmail.generateAuthToken();
                console.log(token)
                res.cookie('jwtCookie',token,{
                    expires:new Date(Date.now()+2589200000),  ////  25892000000  is  equal  to  30 day  in  millisecond
                    httpOnly:true
                })
                return res.status(200).json({ message: 'Sign in Sucessfully' })
            } else {
                return res.status(400).json({ message: 'Something Went Wrong' })
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something Wrong From Our Side' })
    }
}