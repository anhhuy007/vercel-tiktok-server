const express = require("express")
const router = express.Router()

const profileController = require('../controller/profile_controller')

router.get('/info/:id', profileController.getProfileInfoById)
router.get('/latest/videos/:id', profileController.getLatestVideosByUserId) // id, thumbnail_url, views
router.get('/popular/videos/:id', profileController.getPopularVideosByUserId)
router.get('/oldest/videos/:id', profileController.getOldestVideosByUserId)

module.exports = router