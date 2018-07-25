const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.js")

router.get("/new", userController.new)
router.get("/:id", userController.show)
router.post("/", userController.create)
router.get('/login', userController.login)
router.post('/login', userController.createLogin)
router.get("sign-up", userController.signUp)
router.post("/sign-up", userController.createSignUp)
router.get("/logout", userController.logout)
module.exports = router