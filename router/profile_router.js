const express = require("express")
const router = express.Router()

const profileController = require('../controller/profile_controller')
const dbUploader = require('../database/upload_data')

router.get("/upload/:id", dbUploader.uploadProfiles)

// router.get('/info/:id', profileController.getProfileInfoById)
// router.get('/latest/videos/:id', profileController.getLatestVideosById)
// router.get('/popular/videos/:id', profileController.getPopularVideosById)
// router.get('/oldest/videos/:id', profileController.getOldestVideosById)