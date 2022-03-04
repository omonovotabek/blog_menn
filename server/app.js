const express = require('express')
const morgan = require('morgan')
const adminRouter = require('./routers/adminRouter')
const commentRouter = require('./routers/commentRouter')
const postRouter = require('./routers/postRouter')
const app = express()

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'))

app.use('/api/admin', adminRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

module.exports = app