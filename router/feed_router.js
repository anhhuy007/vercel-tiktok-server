const express = require("express")
const router = express.Router()

const dbUploader = require('../database/upload_data')

router.get("/upload/:id", dbUploader.uploadVideos)

module.exports = router