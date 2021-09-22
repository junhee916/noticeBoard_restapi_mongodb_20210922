require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const connectDB = require('./config/database')
connectDB()

const userRouter = require('./routes/user')
const boardRouter = require('./routes/board')
const commendRouter = require('./routes/commend')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('dev'))

app.use('/user', userRouter)
app.use('/board', boardRouter)
app.use('/commend', commendRouter)

app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 7000

app.listen(PORT, console.log("connected server..."))