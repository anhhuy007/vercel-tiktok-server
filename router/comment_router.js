const express = require('express')
const commentController = require('../controller/comment_controller')
const router = express.Router()

router.get('/:video_id', commentController.getCommentOnVideo)
router.post('/', commentController.addCommentOnVideo)
// router.post('/deleteComment', commentController.deleteCommentOnVideo)   

module.exports = router