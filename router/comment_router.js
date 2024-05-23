const express = require("express")
const router = express.Router()

const shortController = require('../controller/comment_controller')
const dbUploader = require('../database/upload_data')

router.get("/upload/:id", dbUploader.uploadComments)
router.get("/", shortController.getAll)
router.get("/:id", shortController.getById)
router.post("/", shortController.create)
router.put("/:id", shortController.updateById)
router.delete("/:id", shortController.deleteById)

module.exports = router