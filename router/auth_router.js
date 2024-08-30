const express = require("express")
const router = express.Router()

const authController = require('../controller/auth_controller')

// The default password is "admin123"

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/token", authController.token)
router.post("findEmail", authController.findEmail)
router.post("findUsername", authController.findUsername)
router.delete("/logout", authController.logout)

module.exports = router