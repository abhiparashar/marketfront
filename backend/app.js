const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

//routes
const userRoute = require('./routes/data')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())


//Route middlewares
app.use('/api/v1/user',userRoute)

const port = process.env.PORT || 5000


//listening the port
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})



