const User = require('../models/user')


exports.signin = (req, res) => {
    console.log(req.body)
    console.log('bc')
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let userImage=null
        console.log(req.file)
        if (!name || !email || !password) {
            return res.status(400).json({ messager: 'Plz Fill All Filds' })
        }
        if(req.file){
            userImage= req.file.filename
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(422).json({ error: 'Email already exist' })
        }

        const user = new User({ name: name, email: email, password: password,pic:userImage })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ messager: 'Something Wrong From Our Side' })
    }
}