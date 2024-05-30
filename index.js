const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())

const bookRouter = require('./router/book_router')
const shortRouter = require('./router/short_router')
const commentRouter = require('./router/comment_router')
const userRouter = require('./router/user_router')

app.use("/api/v1/books", bookRouter)
app.use("/api/v1/shorts", shortRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/users", userRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))