const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())

const ProfileRouter = require("./router/profile_router")

// app.use("/api/v1/short", shortRouter)
// app.use("/api/v1/comment", commentRouter)
// app.use("/api/v1/user", userRouter)

// app.use("/api/v1/auth", AuthRouter) // for login and signup
// app.use("/api/v1/feed", FeedRouter) // fetching short videos for the feed page
app.use("/api/v1/profile", ProfileRouter) // fetching user profile details

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))