const express = require("express")
const router = express.Router()

const authController = require('../controller/auth_controller')
const dbUploader = require('../database/upload_data')

// router.get("/", dbUploader.uploadAccounts)
router.get("/", authController.getAccounts)
router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.get('/accounts', authController.getAccounts)

module.exports = router