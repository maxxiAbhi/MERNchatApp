const User = require('../models/user')

exports.serchUser = async (req, res) => {
    const keyWord=req.query?{
        $or:[
            { name: { $regex:req.query.search , $options: 'i' } },
            { email: {$regex:req.query.search , $options: 'i' } }
        ]
    }:{}
   const searchData=await User.find(keyWord).find({_id:{$ne:req.userId}})
    console.log(searchData)
    if(searchData){
        res.status(200).json(searchData);
    }else{
        res.status(400)
    }
}