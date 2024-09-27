const express = require("express")
const router = express.Router()

const profileController = require('../controller/profile_controller')

router.get('/info/:id', profileController.getProfileInfoById)
router.get('/videos/latest/:id', profileController.getLatestVideosByUserId) // id, thumbnail_url, views
router.get('/videos/popular/:id', profileController.getPopularVideosByUserId)
router.get('/videos/oldest/:id', profileController.getOldestVideosByUserId)
router.post('/update', profileController.updateProfileInfo)

module.exports = router