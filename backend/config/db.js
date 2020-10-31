const mongoose  = require('mongoose')

const connectDB = async()=>{
    const conn =  await mongoose.connect('mongodb://localhost/marketfront',{
        useCreateIndex:true,
        useFindAndModify:false,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log(`MongoDB connected:${conn.connection.host}`)
}   

module.exports = connectDB