const express = require('express')
const likeController = require('../controller/like_controller')
const router = express.Router()

router.post('/likeVideo', likeController.incrementLike)
router.post('/unlikeVideo', likeController.decrementLike)
router.post('/status', likeController.getLikeStatus);

module.exports = router