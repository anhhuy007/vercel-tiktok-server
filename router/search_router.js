const express = require("express")
const router = express.Router()

const searchController = require('../controller/search_controller')

router.get('/popular/:limit', searchController.getPopularVideos)
router.get('/history/:userId', searchController.getSearchedItems)
router.get('/:searchQuery', searchController.findUserByQuery)
router.post('/history', searchController.saveSearchHistory)
router.get('/user/:id', searchController.getUserById)
router.delete('/history/:id', searchController.deleteSearchHistory)

module.exports = router