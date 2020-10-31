const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/data')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user',userRoute)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})



