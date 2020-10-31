const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()


app.get('/',(req,res)=>{
    console.log('Abhishek parashar')
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})