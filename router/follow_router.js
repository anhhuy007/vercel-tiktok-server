const express = require('express')
const router = express.Router()

const followController = require('../controller/follow_controller')

router.post('/', followController.incrementFollow)
router.post('/status', followController.getFollowStatus)

module.exports = router