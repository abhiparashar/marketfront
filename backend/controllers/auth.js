const User = require('../models/User')
const expressJwt = require('express-jwt')
exports.Signup = async(req,res)=>{
    try {
        const{name,email,password,role} = req.body
        const user = await User.create({name,email,password,role})
        const token = user.getSignedJwtToken()
        const options = {
            expires:new Date(Date.now()+process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000),httpOnly: true,
        }
        res.status(200).cookie('token',token,options).send({
            user,token
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.Signin = async(req,res)=>{
    try {
        const{email,password} = req.body
        if(!email||!password){
            return res.status(400).send({
                success:false,
                message:'Please provide valid credentials'
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({
                success:false,
                message:'User does not exist. Please Signup'
            })
        }
        const isMatch = await user.matchPassword(password)
        if(!isMatch){
            return res.status(400).send({
                success:false,
                message:'Invalid credentials'
            })
        }
        const token = user.getSignedJwtToken()
        const options = {
            expires:new Date(Date.now()+process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000),httpOnly: true,
        }
        res.status(200).cookie('token',token,options).send({
            user,token
        })
    } catch (error) {
        res.status(401).send(error)
    }
}

exports.Signout = (req,res)=>{
    res.clearCookie("t")
    res.status(200).send({message:"Signout successful"})
}

exports.requireSignin = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });


exports.isAuth = (req,res,next)=>{
    let user = req.body && req.auth && req.body._id === req.auth._id
    if(!user){
        return res.status(403).send({
            error:"Access denied"
        })
    }
    next()
}

exports.isAdmin = (req,res,next)=>{
    if(req.body.role===0){
        return res.status(403).send({
            error:'Admin resourse! access denied'
        })
    }
    next()
}