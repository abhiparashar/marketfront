const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')



const app = express()

//connecting the DB
connectDB()

// Middlewares
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',userRoute)



const port = process.env.PORT || 7500

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})



