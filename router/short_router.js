const express = require("express")
const router = express.Router()

const shortController = require('../controller/short_controller')
const dbUploader = require('../database/upload_data')

router.get("/upload", dbUploader.uploadShorts)

module.exports = router