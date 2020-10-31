const User = require('../models/User')

exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).send({
                error:'User not found'
            })
        }
        req.body = user
        next()
    })
}