const express = require("express")
const router = express.Router()

const shortController = require('../controller/short_controller')
const dbUploader = require('../database/upload_data')

router.get("/upload", dbUploader.uploadShorts)
router.get("/", shortController.getAll)
router.get("/:id", shortController.getById)
router.post("/", shortController.create)
router.put("/:id", shortController.updateById)
router.delete("/:id", shortController.deleteById)
router.delete("/", shortController.deleteAll)

module.exports = router