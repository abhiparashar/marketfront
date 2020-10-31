const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name'],
        maxlength:32,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'Please add an email'],
        trim:true,
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ]
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minlength:6,
        trim:true
    },
    role:{
        type:Number
    }
})

//Encrypt the password 
userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt);
})


//Token generation
userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

//Match password
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}


module.exports = mongoose.model('User',userSchema)