const express = require("express")
const router = express.Router()

const authController = require('../controller/auth_controller')
const dbUploader = require('../database/upload_data')

router.get('/accounts', authController.getAccounts)
router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/token", authController.token)
// router.get('/hash', authController.hashPassword)


module.exports = router