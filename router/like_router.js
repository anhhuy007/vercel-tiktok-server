const express = require('express')
const likeController = require('../controller/like_controller')
const router = express.Router()

router.post('/', likeController.incrementLike)
router.post('/status', likeController.getLikeStatus);

module.exports = router