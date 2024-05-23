const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())

const bookRouter = require('./router/book_router')
const shortRouter = require('./router/short_router')

app.use("/api/v1/books", bookRouter)
app.use("/api/v1/shorts", shortRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))