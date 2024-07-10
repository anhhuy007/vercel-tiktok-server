const express = require("express")
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
require('dotenv').config()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const AuthRouter = require("./router/auth_router")
// const FeedRouter = require("./router/feed_router")
const ProfileRouter = require("./router/profile_router")

app.use("/api/v1/auth", AuthRouter) // for login and signup
// app.use("/api/v1/feed", FeedRouter) // fetching short videos for the feed page
app.use("/api/v1/profile", ProfileRouter) // fetching user profile details

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))