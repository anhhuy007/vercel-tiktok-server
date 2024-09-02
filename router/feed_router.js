const express = require("express")
const router = express.Router()

const feedController = require('../controller/feed_controller')

router.get('/video', feedController.getFeedVideo)
router.get('/videos/:limit', feedController.getFeedVideos)
router.get('/', feedController.getAllVideos)

module.exports = router